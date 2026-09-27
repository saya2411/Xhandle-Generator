export type VibeCategory = "all" | "void" | "adult" | "occult" | "numeric";

export interface HandleItem {
  id: string;
  text: string;
  category: VibeCategory;
  addedAt: number;
}

export type FontSizeMultiplier = 1 | 1.25 | 1.5 | 1.75;

export interface AccessibilitySettings {
  fontSizeMultiplier: FontSizeMultiplier;
  highContrast: boolean;
  reducedMotion: boolean;
}
