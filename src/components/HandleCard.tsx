import React, { useState } from "react";
import { View } from "./native/View";
import { Text } from "./native/Text";
import { Pressable } from "./native/Pressable";
import { HandleItem } from "../types";
import { logger } from "../utils/logger";

interface HandleCardProps {
  handle: HandleItem | null;
  onCheckExistence: (handleText: string) => void;
  isCheckingExistence: boolean;
  onToggleFavorite: (handle: HandleItem) => void;
  isFavorite: boolean;
  onCopyHandle: (text: string) => void;
  hasCopied: boolean;
  isOnline: boolean;
}

export const HandleCard: React.FC<HandleCardProps> = ({
  handle,
  onCheckExistence,
  isCheckingExistence,
  onToggleFavorite,
  isFavorite,
  onCopyHandle,
  hasCopied,
  isOnline: _isOnline,
}) => {
  const [localFeedback, setLocalFeedback] = useState<string | null>(null);
  const [checkedForHandle, setCheckedForHandle] = useState<string | null>(null);

  if (!handle) {
    return (
      <View className="w-full max-w-xl mx-auto p-8 rounded-xl border border-neutral-900 bg-neutral-950 items-center justify-center min-h-[200px]">
        <Text baseSize={14} className="text-neutral-500 font-mono text-center">
          Tap cycle button below to generate unique underground handles.
        </Text>
      </View>
    );
  }

  // Ensure no underscores exist in display text
  const handleText = handle.text.replace(/_/g, "");
  const charCount = handleText.length;
  const isMaxLimit = charCount >= 15;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(`@${handleText}`);
      onCopyHandle(`@${handleText}`);
      setLocalFeedback("COPIED");
      logger.info(`Copied handle @${handleText} to clipboard`);
      setTimeout(() => setLocalFeedback(null), 2000);
    } catch (err) {
      logger.error(`Clipboard write failed for @${handleText}`, { error: String(err) });
      setLocalFeedback("FAILED");
      setTimeout(() => setLocalFeedback(null), 2000);
    }
  };

  const handleDirectXLink = () => {
    const url = `https://x.com/${encodeURIComponent(handleText)}`;
    logger.info(`Opening direct profile check on X: ${url}`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleTweetIntent = () => {
    const text = encodeURIComponent(`claiming @${handleText}`);
    const intentUrl = `https://x.com/intent/tweet?text=${text}`;
    logger.info(`Opening Twitter intent for @${handleText}`);
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  };

  const isCheckedForCurrentHandle =
    (checkedForHandle === handleText || handle.status === "available" || handle.status === "taken") &&
    handle.status !== "unchecked";

  const isAvailable = isCheckedForCurrentHandle && handle.status === "available";
  const isLikelyInUse = isCheckedForCurrentHandle && !isAvailable;

  const handleCheckClick = () => {
    if (isCheckingExistence) return;
    if (isCheckedForCurrentHandle) {
      // If already checked, clicking opens directly on X to view or claim
      handleDirectXLink();
      return;
    }
    setCheckedForHandle(handleText);
    onCheckExistence(handleText);
  };

  return (
    <View
      accessibilityRole="region"
      accessibilityLabel={`Generated handle: @${handleText}`}
      className="w-full max-w-xl mx-auto p-5 sm:p-6 rounded-2xl border border-neutral-850 bg-neutral-950/80 shadow-lg relative transition-all"
    >
      {/* Header Info: Category and Char length */}
      <View className="flex-row items-center justify-between pb-3.5 border-b border-neutral-900">
        <View className="flex-row items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 shrink-0" />
          <Text
            baseSize={11}
            className="uppercase tracking-widest text-neutral-400 font-mono font-medium"
          >
            {handle.category === "void"
              ? "Void & Noir"
              : handle.category === "adult"
              ? "Dark & Edgy"
              : handle.category === "occult"
              ? "Cyber Occult"
              : handle.category === "numeric"
              ? "Numeric & Ciphers"
              : "Underground"}
          </Text>
          <span className="text-neutral-600 text-[10px] font-mono">
            {/\d/.test(handleText) ? "• Mix (no start/end digits)" : "• Words Only"}
          </span>
        </View>

        <View className="flex-row items-center gap-1">
          <Text
            baseSize={11}
            className={`font-mono ${isMaxLimit ? "text-neutral-300 font-semibold" : "text-neutral-500"}`}
          >
            {charCount}/15 chars
          </Text>
        </View>
      </View>

      {/* Main Handle Display */}
      <View className="py-6 sm:py-8 items-center justify-center text-center">
        <Text
          baseSize={32}
          accessibilityRole="header"
          accessibilityLiveRegion="polite"
          className="text-neutral-100 font-mono font-bold tracking-tight select-all break-all text-center"
        >
          @{handleText}
        </Text>

        {/* Dynamic Check Availability Button: says 'Check Availability' initially, and 'Available' or 'Likely in use' once clicked */}
        <View className="mt-4 flex-row items-center justify-center">
          <Pressable
            id="check-existence-btn"
            onPress={handleCheckClick}
            disabled={isCheckingExistence}
            accessibilityLabel={
              isCheckingExistence
                ? "Checking handle availability on X"
                : isAvailable
                ? `Handle @${handleText} is Available. Click to open on X.`
                : isLikelyInUse
                ? `Handle @${handleText} is Likely in use. Click to verify on X.`
                : `Check if @${handleText} is available on X`
            }
            className={`px-4 py-1.5 rounded-full border transition-colors inline-flex items-center justify-center min-h-[32px] cursor-pointer ${
              isCheckingExistence
                ? "bg-neutral-900 border-neutral-700 text-neutral-400 cursor-wait"
                : isAvailable
                ? "bg-emerald-950/60 border-emerald-600 text-emerald-300 hover:border-emerald-500 hover:bg-emerald-900/70"
                : isLikelyInUse
                ? "bg-rose-950/60 border-rose-700 text-rose-300 hover:border-rose-600 hover:bg-rose-900/70"
                : "bg-neutral-900 border-neutral-750 text-neutral-300 hover:border-neutral-600 hover:text-neutral-100"
            }`}
          >
            <span className="text-xs font-mono select-none font-semibold">
              {isCheckingExistence
                ? "Checking..."
                : isAvailable
                ? "Available"
                : isLikelyInUse
                ? "Likely in use"
                : "Check Availability"}
            </span>
          </Pressable>
        </View>
      </View>

      {/* Action Toolbar - Words only, no icons */}
      <View className="pt-4 border-t border-neutral-900 flex-row flex-wrap items-center justify-between gap-2">
        {/* Primary copy and save actions */}
        <View className="flex-row items-center gap-2 flex-1 sm:flex-initial">
          <Pressable
            id="copy-handle-btn"
            onPress={handleCopyClick}
            accessibilityLabel={`Copy @${handleText} to clipboard`}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl border inline-flex items-center justify-center font-medium min-h-[40px] transition-colors ${
              hasCopied || localFeedback
                ? "bg-neutral-800 border-neutral-600 text-neutral-100"
                : "bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-neutral-700 hover:text-white"
            }`}
          >
            <span className="font-mono text-xs font-semibold select-none">
              {localFeedback || (hasCopied ? "Copied" : "Copy")}
            </span>
          </Pressable>

          {/* Stash / Save Button */}
          <Pressable
            id="bookmark-handle-btn"
            onPress={() => onToggleFavorite(handle)}
            accessibilityLabel={isFavorite ? "Remove from stash" : "Save handle to stash"}
            className={`px-3.5 py-2 rounded-xl border inline-flex items-center justify-center min-h-[40px] transition-colors ${
              isFavorite
                ? "bg-neutral-900 border-amber-600/70 text-amber-400"
                : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
            }`}
          >
            <span className="font-mono text-xs font-semibold select-none">
              {isFavorite ? "Saved" : "Save"}
            </span>
          </Pressable>
        </View>

        {/* X direct links */}
        <View className="flex-row items-center gap-2">
          <Pressable
            id="check-x-direct-btn"
            onPress={handleDirectXLink}
            accessibilityLabel={`View @${handleText} on x.com`}
            className="px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:text-neutral-100 inline-flex items-center justify-center min-h-[40px] transition-colors"
          >
            <span className="text-xs font-mono select-none">
              x.com/{handleText}
            </span>
          </Pressable>

          <Pressable
            id="share-x-intent-btn"
            onPress={handleTweetIntent}
            accessibilityLabel={`Share or claim @${handleText} via X`}
            className="px-3.5 py-2 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:text-neutral-100 inline-flex items-center justify-center min-h-[40px] transition-colors"
          >
            <span className="text-xs font-mono select-none">
              Post to X
            </span>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
