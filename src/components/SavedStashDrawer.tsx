import React from "react";
import { View } from "./native/View";
import { Text } from "./native/Text";
import { Pressable } from "./native/Pressable";
import { HandleItem } from "../types";
import { logger } from "../utils/logger";

interface SavedStashDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: HandleItem[];
  onRemoveFavorite: (id: string) => void;
  onClearAllFavorites: () => void;
  onSelectHandle: (handle: HandleItem) => void;
}

export const SavedStashDrawer: React.FC<SavedStashDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearAllFavorites,
  onSelectHandle,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [copiedAll, setCopiedAll] = React.useState(false);

  if (!isOpen) return null;

  const handleCopySingle = async (item: HandleItem) => {
    try {
      const clean = item.text.replace(/_/g, "");
      await navigator.clipboard.writeText(`@${clean}`);
      setCopiedId(item.id);
      logger.info(`Copied saved handle @${clean} from stash`);
      setTimeout(() => setCopiedId(null), 1800);
    } catch (e) {
      logger.error("Failed to copy saved handle", { error: String(e) });
    }
  };

  const handleCopyAll = async () => {
    if (favorites.length === 0) return;
    try {
      const allText = favorites.map((f) => `@${f.text.replace(/_/g, "")}`).join("\n");
      await navigator.clipboard.writeText(allText);
      setCopiedAll(true);
      logger.info(`Copied all ${favorites.length} saved handles to clipboard`);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (e) {
      logger.error("Failed to copy all favorites", { error: String(e) });
    }
  };

  return (
    <View
      accessibilityRole="dialog"
      accessibilityLabel="Saved Handles Offline Stash"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <View className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-neutral-900">
          <View className="flex-row items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
            <Text baseSize={15} className="font-mono font-bold text-neutral-100 uppercase tracking-wider">
              Offline Stash ({favorites.length})
            </Text>
          </View>

          <Pressable
            id="close-stash-drawer"
            onPress={onClose}
            accessibilityLabel="Close saved stash modal"
            className="px-3 py-1 rounded-lg border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white min-h-[32px] inline-flex items-center justify-center transition-colors"
          >
            <span className="text-xs font-mono select-none">Close</span>
          </Pressable>
        </View>

        {/* Content list */}
        <View className="p-4 flex-1 overflow-y-auto space-y-2">
          {favorites.length === 0 ? (
            <View className="py-12 items-center justify-center text-center">
              <Text baseSize={13} className="text-neutral-500 font-mono">
                No saved handles in offline stash.
              </Text>
              <Text baseSize={11} className="text-neutral-600 font-mono mt-1">
                Save handles to preserve them offline permanently.
              </Text>
            </View>
          ) : (
            favorites.map((item) => {
              const cleanText = item.text.replace(/_/g, "");
              return (
                <View
                  key={item.id}
                  className="flex-row items-center justify-between p-3 rounded-xl bg-black border border-neutral-900 hover:border-neutral-800 transition-colors"
                >
                  <Pressable
                    id={`select-stash-handle-${cleanText}`}
                    onPress={() => {
                      onSelectHandle({ ...item, text: cleanText });
                      onClose();
                    }}
                    accessibilityLabel={`Load handle @${cleanText}`}
                    className="flex-1 text-left inline-flex items-center gap-2"
                  >
                    <span className="font-mono font-bold text-neutral-200 text-sm hover:text-white transition-colors">
                      @{cleanText}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-500">
                      {item.category === "void" ? "Void" : item.category === "adult" ? "Edgy" : item.category === "occult" ? "Occult" : item.category === "numeric" ? "Numeric" : item.category}
                    </span>
                  </Pressable>

                  <View className="flex-row items-center gap-1.5">
                    <Pressable
                      id={`copy-stash-handle-${cleanText}`}
                      onPress={() => handleCopySingle(item)}
                      accessibilityLabel={`Copy @${cleanText}`}
                      className="px-2.5 py-1 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-neutral-700 min-h-[32px] inline-flex items-center justify-center transition-colors"
                    >
                      <span className="font-mono text-xs text-neutral-300 select-none">
                        {copiedId === item.id ? "Copied" : "Copy"}
                      </span>
                    </Pressable>

                    <Pressable
                      id={`remove-stash-handle-${cleanText}`}
                      onPress={() => onRemoveFavorite(item.id)}
                      accessibilityLabel={`Delete @${cleanText} from stash`}
                      className="px-2.5 py-1 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:text-red-400 min-h-[32px] inline-flex items-center justify-center transition-colors"
                    >
                      <span className="font-mono text-xs text-neutral-400 select-none">
                        Delete
                      </span>
                    </Pressable>
                  </View>
                </View>
              );
            })
          )}
        </View>

        {/* Footer controls */}
        {favorites.length > 0 && (
          <View className="p-4 border-t border-neutral-900 flex-row items-center justify-between gap-2 bg-neutral-950">
            <Pressable
              id="copy-all-stash-btn"
              onPress={handleCopyAll}
              accessibilityLabel="Copy all saved handles to clipboard"
              className="flex-1 py-2 px-3 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:text-neutral-100 inline-flex items-center justify-center min-h-[38px] transition-colors"
            >
              <span className="font-mono font-semibold text-xs text-neutral-200 select-none">
                {copiedAll ? "All Copied" : "Copy All"}
              </span>
            </Pressable>

            <Pressable
              id="clear-all-stash-btn"
              onPress={onClearAllFavorites}
              accessibilityLabel="Clear all saved handles"
              className="py-2 px-3.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:text-red-400 inline-flex items-center justify-center min-h-[38px] transition-colors"
            >
              <span className="font-mono text-xs text-neutral-400 select-none">
                Clear
              </span>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};
