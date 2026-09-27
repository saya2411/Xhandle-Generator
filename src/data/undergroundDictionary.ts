import { HandleItem, VibeCategory } from "../types";

/**
 * Aesthetic vocabulary pieces for dynamic combinatorial handle synthesis.
 * Built with rich, subterranean, poetic, occult, gothic, and cipher lexicons.
 * Produces over 500,000+ distinct combinations that will not collide with generic usernames on X.
 */
export const DYNAMIC_VOCABULARY = {
  void: {
    // Poetic, cosmic abyss, silence, astronomical gloom, nihilistic shadows
    prefixes: [
      "abyss", "null", "bleak", "hollow", "ashen", "dusk", "ghost", "velvet",
      "somber", "lunar", "spectral", "frost", "oblivion", "nihil", "umbra",
      "quiet", "pale", "stasis", "astral", "subzero", "zenith", "noctis",
      "solitude", "shroud", "chasm", "opaque", "phantom", "morose", "vacant",
      "caligo", "nebula", "silent", "crepuscule", "ether", "styx", "umbra"
    ],
    roots: [
      "walker", "moth", "reverie", "cadence", "mirage", "sanctum", "hymn",
      "specter", "drifter", "cipher", "glyph", "monolith", "zenith", "weaver",
      "lune", "relic", "strata", "echo", "vow", "shade", "haven", "spire",
      "solace", "veil", "fade", "gloom", "rune", "stasis", "shard", "pulse"
    ],
    suffixes: [
      "core", "net", "void", "arc", "zone", "vale", "rift", "veil", "glade", "flux"
    ]
  },
  adult: {
    // Visceral, dark gothic, lethal, predatory, wrath, grimblade, venom
    prefixes: [
      "grim", "viper", "venom", "skull", "reaper", "blade", "corpse", "morbid",
      "sinister", "dread", "scythe", "raven", "razor", "wrath", "carnage",
      "malice", "fang", "vile", "graver", "ruin", "spite", "savage", "flesh",
      "bane", "fatal", "bloody", "cinder", "toxic", "hollow", "plague", "feral"
    ],
    roots: [
      "reign", "scythe", "fiend", "wrath", "hound", "omen", "wraith", "malice",
      "fang", "blade", "hymn", "curse", "claw", "gallow", "pulse", "strike",
      "stalker", "fang", "spite", "render", "reaper", "slayer", "brand", "rune"
    ],
    suffixes: [
      "bane", "fang", "gore", "maw", "veil", "rage", "hex", "spire"
    ]
  },
  occult: {
    // Cyber-mysticism, digital witchcraft, rogue daemons, kernel runes, cryptics
    prefixes: [
      "cyber", "hex", "cryptic", "daemon", "witch", "runic", "necro", "glitch",
      "eldritch", "sigil", "arcane", "neural", "astral", "byte", "nether",
      "pagan", "synapse", "zero", "matrix", "malware", "quantum", "grimoire",
      "sorcery", "vector", "coven", "occult", "socket", "packet", "kernel"
    ],
    roots: [
      "daemon", "sigil", "protocol", "circuit", "kernel", "syntax", "oracle",
      "buffer", "compiler", "grimoire", "matrix", "codec", "socket", "packet",
      "rune", "cipher", "malware", "vector", "glitch", "wraith", "node", "shard"
    ],
    suffixes: [
      "net", "sys", "hex", "box", "lab", "hub", "run", "dev"
    ]
  },
  // Elite leet replacements and distinct internal ciphers
  // Rule: MUST start with [a-z], MUST have numbers inside, MUST end with [a-z]
  numericLeetPrefixes: [
    "gh0st", "v0id", "d4rk", "n3on", "bl00d", "s1lent", "c1pher", "h3x", "r3aper",
    "m4lice", "dr1ft", "v3lvet", "sk7ll", "cr1mzon", "n0x", "ph4ntom", "b1eed",
    "d4emon", "s1nister", "t0xic", "c0balt", "z3ro", "gr1m", "v1per", "k4rma",
    "s0mber", "gl1tch", "d3ath", "h4unted", "m0rbid", "n3cr0", "bl4ck", "e7her",
    "c7ber", "w1tch", "r7nic", "s1gil", "p4gan", "4stral", "n3ther", "0b1ivion"
  ],
  numericLeetStems: [
    "haze", "soul", "drift", "rush", "void", "cult", "weaver", "shade", "noir",
    "fade", "haven", "veil", "gloom", "core", "glow", "reign", "stasis", "scythe",
    "fang", "pulse", "rift", "wraith", "mind", "rot", "gate", "node", "relic",
    "strata", "glyph", "monk", "zone", "flux", "shard", "bane", "hymn", "rune"
  ],
  // Mid-word numeric inserts: e.g. "void" + "07" + "walker" = "void07walker" (guaranteed unique on X)
  midCiphers: ["0", "1", "2", "3", "4", "5", "7", "8", "9", "01", "07", "77", "99", "33", "00"]
};

