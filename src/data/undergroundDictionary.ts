import { HandleItem, VibeCategory } from "../types";

/**
 * Curated, aesthetic, subterranean, high-tier X handles.
 * - Words only tags (void, adult, occult) strictly contain ONLY letters [a-z] (no digits, no trailing junk characters like 'x' or 'q').
 * - Numeric tag strictly contains a mix of letters and numbers [a-z0-9], NEVER starting with a number and NEVER ending with a number.
 * - All handles strictly 4-15 characters.
 */
export const BASE_UNDERGROUND_HANDLES: Omit<HandleItem, "id" | "addedAt">[] = [
  // ==========================================
  // === VOID & NOIR (WORDS ONLY [a-z]) ===
  // Cosmic silence, obsidian shadows, existential minimalism, poetic abyss
  // ==========================================
  { text: "voidwalker", category: "void" },
  { text: "abyssmoth", category: "void" },
  { text: "bleakmind", category: "void" },
  { text: "nullphantom", category: "void" },
  { text: "hollowvow", category: "void" },
  { text: "duskfade", category: "void" },
  { text: "ashenhalo", category: "void" },
  { text: "ghostmirage", category: "void" },
  { text: "quietzenith", category: "void" },
  { text: "velvetvoid", category: "void" },
  { text: "noirphantom", category: "void" },
  { text: "coldreverie", category: "void" },
  { text: "solitaryvoid", category: "void" },
  { text: "bleaksilence", category: "void" },
  { text: "spectralgloom", category: "void" },
  { text: "duskreverie", category: "void" },
  { text: "paleecho", category: "void" },
  { text: "voidzenith", category: "void" },
  { text: "abyssalveil", category: "void" },
  { text: "nullgloom", category: "void" },
  { text: "somberhaze", category: "void" },
  { text: "ashendrift", category: "void" },
  { text: "shadowlune", category: "void" },
  { text: "frostgloom", category: "void" },
  { text: "bleakhaven", category: "void" },
  { text: "voidcadence", category: "void" },
  { text: "noirecho", category: "void" },
  { text: "spectralfade", category: "void" },
  { text: "coldzenith", category: "void" },
  { text: "obscurevoid", category: "void" },
  { text: "palegloom", category: "void" },
  { text: "hollowdrift", category: "void" },
  { text: "voidpulse", category: "void" },
  { text: "bleakmoth", category: "void" },
  { text: "ghostfade", category: "void" },
  { text: "velvetgloom", category: "void" },
  { text: "shadowdrift", category: "void" },
  { text: "voidhaze", category: "void" },
  { text: "ashensolace", category: "void" },
  { text: "coldmirage", category: "void" },
  { text: "phantomshade", category: "void" },
  { text: "lunarvoid", category: "void" },
  { text: "abyssmuse", category: "void" },
  { text: "spectralbloom", category: "void" },
  { text: "ghostfrequency", category: "void" },
  { text: "voidwhisper", category: "void" },
  { text: "ethergloom", category: "void" },
  { text: "bleakglimmer", category: "void" },
  { text: "noirecliptic", category: "void" },
  { text: "palenihil", category: "void" },
  { text: "solitudevoid", category: "void" },
  { text: "duskveil", category: "void" },
  { text: "fadedabyss", category: "void" },
  { text: "hollowlune", category: "void" },
  { text: "silentzenith", category: "void" },
  { text: "voidsanctum", category: "void" },
  { text: "abyssalpulse", category: "void" },
  { text: "nullstasis", category: "void" },
  { text: "bleaksolace", category: "void" },
  { text: "oblivionecho", category: "void" },
  { text: "somberdrift", category: "void" },
  { text: "duskphantom", category: "void" },
  { text: "quietnihil", category: "void" },
  { text: "velvetobscure", category: "void" },
  { text: "phantomhaze", category: "void" },
  { text: "ashenzenith", category: "void" },

  // ==========================================
  // === DARK & EDGY (WORDS ONLY [a-z]) ===
  // Visceral, grim gothic, blood, reaper, skull, razor, venom, dread, wrath
  // ==========================================
  { text: "bloodreign", category: "adult" },
  { text: "grimscythe", category: "adult" },
  { text: "viperfang", category: "adult" },
  { text: "venomwrath", category: "adult" },
  { text: "skullthorn", category: "adult" },
  { text: "reaperhymn", category: "adult" },
  { text: "bladefiend", category: "adult" },
  { text: "corpseveil", category: "adult" },
  { text: "morbidpulse", category: "adult" },
  { text: "sinisterhaze", category: "adult" },
  { text: "bleedmalice", category: "adult" },
  { text: "venomreaper", category: "adult" },
  { text: "carnagehound", category: "adult" },
  { text: "dreadomen", category: "adult" },
  { text: "scytheblade", category: "adult" },
  { text: "vileomen", category: "adult" },
  { text: "morbidwrath", category: "adult" },
  { text: "ravencurse", category: "adult" },
  { text: "razorhound", category: "adult" },
  { text: "blackenedvein", category: "adult" },
  { text: "skullwraith", category: "adult" },
  { text: "grimomen", category: "adult" },
  { text: "sinisterwraith", category: "adult" },
  { text: "venomphantom", category: "adult" },
  { text: "dreadhaze", category: "adult" },
  { text: "gravehound", category: "adult" },
  { text: "bloodhex", category: "adult" },
  { text: "viperscythe", category: "adult" },
  { text: "malicehound", category: "adult" },
  { text: "bleeddread", category: "adult" },
  { text: "grimcurse", category: "adult" },
  { text: "fleshreaper", category: "adult" },
  { text: "razorvein", category: "adult" },
  { text: "deathreign", category: "adult" },
  { text: "wrathfiend", category: "adult" },
  { text: "skullomen", category: "adult" },
  { text: "dreadreign", category: "adult" },
  { text: "grimmalice", category: "adult" },
  { text: "bloodwraith", category: "adult" },
  { text: "corpsehound", category: "adult" },
  { text: "sinisterblade", category: "adult" },
  { text: "vileblood", category: "adult" },
  { text: "dreadfang", category: "adult" },
  { text: "reaperclaw", category: "adult" },
  { text: "venombleed", category: "adult" },
  { text: "gravewraith", category: "adult" },
  { text: "morbidscythe", category: "adult" },
  { text: "deathhound", category: "adult" },
  { text: "wrathhound", category: "adult" },
  { text: "skullgallow", category: "adult" },
  { text: "viperblade", category: "adult" },
  { text: "brutaldread", category: "adult" },
  { text: "fleshomen", category: "adult" },
  { text: "carnagehaze", category: "adult" },
  { text: "grimreaper", category: "adult" },
  { text: "malicepulse", category: "adult" },
  { text: "razorcurse", category: "adult" },
  { text: "morbidhaze", category: "adult" },
  { text: "sinisterwrath", category: "adult" },
  { text: "toxicreign", category: "adult" },
  { text: "bloodfang", category: "adult" },

  // ==========================================
  // === CYBER OCCULT (WORDS ONLY [a-z]) ===
  // Digital arcana, rogue daemons, glitch runes, nether protocols, code grimoires
  // ==========================================
  { text: "cyberdaemon", category: "occult" },
  { text: "hexprotocol", category: "occult" },
  { text: "crypticsigil", category: "occult" },
  { text: "daemonkernel", category: "occult" },
  { text: "witchsyntax", category: "occult" },
  { text: "runiccircuit", category: "occult" },
  { text: "necrodigital", category: "occult" },
  { text: "sorcerynet", category: "occult" },
  { text: "glitchoracle", category: "occult" },
  { text: "eldritchbyte", category: "occult" },
  { text: "sigilcodec", category: "occult" },
  { text: "arcanebuffer", category: "occult" },
  { text: "phantomdaemon", category: "occult" },
  { text: "witchlogic", category: "occult" },
  { text: "darkcompiler", category: "occult" },
  { text: "neuralhex", category: "occult" },
  { text: "cyberphantom", category: "occult" },
  { text: "spectralkernel", category: "occult" },
  { text: "crypticrune", category: "occult" },
  { text: "netnecromancy", category: "occult" },
  { text: "bytegrimoire", category: "occult" },
  { text: "technosigil", category: "occult" },
  { text: "runicmatrix", category: "occult" },
  { text: "daemonsocket", category: "occult" },
  { text: "astralglitch", category: "occult" },
  { text: "sigilpacket", category: "occult" },
  { text: "eldritchlogic", category: "occult" },
  { text: "witchterminal", category: "occult" },
  { text: "hexcompiler", category: "occult" },
  { text: "cyberwraith", category: "occult" },
  { text: "daemonbyte", category: "occult" },
  { text: "glitchsigil", category: "occult" },
  { text: "crypticpacket", category: "occult" },
  { text: "arcanecompiler", category: "occult" },
  { text: "daemonsigil", category: "occult" },
  { text: "hexsocket", category: "occult" },
  { text: "runicbuffer", category: "occult" },
  { text: "spectralpacket", category: "occult" },
  { text: "witchkernel", category: "occult" },
  { text: "necrocompiler", category: "occult" },
  { text: "darkprotocol", category: "occult" },
  { text: "glitchgrimoire", category: "occult" },
  { text: "astralsigil", category: "occult" },
  { text: "neuralgrimoire", category: "occult" },
  { text: "cyberoracle", category: "occult" },
  { text: "bytephantom", category: "occult" },
  { text: "eldritchcode", category: "occult" },
  { text: "syntaxdaemon", category: "occult" },
  { text: "occultpacket", category: "occult" },
  { text: "sigilmatrix", category: "occult" },
  { text: "runicdaemon", category: "occult" },
  { text: "hexgrimoire", category: "occult" },
  { text: "crypticdaemon", category: "occult" },
  { text: "daemonsyntax", category: "occult" },
  { text: "phantomprotocol", category: "occult" },
  { text: "glitchmatrix", category: "occult" },

  // ==========================================
  // === NUMERIC & CIPHERS ===
  // STRICT RULES:
  // 1. MUST start with a letter [a-z] (NEVER start with a number, NEVER start with 0).
  // 2. MUST contain numbers inside the word (leet / cipher style).
  // 3. MUST end with a letter [a-z] (NEVER end with a number).
  // ==========================================
  { text: "gh0sthaze", category: "numeric" },
  { text: "v0idwalker", category: "numeric" },
  { text: "d4rksoul", category: "numeric" },
  { text: "n3ondrift", category: "numeric" },
  { text: "bl00drush", category: "numeric" },
  { text: "s1lentvoid", category: "numeric" },
  { text: "c1phercult", category: "numeric" },
  { text: "h3xweaver", category: "numeric" },
  { text: "r3aperhaze", category: "numeric" },
  { text: "m4liceshade", category: "numeric" },
  { text: "dr1fthaze", category: "numeric" },
  { text: "v3lvetnoir", category: "numeric" },
  { text: "sk7llreaper", category: "numeric" },
  { text: "cr1mzonfade", category: "numeric" },
  { text: "n0xhaven", category: "numeric" },
  { text: "ph4ntomveil", category: "numeric" },
  { text: "b1eedgloom", category: "numeric" },
  { text: "d4emoncore", category: "numeric" },
  { text: "s1nisterglow", category: "numeric" },
  { text: "t0xicreign", category: "numeric" },
  { text: "c0baltfade", category: "numeric" },
  { text: "z3rostasis", category: "numeric" },
  { text: "gr1mscythe", category: "numeric" },
  { text: "v1perfang", category: "numeric" },
  { text: "ch40spulse", category: "numeric" },
  { text: "k4rmavoid", category: "numeric" },
  { text: "s0mbershade", category: "numeric" },
  { text: "gl1tchcore", category: "numeric" },
  { text: "d3athveil", category: "numeric" },
  { text: "h4untedmind", category: "numeric" },
  { text: "m0rbidpulse", category: "numeric" },
  { text: "n3cr0shade", category: "numeric" },
  { text: "bl4ckened", category: "numeric" },
  { text: "d1gitallogic", category: "numeric" },
  { text: "gh0stfade", category: "numeric" },
  { text: "tox1cvein", category: "numeric" },
  { text: "n3ondecay", category: "numeric" },
  { text: "gr1mhex", category: "numeric" },
  { text: "r3belvenom", category: "numeric" },
  { text: "wr4thblade", category: "numeric" },
  { text: "ph4ntomhex", category: "numeric" },
  { text: "s1nisterrot", category: "numeric" },
  { text: "c0rpsepulse", category: "numeric" },
  { text: "dr1ftskull", category: "numeric" },
  { text: "s1gilrot", category: "numeric" },
  { text: "n0xreaper", category: "numeric" },
  { text: "b1eedshadow", category: "numeric" },
  { text: "sc7thegloom", category: "numeric" },
  { text: "r3aperblade", category: "numeric" },
  { text: "ph4ntomnox", category: "numeric" },
  { text: "d4rksigil", category: "numeric" },
  { text: "s1lentdrift", category: "numeric" },
  { text: "z3ronox", category: "numeric" },
  { text: "v3lvetdrift", category: "numeric" },
  { text: "c1phernox", category: "numeric" },
  { text: "m4trixrift", category: "numeric" },
  { text: "r3licshadow", category: "numeric" },
  { text: "sh4dovoid", category: "numeric" },
  { text: "pr0t0daemon", category: "numeric" },
  { text: "bl00dveil", category: "numeric" },
  { text: "sk7llwraith", category: "numeric" },
  { text: "gr1mphantom", category: "numeric" },
  { text: "v1perhaze", category: "numeric" },
  { text: "h3xprotocol", category: "numeric" },
  { text: "c1phersigil", category: "numeric" },
];

