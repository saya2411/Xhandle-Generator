import React, { createContext, useContext, useEffect, useState } from "react";
import { AccessibilitySettings, FontSizeMultiplier } from "../types";
import { loadAccessibilitySettings, saveAccessibilitySettings } from "../utils/storage";
import { logger } from "../utils/logger";

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setFontSizeMultiplier: (multiplier: FontSizeMultiplier) => void;
  toggleHighContrast: () => void;
  getScaledFontSize: (basePx: number) => number;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadAccessibilitySettings);

  useEffect(() => {
    // Update document element font size or style variables for fluid rem scaling
    const root = document.documentElement;
    const scaleFactor = settings.fontSizeMultiplier;
    root.style.setProperty("--app-font-scale", `${scaleFactor}`);

    if (settings.highContrast) {
      root.classList.add("high-contrast-mode");
    } else {
      root.classList.remove("high-contrast-mode");
    }
  }, [settings]);

  const setFontSizeMultiplier = (multiplier: FontSizeMultiplier) => {
    const updated: AccessibilitySettings = {
      ...settings,
      fontSizeMultiplier: multiplier,
    };
    setSettings(updated);
    saveAccessibilitySettings(updated);
    logger.info(`Updated text scale multiplier to ${multiplier}x for visual accessibility.`);
  };

  const toggleHighContrast = () => {
    const updated: AccessibilitySettings = {
      ...settings,
      highContrast: !settings.highContrast,
    };
    setSettings(updated);
    saveAccessibilitySettings(updated);
    logger.info(`High contrast mode set to ${updated.highContrast}`);
  };

  const getScaledFontSize = (basePx: number): number => {
    return Math.round(basePx * settings.fontSizeMultiplier);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        setFontSizeMultiplier,
        toggleHighContrast,
        getScaledFontSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
