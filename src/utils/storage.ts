import { AccessibilitySettings, CheckStatusResult, HandleItem } from "../types";
import { getInitialUndergroundPool } from "../data/undergroundDictionary";
import { logger } from "./logger";

const STORAGE_KEYS = {
  FAVORITES: "xhandle_favorites_v1",
  HISTORY: "xhandle_history_v1",
  VERIFY_CACHE: "xhandle_verify_cache_v1",
  OFFLINE_POOL: "xhandle_offline_pool_v1",
  A11Y_PREFS: "xhandle_a11y_prefs_v1",
  SYNC_QUEUE: "xhandle_sync_queue_v1",
};

// In-memory fallback in case localStorage is disabled/sandboxed
const memoryStore: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
    return memoryStore[key] || null;
  } catch (e) {
    logger.warn(`Failed reading localStorage key: ${key}`, { error: String(e) });
    return memoryStore[key] || null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value);
    }
    memoryStore[key] = value;
  } catch (e) {
    logger.warn(`Failed writing localStorage key: ${key}`, { error: String(e) });
    memoryStore[key] = value;
  }
}

// 1. Accessibility Settings
export function loadAccessibilitySettings(): AccessibilitySettings {
  const saved = safeGetItem(STORAGE_KEYS.A11Y_PREFS);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // ignore
    }
  }
  return {
    fontSizeMultiplier: 1,
    highContrast: true,
    reducedMotion: false,
  };
}

export function saveAccessibilitySettings(settings: AccessibilitySettings): void {
  safeSetItem(STORAGE_KEYS.A11Y_PREFS, JSON.stringify(settings));
  logger.info(`Accessibility preferences saved (font scale: ${settings.fontSizeMultiplier}x)`);
}

// 2. Favorites / Stash
export function loadFavorites(): HandleItem[] {
  // Check active storage key, with migration fallback for any legacy favorites
  const data = safeGetItem(STORAGE_KEYS.FAVORITES) || safeGetItem("voidtag_favorites_v8") || safeGetItem("voidtag_favorites_v4");
  if (data) {
    try {
      const parsed: HandleItem[] = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.map((f) => {
          const clean = f.text.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
          let cat = f.category;
          // Remap legacy 'corpo' to appropriate category
          if ((cat as string) === "corpo") {
            cat = /\d/.test(clean) ? "numeric" : "void";
          }
          return {
            ...f,
            text: clean,
            category: cat,
          };
        }).filter((f) => f.text.length >= 4 && f.text.length <= 15);
      }
      return [];
    } catch {
      return [];
    }
  }
  return [];
}

export function saveFavorites(favorites: HandleItem[]): void {
  safeSetItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

// 3. History
export function loadHistory(): HandleItem[] {
  const data = safeGetItem(STORAGE_KEYS.HISTORY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

export function saveHistory(history: HandleItem[]): void {
  // Retain last 50 handles in local history
  safeSetItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 50)));
}

// 4. Handle Verification Status Cache
export function getCachedVerification(handle: string): CheckStatusResult | null {
  const normalized = handle.replace(/^@+/, "").toLowerCase();
  const raw = safeGetItem(STORAGE_KEYS.VERIFY_CACHE);
  if (raw) {
    try {
      const cache: Record<string, CheckStatusResult> = JSON.parse(raw);
      return cache[normalized] || null;
    } catch {
      return null;
    }
  }
  return null;
}

export function setCachedVerification(result: CheckStatusResult): void {
  const normalized = result.handle.replace(/^@+/, "").toLowerCase();
  const raw = safeGetItem(STORAGE_KEYS.VERIFY_CACHE);
  let cache: Record<string, CheckStatusResult> = {};
  if (raw) {
    try {
      cache = JSON.parse(raw);
    } catch {
      cache = {};
    }
  }
  cache[normalized] = result;
  safeSetItem(STORAGE_KEYS.VERIFY_CACHE, JSON.stringify(cache));
}

// 5. Offline Handle Pool
export function loadOfflinePool(): HandleItem[] {
  const stored = safeGetItem(STORAGE_KEYS.OFFLINE_POOL);
  if (stored) {
    try {
      const parsed: HandleItem[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Enforce uniqueness and character rules
        const seen = new Set<string>();
        const cleanPool: HandleItem[] = [];
        for (const item of parsed) {
          const lower = item.text.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
          let cat = item.category;
          if ((cat as string) === "corpo") {
            cat = /\d/.test(lower) ? "numeric" : "void";
          }
          const isNumericCat = cat === "numeric";

          // Validate constraints:
          // Word categories: strictly [a-z] only
          // Numeric category: letters + numbers, must start with a letter [a-z], have at least one digit in the middle, and NOT end with a digit
          const isValidWordOnly = !isNumericCat && /^[a-z]{4,15}$/.test(lower);
          const isValidNumeric =
            isNumericCat &&
            /^[a-z0-9]{4,15}$/.test(lower) &&
            /^[a-z]/.test(lower) &&
            /\d/.test(lower) &&
            /[a-z]$/.test(lower) &&
            !/^[0-9]/.test(lower) &&
            !/\d$/.test(lower);

          if ((isValidWordOnly || isValidNumeric) && !seen.has(lower)) {
            seen.add(lower);
            cleanPool.push({ ...item, category: cat, text: lower });
          }
        }
        if (cleanPool.length >= 10) {
          return cleanPool;
        }
      }
    } catch {
      // fallback
    }
  }
  const initial = getInitialUndergroundPool();
  saveOfflinePool(initial);
  return initial;
}

export function saveOfflinePool(pool: HandleItem[]): void {
  safeSetItem(STORAGE_KEYS.OFFLINE_POOL, JSON.stringify(pool));
}

export function appendToOfflinePool(newHandles: HandleItem[]): void {
  const existing = loadOfflinePool();
  const existingMap = new Set(existing.map((h) => h.text.toLowerCase()));
  const uniqueToAdd = newHandles.filter((h) => !existingMap.has(h.text.toLowerCase()));

  if (uniqueToAdd.length > 0) {
    const combined = [...uniqueToAdd, ...existing];
    saveOfflinePool(combined);
    logger.info(`Synced ${uniqueToAdd.length} new unhinged handles into offline storage pool.`);
  }
}

// 6. Sync Queue for Offline Retries
export function getSyncQueue(): string[] {
  const data = safeGetItem(STORAGE_KEYS.SYNC_QUEUE);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

export function addToSyncQueue(handle: string): void {
  const queue = getSyncQueue();
  if (!queue.includes(handle)) {
    queue.push(handle);
    safeSetItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
    logger.info(`Queued handle @${handle} for offline verification sync.`);
  }
}

export function clearSyncQueue(): void {
  safeSetItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify([]));
}