/**
 * Aesthetic vocabulary pieces for dynamic combinatorial handle synthesis.
 * This guarantees an inexhaustible, highly creative generator on top of the curated list.
 */
const DYNAMIC_VOCABULARY = {
  void: {
    prefixes: ["void", "null", "abyss", "bleak", "hollow", "ashen", "dusk", "ghost", "silent", "velvet", "pale", "somber", "cold", "lunar", "spectral", "frost"],
    stems: ["walker", "moth", "mind", "phantom", "vow", "fade", "halo", "mirage", "zenith", "reverie", "silence", "gloom", "echo", "veil", "haze", "drift", "pulse", "solace", "cadence", "lune", "haven", "sanctum"],
  },
  adult: {
    prefixes: ["blood", "grim", "viper", "venom", "skull", "reaper", "blade", "corpse", "morbid", "sinister", "dread", "scythe", "raven", "razor", "death", "wrath", "carnage", "malice"],
    stems: ["reign", "scythe", "fang", "wrath", "thorn", "hymn", "fiend", "veil", "pulse", "haze", "malice", "hound", "omen", "blade", "curse", "wraith", "hex", "claw", "gallow"],
  },
  occult: {
    prefixes: ["cyber", "hex", "cryptic", "daemon", "witch", "runic", "necro", "glitch", "eldritch", "sigil", "arcane", "neural", "astral", "byte", "nether"],
    stems: ["daemon", "protocol", "sigil", "kernel", "syntax", "circuit", "oracle", "byte", "codec", "buffer", "logic", "compiler", "hex", "matrix", "grimoire", "socket", "packet"],
  },
  numericLeetWords: [
    "gh0st", "v0id", "d4rk", "n3on", "bl00d", "s1lent", "c1pher", "h3x", "r3aper",
    "m4lice", "dr1ft", "v3lvet", "sk7ll", "cr1mzon", "n0x", "ph4ntom", "b1eed",
    "d4emon", "s1nister", "t0xic", "c0balt", "z3ro", "gr1m", "v1per", "k4rma",
    "s0mber", "gl1tch", "d3ath", "h4unted", "m0rbid", "n3cr0", "bl4ck"
  ],
  numericStems: [
    "haze", "soul", "drift", "rush", "void", "cult", "weaver", "shade", "noir",
    "fade", "haven", "veil", "gloom", "core", "glow", "reign", "stasis", "scythe",
    "fang", "pulse", "rift", "wraith", "mind", "rot", "gate"
  ],
};

