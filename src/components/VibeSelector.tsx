import React from "react";
import { View } from "./native/View";
import { Pressable } from "./native/Pressable";
import { VibeCategory } from "../types";

interface VibeSelectorProps {
  selectedVibe: VibeCategory;
  onSelectVibe: (vibe: VibeCategory) => void;
  disabled?: boolean;
}

const VIBES: { id: VibeCategory; label: string; tag: string }[] = [
  { id: "all", label: "All Handles", tag: "Mixed" },
  { id: "void", label: "Void & Noir", tag: "Words only" },
  { id: "adult", label: "Dark & Edgy", tag: "Words only" },
  { id: "occult", label: "Cyber Occult", tag: "Words only" },
  { id: "numeric", label: "Numeric", tag: "Mix • Internal digits" },
];

export const VibeSelector: React.FC<VibeSelectorProps> = ({
  selectedVibe,
  onSelectVibe,
  disabled = false,
}) => {
  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel="Subculture vibe filters"
      className="w-full flex-row flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2 py-2"
    >
      {VIBES.map((vibe) => {
        const isSelected = selectedVibe === vibe.id;
        return (
          <Pressable
            key={vibe.id}
            id={`filter-vibe-${vibe.id}`}
            disabled={disabled}
            onPress={() => onSelectVibe(vibe.id)}
            accessibilityLabel={`Filter underground handles by ${vibe.label}`}
            accessibilityRole="radio"
            className={`px-3.5 py-1.5 rounded-full border text-xs transition-colors min-h-[36px] inline-flex items-center justify-center gap-1.5 ${
              isSelected
                ? "bg-neutral-800 text-neutral-100 font-semibold border-neutral-600 shadow-sm"
                : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-neutral-300"
            }`}
          >
            <span
              className={`font-mono text-xs uppercase tracking-wider select-none ${
                isSelected ? "text-neutral-100 font-semibold" : "text-neutral-400"
              }`}
            >
              {vibe.label}
            </span>
          </Pressable>
        );
      })}
    </View>
  );
};
