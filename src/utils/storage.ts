import { HandleItem, AccessibilitySettings, FontSizeMultiplier } from "../types";
import { getInitialUndergroundPool } from "../data/undergroundDictionary";

const STORAGE_KEYS = {
  FAVORITES: "xhandle_favorites_v2",
  HISTORY: "xhandle_history_v2",
  OFFLINE_POOL: "xhandle_pool_v3",
  A11Y_PREFS: "xhandle_a11y_v2",
};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch {
    // Graceful fallback if cookies/storage disabled
  }
  return null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } catch {
    // Quota exceeded or restricted mode
  }
}

// 1. Accessibility Settings
export function loadAccessibilitySettings(): AccessibilitySettings {
  const defaults: AccessibilitySettings = {
    fontSizeMultiplier: 1,
    highContrast: false,
    reducedMotion: false,
  };

  const stored = safeGetItem(STORAGE_KEYS.A11Y_PREFS);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        fontSizeMultiplier: ([1, 1.25, 1.5, 1.75].includes(parsed.fontSizeMultiplier)
          ? parsed.fontSizeMultiplier
          : 1) as FontSizeMultiplier,
        highContrast: Boolean(parsed.highContrast),
        reducedMotion: Boolean(parsed.reducedMotion),
      };
    } catch {
      return defaults;
    }
  }
  return defaults;
}

export function saveAccessibilitySettings(settings: AccessibilitySettings): void {
  safeSetItem(STORAGE_KEYS.A11Y_PREFS, JSON.stringify(settings));
}

// 2. Favorites / Stash
export function loadFavorites(): HandleItem[] {
  const data = safeGetItem(STORAGE_KEYS.FAVORITES);
  if (data) {
    try {
      const parsed: HandleItem[] = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed
          .map((f) => ({
            ...f,
            text: f.text.toLowerCase().replace(/[^a-z0-9]/g, "").trim(),
          }))
          .filter((f) => f.text.length >= 4 && f.text.length <= 15);
      }
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
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [];
    }
  }
  return [];
}

export function saveHistory(history: HandleItem[]): void {
  safeSetItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 50)));
}

// 4. Handle Pool
export function loadOfflinePool(): HandleItem[] {
  const stored = safeGetItem(STORAGE_KEYS.OFFLINE_POOL);
  if (stored) {
    try {
      const parsed: HandleItem[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length >= 20) {
        return parsed;
      }
    } catch {
      // Fallback to fresh seed
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
  }
}