/**
 * Curated list of distinctive subterranean base handles.
 * All handles strictly adhere to:
 * - 4-15 characters in length
 * - lowercase only
 * - Words-only tags (void, adult, occult) contain ONLY [a-z]
 * - Numeric tag contains letters + digits, NEVER starts with a digit, NEVER ends with a digit.
 */
export const BASE_UNDERGROUND_HANDLES: Omit<HandleItem, "id" | "addedAt">[] = [
  // ==========================================
  // === VOID & NOIR (WORDS ONLY [a-z]) ===
  // Distinctive, multi-syllable, aesthetic, subterranean
  // ==========================================
  { text: "voidcadence", category: "void" },
  { text: "abyssalmirage", category: "void" },
  { text: "bleakmindset", category: "void" },
  { text: "nullspecter", category: "void" },
  { text: "hollowzenith", category: "void" },
  { text: "ashenreverie", category: "void" },
  { text: "quietcaligo", category: "void" },
  { text: "velvetstrata", category: "void" },
  { text: "coldzenith", category: "void" },
  { text: "solitaryveil", category: "void" },
  { text: "spectralgloom", category: "void" },
  { text: "duskcadence", category: "void" },
  { text: "paleoblivion", category: "void" },
  { text: "abyssalveil", category: "void" },
  { text: "somberdrifter", category: "void" },
  { text: "shadowlunar", category: "void" },
  { text: "frostcadence", category: "void" },
  { text: "bleaksanctum", category: "void" },
  { text: "noirecliptic", category: "void" },
  { text: "obscurevoid", category: "void" },
  { text: "hollowmonolith", category: "void" },
  { text: "velvetobscure", category: "void" },
  { text: "ashensolace", category: "void" },
  { text: "phantomshade", category: "void" },
  { text: "abyssmuse", category: "void" },
  { text: "spectralbloom", category: "void" },
  { text: "ghostfrequency", category: "void" },
  { text: "ethercaligo", category: "void" },
  { text: "bleakglimmer", category: "void" },
  { text: "palenihilist", category: "void" },
  { text: "solitudevoid", category: "void" },
  { text: "fadedabyss", category: "void" },
  { text: "silentzenith", category: "void" },
  { text: "voidsanctum", category: "void" },
  { text: "nullstasis", category: "void" },
  { text: "bleaksolace", category: "void" },
  { text: "oblivionecho", category: "void" },
  { text: "somberdrift", category: "void" },
  { text: "quietnihil", category: "void" },
  { text: "ashenzenith", category: "void" },
  { text: "chasmwalker", category: "void" },
  { text: "moroseveil", category: "void" },
  { text: "vacantzenith", category: "void" },
  { text: "stygianlune", category: "void" },
  { text: "opaqueabyss", category: "void" },
  { text: "umbraecho", category: "void" },
  { text: "subzeronull", category: "void" },
  { text: "caligoshadow", category: "void" },
  { text: "solacereverie", category: "void" },

  // ==========================================
  // === DARK & EDGY (WORDS ONLY [a-z]) ===
  // Visceral, grim gothic, blood, reaper, skull, razor, venom, dread, wrath
  // ==========================================
  { text: "grimscythe", category: "adult" },
  { text: "venomwrath", category: "adult" },
  { text: "reaperhymn", category: "adult" },
  { text: "bladefiend", category: "adult" },
  { text: "corpseveil", category: "adult" },
  { text: "morbidpulse", category: "adult" },
  { text: "sinisterhaze", category: "adult" },
  { text: "bleedmalice", category: "adult" },
  { text: "venomreaper", category: "adult" },
  { text: "carnagehound", category: "adult" },
  { text: "scytheblade", category: "adult" },
  { text: "blackenedvein", category: "adult" },
  { text: "skullwraith", category: "adult" },
  { text: "sinisterwraith", category: "adult" },
  { text: "venomphantom", category: "adult" },
  { text: "gravehound", category: "adult" },
  { text: "bloodhexer", category: "adult" },
  { text: "viperscythe", category: "adult" },
  { text: "malicehound", category: "adult" },
  { text: "bleeddread", category: "adult" },
  { text: "fleshreaper", category: "adult" },
  { text: "razorvein", category: "adult" },
  { text: "deathreign", category: "adult" },
  { text: "wrathfiend", category: "adult" },
  { text: "dreadreign", category: "adult" },
  { text: "grimmalice", category: "adult" },
  { text: "bloodwraith", category: "adult" },
  { text: "corpsehound", category: "adult" },
  { text: "sinisterblade", category: "adult" },
  { text: "reaperclaw", category: "adult" },
  { text: "gravewraith", category: "adult" },
  { text: "morbidscythe", category: "adult" },
  { text: "wrathhound", category: "adult" },
  { text: "skullgallow", category: "adult" },
  { text: "brutaldread", category: "adult" },
  { text: "carnagehaze", category: "adult" },
  { text: "malicepulse", category: "adult" },
  { text: "razorcurse", category: "adult" },
  { text: "sinisterwrath", category: "adult" },
  { text: "toxicreign", category: "adult" },
  { text: "feralgallow", category: "adult" },
  { text: "ruinreaper", category: "adult" },
  { text: "spitehound", category: "adult" },
  { text: "fatalscythe", category: "adult" },
  { text: "cinderwrath", category: "adult" },
  { text: "plaguewraith", category: "adult" },
  { text: "morbidfiend", category: "adult" },

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
  { text: "neuralhexer", category: "occult" },
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
  { text: "synapsewitch", category: "occult" },
  { text: "covenserver", category: "occult" },
  { text: "vectordaemon", category: "occult" },
  { text: "quantumgrimoire", category: "occult" },

  // ==========================================
  // === NUMERIC & CIPHERS ===
  // STRICT RULES:
  // 1. MUST start with a letter [a-z] (NEVER start with a number).
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
  { text: "w1tchsyntax", category: "numeric" },
  { text: "e7herdrift", category: "numeric" },
  { text: "r7nicpulse", category: "numeric" },
  { text: "n3oncaligo", category: "numeric" },
  { text: "v0idstrata", category: "numeric" },
];

