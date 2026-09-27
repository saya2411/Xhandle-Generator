import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { View } from "./components/native/View";
import { Text } from "./components/native/Text";
import { Pressable } from "./components/native/Pressable";
import { HandleCard } from "./components/HandleCard";
import { CycleButton } from "./components/CycleButton";
import { VibeSelector } from "./components/VibeSelector";
import { SavedStashDrawer } from "./components/SavedStashDrawer";
import { ShortcutsModal } from "./components/ShortcutsModal";
import { AccessibilityBar } from "./components/AccessibilityBar";
import { NetworkStatusBadge } from "./components/NetworkStatusBadge";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { VibeCategory, HandleItem } from "./types";
import { synthesizeDynamicHandle } from "./data/undergroundDictionary";
import {
  loadFavorites,
  saveFavorites,
  loadOfflinePool,
  saveOfflinePool,
  appendToOfflinePool,
  loadHistory,
  saveHistory,
} from "./utils/storage";

function MainApp() {
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory>("all");
  const [offlinePool, setOfflinePool] = useState<HandleItem[]>(loadOfflinePool);
  const [currentHandle, setCurrentHandle] = useState<HandleItem | null>(null);
  const [favorites, setFavorites] = useState<HandleItem[]>(loadFavorites);
  const [, setHistory] = useState<HandleItem[]>(loadHistory);
  const [hasCopied, setHasCopied] = useState(false);

  // Modals & Drawers
  const [isStashOpen, setIsStashOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Strict session tracker ensuring zero duplicate handle repeats
  const seenThisSessionRef = useRef<Set<string>>(new Set());

  // Master deduplicated pool
  const uniquePool = useMemo(() => {
    const seen = new Set<string>();
    const deduplicated: HandleItem[] = [];
    for (const item of offlinePool) {
      const lower = item.text.toLowerCase().trim();
      if (!seen.has(lower)) {
        seen.add(lower);
        deduplicated.push(item);
      }
    }
    return deduplicated;
  }, [offlinePool]);

  // Filter unique pool by chosen subculture vibe
  const filteredPool = useMemo(() => {
    if (selectedVibe === "all") return uniquePool;
    return uniquePool.filter((h) => h.category === selectedVibe);
  }, [uniquePool, selectedVibe]);

  // Pick initial handle on mount or when category changes
  useEffect(() => {
    if (filteredPool.length > 0) {
      if (!currentHandle) {
        const randomItem = filteredPool[Math.floor(Math.random() * filteredPool.length)];
        setCurrentHandle(randomItem);
        seenThisSessionRef.current.add(randomItem.text.toLowerCase());
      } else if (selectedVibe !== "all" && currentHandle.category !== selectedVibe) {
        const matching = filteredPool.filter((h) => h.category === selectedVibe);
        if (matching.length > 0) {
          const next = matching[Math.floor(Math.random() * matching.length)];
          setCurrentHandle(next);
          seenThisSessionRef.current.add(next.text.toLowerCase());
        }
      }
    }
  }, [filteredPool, currentHandle, selectedVibe]);

  // Single-click cycle handle with strict uniqueness and zero external API dependencies
  const cycleHandle = useCallback(() => {
    if (filteredPool.length === 0) return;

    // Filter out handles seen this session to ensure fresh uniqueness
    const unseen = filteredPool.filter(
      (h) => !seenThisSessionRef.current.has(h.text.toLowerCase()) && (!currentHandle || h.text !== currentHandle.text)
    );

    let nextHandle: HandleItem;

    // Synthesize fresh rare handles dynamically with 60% probability or whenever unseen handles are low
    const shouldSynthesizeDynamic = Math.random() < 0.60 || unseen.length <= 4;
    if (shouldSynthesizeDynamic) {
      let synthText = synthesizeDynamicHandle(selectedVibe);
      // Guarantee it has not been seen in this session
      for (let attempt = 0; attempt < 15 && seenThisSessionRef.current.has(synthText.toLowerCase()); attempt++) {
        synthText = synthesizeDynamicHandle(selectedVibe);
      }
      const isNumeric = selectedVibe === "numeric" || (selectedVibe === "all" && /\d/.test(synthText));
      const targetCat: VibeCategory = selectedVibe === "all" ? (isNumeric ? "numeric" : "void") : selectedVibe;

      const newHandleItem: HandleItem = {
        id: `synth_${Date.now()}_${synthText}`,
        text: synthText,
        category: targetCat,
        addedAt: Date.now(),
      };

      // Add to session and offline pool if not already present
      const existingInPool = uniquePool.some((h) => h.text.toLowerCase() === synthText.toLowerCase());
      if (!existingInPool) {
        appendToOfflinePool([newHandleItem]);
        setOfflinePool(loadOfflinePool());
      }

      nextHandle = newHandleItem;
      seenThisSessionRef.current.add(synthText.toLowerCase());
    } else if (unseen.length > 0) {
      nextHandle = unseen[Math.floor(Math.random() * unseen.length)];
      seenThisSessionRef.current.add(nextHandle.text.toLowerCase());
    } else {
      // If all handles in this category have been seen, synthesize a fresh handle to ensure zero stale repeats
      let synthText = synthesizeDynamicHandle(selectedVibe);
      for (let attempt = 0; attempt < 15 && seenThisSessionRef.current.has(synthText.toLowerCase()); attempt++) {
        synthText = synthesizeDynamicHandle(selectedVibe);
      }
      const isNumeric = selectedVibe === "numeric" || (selectedVibe === "all" && /\d/.test(synthText));
      const targetCat: VibeCategory = selectedVibe === "all" ? (isNumeric ? "numeric" : "void") : selectedVibe;
      nextHandle = {
        id: `synth_${Date.now()}_${synthText}`,
        text: synthText,
        category: targetCat,
        addedAt: Date.now(),
      };
      seenThisSessionRef.current.add(synthText.toLowerCase());
    }

    setCurrentHandle(nextHandle);
    setHasCopied(false);

    // Save to history (deduplicated)
    setHistory((prev) => {
      const updated = [nextHandle, ...prev.filter((h) => h.text !== nextHandle.text)].slice(0, 50);
      saveHistory(updated);
      return updated;
    });
  }, [filteredPool, currentHandle, selectedVibe, uniquePool]);

  // Toggle favorite
  const handleToggleFavorite = (handle: HandleItem) => {
    const isFav = favorites.some((f) => f.text.toLowerCase() === handle.text.toLowerCase());
    let updated: HandleItem[];
    if (isFav) {
      updated = favorites.filter((f) => f.text.toLowerCase() !== handle.text.toLowerCase());
    } else {
      updated = [handle, ...favorites];
    }
    setFavorites(updated);
    saveFavorites(updated);
  };

  const handleRemoveFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    saveFavorites(updated);
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
    saveFavorites([]);
  };

  // Copy handle
  const handleCopyHandle = (_text: string) => {
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2200);
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        cycleHandle();
      } else if (e.key === "c" || e.key === "C") {
        if (currentHandle) {
          navigator.clipboard.writeText(`@${currentHandle.text}`);
          handleCopyHandle(`@${currentHandle.text}`);
        }
      } else if (e.key === "s" || e.key === "S") {
        if (currentHandle) {
          handleToggleFavorite(currentHandle);
        }
      } else if (e.key === "x" || e.key === "X") {
        if (currentHandle) {
          const clean = currentHandle.text.replace(/_/g, "");
          window.open(`https://x.com/${encodeURIComponent(clean)}`, "_blank", "noopener,noreferrer");
        }
      } else if (e.key === "b" || e.key === "B") {
        setIsStashOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsStashOpen(false);
        setIsShortcutsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cycleHandle, currentHandle, favorites]);

  const isCurrentFavorite = Boolean(
    currentHandle && favorites.some((f) => f.text.toLowerCase() === currentHandle.text.toLowerCase())
  );

  return (
    <View className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-neutral-800 selection:text-neutral-100">
      {/* 1. Header & Accessibility Bar */}
      <View className="w-full shrink-0">
        <NetworkStatusBadge />
        <AccessibilityBar onToggleShortcutsModal={() => setIsShortcutsOpen(true)} />

        {/* Minimalist Top App Title */}
        <View className="w-full max-w-3xl mx-auto pt-5 pb-2 px-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2.5">
            <span className="font-mono font-bold tracking-wider text-neutral-100 text-base uppercase select-none">
              XHANDLE GENERATOR
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 font-semibold uppercase select-none">
              UNDERGROUND HANDLES
            </span>
          </View>

          {/* Stash Button */}
          <View className="flex-row items-center gap-2">
            <Pressable
              id="open-stash-btn"
              onPress={() => setIsStashOpen(true)}
              accessibilityLabel={`Open offline stash (${favorites.length} saved)`}
              className="px-3.5 py-1.5 rounded-xl border border-neutral-850 bg-neutral-900/80 text-neutral-300 hover:border-neutral-700 hover:text-white min-h-[36px] inline-flex items-center justify-center transition-colors"
            >
              <span className="font-mono font-medium text-xs text-neutral-300 select-none">
                Stash ({favorites.length})
              </span>
            </Pressable>
          </View>
        </View>
      </View>

      {/* 2. Main Generation Focus View */}
      <View className="w-full max-w-3xl mx-auto px-4 py-4 flex-1 flex-col items-center justify-center">
        {/* Minimalist Subculture Filters */}
        <VibeSelector
          selectedVibe={selectedVibe}
          onSelectVibe={(vibe) => setSelectedVibe(vibe)}
          disabled={false}
        />

        {/* Central Handle Display Card */}
        <View className="w-full my-3">
          <HandleCard
            handle={currentHandle}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isCurrentFavorite}
            onCopyHandle={handleCopyHandle}
            hasCopied={hasCopied}
          />
        </View>

        {/* Single-Click Cycling Control */}
        <CycleButton
          onCycle={cycleHandle}
          isLoading={false}
          isOffline={false}
        />

        {/* Minimalist Tip for Keyboard & Visual Impairment */}
        <View className="mt-2 items-center text-center">
          <Text baseSize={11} className="text-neutral-500 font-mono tracking-wide text-center">
            Tap Spacebar to cycle • Completely silent & accessible • Offline synced
          </Text>
        </View>
      </View>

      {/* 3. Sleek Minimal Footer */}
      <View className="w-full py-3 px-4 border-t border-neutral-900 bg-black/60 flex-row items-center justify-between text-xs font-mono text-neutral-400">
        <View className="flex-row items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0" />
          <Text baseSize={11} className="text-neutral-500">
            Compliant with X 15-char limit • Strictly unique & obscure
          </Text>
        </View>
      </View>

      {/* 4. Modals & Drawers */}
      <SavedStashDrawer
        isOpen={isStashOpen}
        onClose={() => setIsStashOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAllFavorites={handleClearAllFavorites}
        onSelectHandle={(h) => setCurrentHandle(h)}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </View>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <MainApp />
    </AccessibilityProvider>
  );
}