/**
 * Dynamically synthesizes a high-quality aesthetic underground handle on the fly.
 * Guaranteed to respect all length (4-15 chars) and tag constraints.
 */
export function synthesizeDynamicHandle(category: VibeCategory): string {
  const cat = category === "all" ? (Math.random() < 0.25 ? "numeric" : (["void", "adult", "occult"][Math.floor(Math.random() * 3)] as VibeCategory)) : category;

  if (cat === "numeric") {
    // Pick leet prefix + letter stem: ensures start with [a-z], has middle numbers, ends with [a-z]
    const leet = DYNAMIC_VOCABULARY.numericLeetWords[Math.floor(Math.random() * DYNAMIC_VOCABULARY.numericLeetWords.length)];
    const stem = DYNAMIC_VOCABULARY.numericStems[Math.floor(Math.random() * DYNAMIC_VOCABULARY.numericStems.length)];
    const candidate = `${leet}${stem}`;
    if (candidate.length <= 15 && /^[a-z]/.test(candidate) && /\d/.test(candidate) && /[a-z]$/.test(candidate)) {
      return candidate;
    }
    return "gh0sthaze";
  }

  const vocab = DYNAMIC_VOCABULARY[cat as "void" | "adult" | "occult"] || DYNAMIC_VOCABULARY.void;
  const p = vocab.prefixes[Math.floor(Math.random() * vocab.prefixes.length)];
  const s = vocab.stems[Math.floor(Math.random() * vocab.stems.length)];
  const candidate = `${p}${s}`;
  if (candidate.length <= 15 && candidate.length >= 4 && /^[a-z]+$/.test(candidate)) {
    return candidate;
  }
  return `${p}${s}`.slice(0, 15);
}

/**
 * Initializes the default offline pool with unique IDs and clean initial status.
 */
export function getInitialOfflineHandles(): HandleItem[] {
  const timestamp = Date.now();
  return BASE_UNDERGROUND_HANDLES.map((item, index) => ({
    id: `offline_seed_${index}_${item.text}`,
    text: item.text,
    category: item.category,
    addedAt: timestamp - index * 1000,
    status: "unchecked",
    statusMessage: "Unchecked",
    statusCheckedAt: undefined,
  }));
}

export const getInitialUndergroundPool = getInitialOfflineHandles;
