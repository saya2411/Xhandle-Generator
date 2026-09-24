import React from "react";
import { View } from "./native/View";
import { Text } from "./native/Text";
import { Pressable } from "./native/Pressable";

interface CycleButtonProps {
  onCycle: () => void;
  isLoading: boolean;
  isOffline: boolean;
}

export const CycleButton: React.FC<CycleButtonProps> = ({
  onCycle,
  isLoading,
  isOffline,
}) => {
  return (
    <View className="w-full max-w-lg mx-auto my-3 px-2 flex-col items-center">
      <Pressable
        id="cycle-handle-primary-btn"
        onPress={onCycle}
        disabled={isLoading}
        accessibilityLabel="Cycle to next unique underground handle"
        accessibilityHint="Generates next unique suggestion. Shortcut: Space or Enter key."
        className="w-full py-3.5 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-850 active:bg-neutral-800 text-neutral-100 hover:text-white font-mono font-semibold tracking-wider uppercase border border-neutral-700/80 hover:border-neutral-600 active:border-neutral-500 inline-flex items-center justify-center transition-all min-h-[48px] shadow-sm"
      >
        <span className="text-neutral-100 font-mono font-bold uppercase tracking-wider text-base sm:text-lg select-none text-center">
          {isLoading ? "Generating..." : "Cycle Handle"}
        </span>
      </Pressable>

      <Text
        baseSize={11}
        className="text-neutral-500 font-mono tracking-wide mt-2 text-center select-none"
      >
        {isOffline ? "Instant Offline Pool • Spacebar to cycle" : "Press Spacebar or Click to cycle"}
      </Text>
    </View>
  );
};
