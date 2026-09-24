import React from "react";
import { View } from "./native/View";
import { Text } from "./native/Text";
import { Pressable } from "./native/Pressable";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "Space or Enter", action: "Cycle to next unique handle" },
    { key: "C", action: "Copy current @handle to clipboard" },
    { key: "S", action: "Save or remove current handle in stash" },
    { key: "X", action: "Open handle profile directly on x.com" },
    { key: "B", action: "Open offline stash drawer" },
    { key: "Esc", action: "Close active drawer / modal" },
  ];

  return (
    <View
      accessibilityRole="dialog"
      accessibilityLabel="Keyboard shortcuts guide"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <View className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-5">
        <View className="flex-row items-center justify-between pb-4 border-b border-neutral-900">
          <Text baseSize={15} className="font-mono font-bold text-neutral-100 uppercase tracking-wider">
            Keyboard Shortcuts
          </Text>

          <Pressable
            id="close-shortcuts-modal"
            onPress={onClose}
            accessibilityLabel="Close shortcuts modal"
            className="px-3 py-1 rounded-lg border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white min-h-[32px] inline-flex items-center justify-center transition-colors"
          >
            <span className="text-xs font-mono select-none">Close</span>
          </Pressable>
        </View>

        <View className="py-4 space-y-2">
          {shortcuts.map((sc, i) => (
            <View
              key={i}
              className="flex-row items-center justify-between p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-850"
            >
              <Text baseSize={12} className="text-neutral-300 font-mono">
                {sc.action}
              </Text>
              <kbd className="px-2 py-0.5 bg-black border border-neutral-750 rounded text-xs font-mono text-neutral-200 font-medium shadow-inner">
                {sc.key}
              </kbd>
            </View>
          ))}
        </View>

        <View className="pt-2 border-t border-neutral-900 items-center">
          <Text baseSize={11} className="text-neutral-500 font-mono text-center">
            Zero audio policy enforced: all interactions are strictly silent.
          </Text>
        </View>
      </View>
    </View>
  );
};