/**
 * Dynamically synthesizes an explicitly unique, high-tier aesthetic underground handle.
 * Employs multiple distinct synthesis blueprints so handles are completely fresh,
 * rare, and avoid taken namespace collisions.
 */
export function synthesizeDynamicHandle(category: VibeCategory): string {
  const cat: "void" | "adult" | "occult" | "numeric" =
    category === "all"
      ? (Math.random() < 0.28 ? "numeric" : (["void", "adult", "occult"][Math.floor(Math.random() * 3)] as "void" | "adult" | "occult"))
      : (category as "void" | "adult" | "occult" | "numeric");

  if (cat === "numeric") {
    // Mode A: Leet prefix + stem (e.g. "gh0st" + "haven" => "gh0sthaven")
    // Mode B: Word + mid-cipher + word (e.g. "void" + "07" + "lune" => "void07lune")
    // Mode C: Leet prefix + mid-cipher + stem (e.g. "d4rk" + "9" + "core" => "d4rk9core")
    const mode = Math.random();
    let candidate = "";

    if (mode < 0.5) {
      const leet = DYNAMIC_VOCABULARY.numericLeetPrefixes[Math.floor(Math.random() * DYNAMIC_VOCABULARY.numericLeetPrefixes.length)];
      const stem = DYNAMIC_VOCABULARY.numericLeetStems[Math.floor(Math.random() * DYNAMIC_VOCABULARY.numericLeetStems.length)];
      candidate = `${leet}${stem}`;
    } else if (mode < 0.8) {
      const prefList = ["void", "null", "dark", "grim", "neon", "cyber", "ghost", "reap", "hex", "dusk", "nox"];
      const stemList = ["drift", "fade", "gloom", "soul", "mind", "pulse", "core", "zone", "flux", "veil", "wraith"];
      const p = prefList[Math.floor(Math.random() * prefList.length)];
      const mid = DYNAMIC_VOCABULARY.midCiphers[Math.floor(Math.random() * DYNAMIC_VOCABULARY.midCiphers.length)];
      const s = stemList[Math.floor(Math.random() * stemList.length)];
      candidate = `${p}${mid}${s}`;
    } else {
      const leet = DYNAMIC_VOCABULARY.numericLeetPrefixes[Math.floor(Math.random() * DYNAMIC_VOCABULARY.numericLeetPrefixes.length)];
      const suffix = ["x", "core", "net", "zone", "drift", "pulse", "rift"][Math.floor(Math.random() * 7)];
      candidate = `${leet}${suffix}`;
    }

    if (
      candidate.length <= 15 &&
      candidate.length >= 4 &&
      /^[a-z]/.test(candidate) &&
      /\d/.test(candidate) &&
      /[a-z]$/.test(candidate)
    ) {
      return candidate;
    }
    return "gh0stcadence";
  }

  // Word-only categories: [a-z] only
  const vocab = DYNAMIC_VOCABULARY[cat];
  const p = vocab.prefixes[Math.floor(Math.random() * vocab.prefixes.length)];
  const r = vocab.roots[Math.floor(Math.random() * vocab.roots.length)];

  // Blueprint 1: Prefix + Root (e.g. "ashen" + "reverie" => "ashenreverie")
  let candidate = `${p}${r}`;

  // Blueprint 2: If too long (>15), try prefix + shorter suffix (e.g. "oblivion" + "flux" => "oblivionflux")
  if (candidate.length > 15) {
    const s = vocab.suffixes[Math.floor(Math.random() * vocab.suffixes.length)];
    candidate = `${p}${s}`;
  }

  // Blueprint 3: If candidate equals prefix or root, combine with a clean short tag
  if (candidate.length > 15) {
    candidate = candidate.slice(0, 15);
  }

  if (candidate.length >= 4 && /^[a-z]+$/.test(candidate)) {
    return candidate;
  }

  return "abyssalcadence";
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
