import React from "react";
import { View } from "./native/View";
import { Text } from "./native/Text";
import { Pressable } from "./native/Pressable";
import { useAccessibility } from "../context/AccessibilityContext";
import { FontSizeMultiplier } from "../types";

interface AccessibilityBarProps {
  onToggleShortcutsModal: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({ onToggleShortcutsModal }) => {
  const { settings, setFontSizeMultiplier, toggleHighContrast } = useAccessibility();

  const fontOptions: { label: string; value: FontSizeMultiplier; desc: string }[] = [
    { label: "1x", value: 1, desc: "Standard text size" },
    { label: "1.25x", value: 1.25, desc: "Large text size" },
    { label: "1.5x", value: 1.5, desc: "Extra large text size" },
    { label: "1.75x", value: 1.75, desc: "Maximum accessible size" },
  ];

  return (
    <View
      accessibilityRole="region"
      accessibilityLabel="Accessibility options bar"
      className="w-full flex-row flex-wrap items-center justify-between py-1.5 px-3 sm:px-4 bg-neutral-950/90 border-b border-neutral-900 text-xs gap-2"
    >
      {/* Font Size Scaler */}
      <View className="flex-row items-center gap-1.5 sm:gap-2">
        <Text baseSize={11} className="text-neutral-500 font-mono">
          Size:
        </Text>

        <View className="flex-row items-center bg-black/60 p-0.5 rounded border border-neutral-850">
          {fontOptions.map((opt) => {
            const isSelected = settings.fontSizeMultiplier === opt.value;
            return (
              <Pressable
                key={opt.value}
                id={`font-scale-${opt.label}`}
                onPress={() => setFontSizeMultiplier(opt.value)}
                accessibilityLabel={`${opt.desc}`}
                accessibilityRole="radio"
                className={`px-2 py-0.5 rounded text-xs min-h-[28px] min-w-[28px] inline-flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-neutral-800 text-neutral-100 font-semibold border border-neutral-700"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <span className={`text-[11px] font-mono select-none ${isSelected ? "text-neutral-100 font-semibold" : "text-neutral-500"}`}>
                  {opt.label}
                </span>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* High Contrast & Keyboard Shortcuts - Words only, no icons */}
      <View className="flex-row items-center gap-2">
        <Pressable
          id="high-contrast-toggle"
          onPress={toggleHighContrast}
          accessibilityLabel={settings.highContrast ? "Disable extra high contrast mode" : "Enable extra high contrast mode"}
          className={`px-2.5 py-1 rounded border min-h-[28px] inline-flex items-center justify-center transition-colors ${
            settings.highContrast
              ? "border-neutral-700 bg-neutral-900 text-neutral-200"
              : "border-neutral-850 bg-neutral-950 text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <span className={`text-[11px] font-mono select-none ${settings.highContrast ? "text-neutral-200 font-medium" : "text-neutral-500"}`}>
            {settings.highContrast ? "Contrast: High" : "Contrast: Normal"}
          </span>
        </Pressable>

        <Pressable
          id="shortcuts-toggle"
          onPress={onToggleShortcutsModal}
          accessibilityLabel="Keyboard shortcuts guide"
          className="px-2.5 py-1 rounded border border-neutral-850 bg-neutral-950 text-neutral-500 hover:text-neutral-300 min-h-[28px] inline-flex items-center justify-center transition-colors"
        >
          <span className="text-[11px] font-mono text-neutral-400 select-none">
            Shortcuts
          </span>
        </Pressable>
      </View>
    </View>
  );
};
