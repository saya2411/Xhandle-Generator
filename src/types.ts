export type VibeCategory = "all" | "void" | "adult" | "occult" | "numeric";

export type HandleStatus = "available" | "taken" | "unknown" | "checking" | "invalid" | "unchecked";

export interface HandleItem {
  id: string;
  text: string;
  category: VibeCategory;
  addedAt: number;
  status?: HandleStatus;
  statusMessage?: string;
  statusCheckedAt?: number;
  isFavorite?: boolean;
}

export interface CheckStatusResult {
  handle: string;
  valid: boolean;
  status: "available" | "taken" | "unknown" | "invalid";
  message: string;
  checkedAt: number;
  xUrl: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
  details?: Record<string, unknown>;
}

export type FontSizeMultiplier = 1 | 1.25 | 1.5 | 1.75;

export interface AccessibilitySettings {
  fontSizeMultiplier: FontSizeMultiplier;
  highContrast: boolean;
  reducedMotion: boolean;
}

export interface SyncState {
  isOnline: boolean;
  lastSyncTimestamp: number | null;
  pendingQueueCount: number;
  isSyncing: boolean;
  offlineCacheCount: number;
}
