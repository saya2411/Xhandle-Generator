import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

interface ServerLog {
  id: string;
  level: "info" | "warn" | "error";
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

const serverLogs: ServerLog[] = [];

function recordServerLog(level: "info" | "warn" | "error", message: string, details?: Record<string, unknown>) {
  const log: ServerLog = {
    id: Math.random().toString(36).substring(2, 9),
    level,
    message,
    details,
    timestamp: new Date().toISOString(),
  };
  serverLogs.unshift(log);
  if (serverLogs.length > 100) {
    serverLogs.pop();
  }
}

// Well-known reserved or system handles on X/Twitter
const RESERVED_HANDLES = new Set([
  "x", "twitter", "support", "help", "admin", "administrator", "root", "verified",
  "developer", "api", "legal", "terms", "privacy", "about", "jobs", "press",
  "status", "safety", "analytics", "security", "contact", "media", "business",
  "login", "signup", "settings", "explore", "notifications", "messages", "home"
]);

export function createServerApp() {
  const app = express();
  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      offlineReady: true,
      timestamp: Date.now(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Verify whether a handle exists or is valid
  app.get("/api/check-handle/:handle", async (req, res) => {
    const rawHandle = req.params.handle.replace(/^@+/, "").trim();

    recordServerLog("info", `Checking handle existence: @${rawHandle}`);

    // X Handle validation rules for this app: 4 to 15 alphanumeric characters, NO underscores
    const isValidFormat = /^[A-Za-z0-9]{4,15}$/.test(rawHandle);
    if (!isValidFormat) {
      recordServerLog("warn", `Invalid format for handle: @${rawHandle}`);
      return res.status(200).json({
        handle: rawHandle,
        valid: false,
        status: "invalid",
        message: "Invalid format: Handles must be 4-15 characters, letters and numbers only (no underscores).",
        checkedAt: Date.now(),
        xUrl: `https://x.com/${rawHandle}`,
      });
    }

    // Check reserved list
    if (RESERVED_HANDLES.has(rawHandle.toLowerCase())) {
      recordServerLog("info", `Reserved handle detected: @${rawHandle}`);
      return res.status(200).json({
        handle: rawHandle,
        valid: true,
        status: "taken",
        message: "Reserved system username on X.",
        checkedAt: Date.now(),
        xUrl: `https://x.com/${rawHandle}`,
      });
    }

    try {
      // Perform light existence check with a strict timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      // We attempt to query the public profile endpoint on x.com
      const xResponse = await fetch(`https://x.com/${encodeURIComponent(rawHandle)}`, {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: controller.signal,
        redirect: "manual",
      });

      clearTimeout(timeoutId);

      // Handle response status
      if (xResponse.status === 404) {
        recordServerLog("info", `Handle likely available (404 received): @${rawHandle}`);
        return res.status(200).json({
          handle: rawHandle,
          valid: true,
          status: "available",
          message: "Handle does not currently exist on X. Likely available to claim!",
          checkedAt: Date.now(),
          xUrl: `https://x.com/${rawHandle}`,
        });
      } else if (xResponse.status === 200 || xResponse.status === 302 || xResponse.status === 301) {
        recordServerLog("info", `Handle taken or profile exists: @${rawHandle}`);
        return res.status(200).json({
          handle: rawHandle,
          valid: true,
          status: "taken",
          message: "Profile exists or handle is actively registered on X.",
          checkedAt: Date.now(),
          xUrl: `https://x.com/${rawHandle}`,
        });
      } else {
        return res.status(200).json({
          handle: rawHandle,
          valid: true,
          status: "taken",
          message: "Profile exists or handle is likely registered on X.",
          checkedAt: Date.now(),
          xUrl: `https://x.com/${rawHandle}`,
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Network lookup timed out";
      recordServerLog("warn", `Handle lookup completed for @${rawHandle}`, { error: errorMessage });
      return res.status(200).json({
        handle: rawHandle,
        valid: true,
        status: "taken",
        message: "Handle is likely in use. Direct link to verify on X available.",
        checkedAt: Date.now(),
        xUrl: `https://x.com/${rawHandle}`,
      });
    }
  });

  // AI Generation endpoint for dynamic fresh unhinged handles
  app.post("/api/generate-handles", async (req, res) => {
    const { vibe = "all", count = 12 } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    recordServerLog("info", `Generating handles request. Vibe: ${vibe}, Count: ${count}`);

    if (!apiKey) {
      recordServerLog("warn", "GEMINI_API_KEY not configured, serving offline fallback collection");
      return res.status(200).json({
        handles: [],
        source: "offline_fallback",
        message: "Gemini API key not configured. Using local offline cache.",
      });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const isNumericVibe = vibe === "numeric";
      const isWordOnlyVibe = vibe === "void" || vibe === "adult" || vibe === "occult";

      const vibeInstruction =
        vibe === "void"
          ? "pure subterranean voidcore, abyssal silence, cosmic nihilism, bleak obsidian shadows, vacuum nothingness (WORDS ONLY [a-z], e.g. voidgloom, bleakshroud, abyssalveil, hollowchasm, nullgloom, silentnihil, desolatenull, staticvoid)"
          : vibe === "adult"
          ? "visceral dark & edgy, menacing, grim gothic, blood, reaper, skull, razor, venom, morbid dread, brutal malice, wrath (WORDS ONLY [a-z], e.g. reaperblade, skullcurse, bleedwrath, gravemalice, vipersavage, morbidspite, sinistergore, carnagevein, dreadcarnage, razorvenom, wickedruin, grimfamine)"
          : vibe === "occult"
          ? "cyber occultism, digital techno-witchcraft, rogue daemons, sacred code syntax, glitch sigils, nether protocols, eldritch code (WORDS ONLY [a-z], e.g. daemonsigil, witchsyntax, sacredmalware, necrodaemon, phantomkernel, darkoraclenet, sigildaemon, crypticsigil, paganprotocol, hexcompiler)"
          : vibe === "numeric"
          ? "dark underground handles mixing letters and embedded numbers in the middle (leet-speak style or internal cipher), CRITICALLY MUST START WITH A LETTER [a-z] (NEVER start with a number, NEVER start with '0', NO '0x' prefixes) AND MUST END WITH A LETTER [a-z] (NEVER end in a number). Examples: gh0stfade, tox1cvein, n3ondecay, sk7llreaper, gr1mhex, m4liceshade, r3belvenom, wr4thblade, ph4ntomhex, s1nisterrot, c0rpsepulse, c1phercult, h3xweaver, dr1ftskull, s1gilrot, n0xreaper, cr1mzonnoir, b1eedshadow, r3aperblade"
          : "dark underground void and edgy handles (poetic noir, grim edgy words, or leet ciphers with numbers in the middle, never starting or ending in a number)";

      const charRule = isWordOnlyVibe
        ? "Contains ONLY lowercase english alphabet letters (regex: ^[a-z]{4,15}$). ABSOLUTELY NO NUMBERS, NO UNDERSCORES, NO SYMBOLS."
        : isNumericVibe
        ? "Contains a mix of lowercase letters and numbers (MUST contain at least one digit and at least one letter). CRITICAL RULES: MUST START WITH A LETTER [a-z] (NEVER START WITH A NUMBER OR ZERO), and MUST END WITH A LETTER [a-z] (NEVER END WITH A NUMBER). Numbers must only be placed in the middle. Regex: ^[a-z][a-z0-9]*[0-9][a-z0-9]*[a-z]$. ABSOLUTELY NO UNDERSCORES."
        : "Contains lowercase letters and optionally embedded numbers. NEVER start with a number and NEVER end with a number (first and last characters must always be letters [a-z]). ABSOLUTELY NO UNDERSCORES.";

      const prompt = `Generate ${count} distinct, aesthetic, highly usable, underground X (Twitter) handles.
The handles must be exceptionally cool, stylish, and something a real person would genuinely want to claim and use as their main identity.
Aesthetic direction: ${vibeInstruction}.

Strict Rules for every single handle:
1. Must be between 4 and 15 characters in length (no exceptions).
2. ${charRule}
3. DO NOT include the '@' symbol.
4. MAKE THE HANDLES HIGHLY USABLE AND ATTRACTIVE: clean, memorable, stylish, not chaotic keyboard mashing. Evocative aesthetic words and sleek tags.
5. No duplicates.

Output only a valid JSON array of strings.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 1.15,
        },
      });

      const rawText = response.text || "[]";
      let parsed: unknown;
      try {
        parsed = JSON.parse(rawText);
      } catch (parseErr) {
        // Fallback cleanup if response has markdown wrapping
        const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
        parsed = JSON.parse(cleaned);
      }

      if (Array.isArray(parsed)) {
        // Strict sanitization: ensure 4-15 chars, letters-only for word vibes, numbers for numeric vibe
        let sanitized = parsed
          .map((item) => String(item).replace(/^@+/, "").toLowerCase().trim());

        if (isWordOnlyVibe) {
          sanitized = sanitized
            .map((h) => h.replace(/[^a-z]/g, ""))
            .filter((handle) => handle.length >= 4 && handle.length <= 15);
        } else if (isNumericVibe) {
          sanitized = sanitized
            .map((h) => h.replace(/[^a-z0-9]/g, ""))
            .filter((handle) =>
              handle.length >= 4 &&
              handle.length <= 15 &&
              /^[a-z]/.test(handle) && // MUST start with a letter! NEVER a number!
              /\d/.test(handle) && // Must contain at least one digit
              /[a-z]$/.test(handle) && // MUST end with a letter! NEVER a number!
              !/^[0-9]/.test(handle) // Double-check never starts with digit
            );
        } else {
          sanitized = sanitized
            .map((h) => h.replace(/[^a-z0-9]/g, ""))
            .filter((handle) =>
              handle.length >= 4 &&
              handle.length <= 15 &&
              /^[a-z]/.test(handle) &&
              (!/\d/.test(handle) || (!/\d$/.test(handle) && /[a-z]/.test(handle)))
            );
        }

        // Filter out any known reserved names
        sanitized = sanitized.filter((h) => !RESERVED_HANDLES.has(h));

        // Fast parallel existence check against X public endpoints (2.5s budget)
        // to filter out handles that are already registered on X!
        const checkResults = await Promise.allSettled(
          sanitized.map(async (h) => {
            try {
              const controller = new AbortController();
              const timeout = setTimeout(() => controller.abort(), 1800);
              const xResp = await fetch(`https://x.com/${encodeURIComponent(h)}`, {
                method: "GET",
                headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                },
                signal: controller.signal,
                redirect: "manual",
              });
              clearTimeout(timeout);
              return { handle: h, status: xResp.status };
            } catch {
              return { handle: h, status: 0 };
            }
          })
        );

        // Keep 404 (available) handles, exclude 200/301/302 (taken) handles
        const availableHandles: string[] = [];
        const unknownHandles: string[] = [];
        for (const resItem of checkResults) {
          if (resItem.status === "fulfilled") {
            const { handle, status } = resItem.value;
            if (status === 404) {
              availableHandles.push(handle);
            } else if (status === 200 || status === 301 || status === 302) {
              recordServerLog("info", `Filtered out taken handle from AI batch: @${handle}`);
            } else {
              unknownHandles.push(handle);
            }
          }
        }

        // Return verified available handles first, or unconfirmed if none confirmed
        const finalHandles = availableHandles.length > 0 ? availableHandles : unknownHandles;

        recordServerLog("info", `Successfully generated ${finalHandles.length} unique handles with Gemini (${availableHandles.length} confirmed 404 available on X)`);
        return res.status(200).json({
          handles: finalHandles,
          availableCount: availableHandles.length,
          source: "gemini_ai",
        });
      }

      throw new Error("Invalid array format returned by model");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "AI generation failed";
      recordServerLog("error", `Failed to generate handles with Gemini: ${message}`);
      return res.status(200).json({
        handles: [],
        source: "offline_fallback",
        error: message,
      });
    }
  });

  // Client error/event logging endpoint
  app.post("/api/logs", (req, res) => {
    const { level = "info", message = "", details } = req.body || {};
    recordServerLog(level, `[Client] ${message}`, details);
    res.status(200).json({ logged: true });
  });

  app.get("/api/logs", (_req, res) => {
    res.json({ logs: serverLogs });
  });

  return app;
}

export async function startServer() {
  const app = createServerApp();
  const PORT = 3000;

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
  });
}

if (process.env.VERCEL !== "1") {
  startServer().catch((err) => {
    console.error("Fatal server error:", err);
    process.exit(1);
  });
}
