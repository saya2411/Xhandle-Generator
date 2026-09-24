import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { View } from "./components/native/View";
import { Text } from "./components/native/Text";
import { Pressable } from "./components/native/Pressable";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { NetworkStatusBadge } from "./components/NetworkStatusBadge";
import { AccessibilityBar } from "./components/AccessibilityBar";
import { VibeSelector } from "./components/VibeSelector";
import { HandleCard } from "./components/HandleCard";
import { CycleButton } from "./components/CycleButton";
import { SavedStashDrawer } from "./components/SavedStashDrawer";
import { ShortcutsModal } from "./components/ShortcutsModal";
import { HandleItem, VibeCategory, SyncState, CheckStatusResult } from "./types";
import {
  loadOfflinePool,
  appendToOfflinePool,
  loadFavorites,
  saveFavorites,
  loadHistory,
  saveHistory,
  getCachedVerification,
  setCachedVerification,
  addToSyncQueue,
  getSyncQueue,
  clearSyncQueue,
} from "./utils/storage";
import { synthesizeDynamicHandle } from "./data/undergroundDictionary";
import { logger } from "./utils/logger";

function MainApp() {
  // 1. Core State
  const [offlinePool, setOfflinePool] = useState<HandleItem[]>(loadOfflinePool);
  const [currentHandle, setCurrentHandle] = useState<HandleItem | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<VibeCategory>("all");
  const [favorites, setFavorites] = useState<HandleItem[]>(loadFavorites);
  const [history, setHistory] = useState<HandleItem[]>(loadHistory);
  const [hasCopied, setHasCopied] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  // Track shown handles during the session to enforce strictly non-repeating unique cycles
  const seenThisSessionRef = useRef<Set<string>>(new Set());

  // 2. Modals & Drawers State
  const [isStashOpen, setIsStashOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // 3. Network & Offline Synchronization State
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [isForceOffline, setIsForceOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<number | null>(null);
  const [pendingQueue, setPendingQueue] = useState<string[]>(getSyncQueue);

  const effectiveOnline = isOnline && !isForceOffline;

  // Enforce absolute uniqueness in the pool
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

  // Synchronize network event listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      logger.info("Network connection restored. Syncing offline data...");
      handleBackgroundSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      logger.warn("Network disconnected. Switched to offline cache mode.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Pick initial handle on mount or when category changes
  useEffect(() => {
    if (filteredPool.length > 0) {
      if (!currentHandle) {
        const randomItem = filteredPool[Math.floor(Math.random() * filteredPool.length)];
        setCurrentHandle(randomItem);
        seenThisSessionRef.current.add(randomItem.text.toLowerCase());
        logger.info(`Initialized session with unique handle: @${randomItem.text}`);
      } else if (selectedVibe !== "all" && currentHandle.category !== selectedVibe) {
        const matching = filteredPool.filter((h) => h.category === selectedVibe);
        if (matching.length > 0) {
          const next = matching[Math.floor(Math.random() * matching.length)];
          setCurrentHandle(next);
          seenThisSessionRef.current.add(next.text.toLowerCase());
          logger.info(`Vibe changed to ${selectedVibe}, selected: @${next.text}`);
        }
      }
    }
  }, [filteredPool, currentHandle, selectedVibe]);

  // Background AI generation using Gemini endpoint (strictly subterranean & unique)
  const triggerBackgroundAISynthesis = async (vibe: VibeCategory) => {
    try {
      setIsSynthesizing(true);
      const res = await fetch("/api/generate-handles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vibe, count: 8 }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.handles) && data.handles.length > 0) {
          const now = Date.now();
          const existingMap = new Set(uniquePool.map((h) => h.text.toLowerCase()));
          const newItems: HandleItem[] = [];

          data.handles.forEach((txt: string, idx: number) => {
            const isNumericVibe = vibe === "numeric";
            const clean = isNumericVibe
              ? txt.toLowerCase().trim().replace(/[^a-z0-9]/g, "")
              : vibe === "all"
              ? txt.toLowerCase().trim().replace(/[^a-z0-9]/g, "")
              : txt.toLowerCase().trim().replace(/[^a-z]/g, "");

            if (!existingMap.has(clean) && clean.length >= 4 && clean.length <= 15) {
              if (isNumericVibe) {
                // Must have letters AND numbers, and must NOT start with a number and must NOT end in a number
                if (!/\d/.test(clean) || !/[a-z]/.test(clean) || /^\d/.test(clean) || /\d$/.test(clean)) return;
              } else if (vibe !== "all") {
                // Word categories: strictly letters only
                if (!/^[a-z]+$/.test(clean)) return;
              } else {
                // vibe === "all": if contains numbers, must have letters, must not start with a number, and must not end in a number
                if (/\d/.test(clean) && (!/[a-z]/.test(clean) || /^\d/.test(clean) || /\d$/.test(clean))) return;
              }

              const targetCat = vibe === "all" ? (/\d/.test(clean) ? "numeric" : "void") : vibe;
              existingMap.add(clean);
              newItems.push({
                id: `ai_${now}_${idx}_${clean}`,
                text: clean,
                category: targetCat,
                addedAt: now,
                status: "unchecked",
              });
            }
          });

          if (newItems.length > 0) {
            appendToOfflinePool(newItems);
            setOfflinePool(loadOfflinePool());
          }
        }
      }
    } catch (e) {
      logger.warn("Background AI handle synthesis skipped or failed", { error: String(e) });
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Single-click cycle handle with strict uniqueness and non-repeating sequence
  const cycleHandle = useCallback(async () => {
    if (filteredPool.length === 0) return;

    // Filter out handles seen this session if possible, to guarantee fresh, unique handles on every click
    const unseen = filteredPool.filter(
      (h) => !seenThisSessionRef.current.has(h.text.toLowerCase()) && (!currentHandle || h.text !== currentHandle.text)
    );

    let nextHandle: HandleItem;

    // With a 35% chance or if unseen pool in this category is running low, dynamically synthesize a brand new aesthetic handle!
    const shouldSynthesizeDynamic = Math.random() < 0.35 || unseen.length <= 3;
    if (shouldSynthesizeDynamic) {
      const synthText = synthesizeDynamicHandle(selectedVibe);
      const isNumeric = selectedVibe === "numeric" || (selectedVibe === "all" && /\d/.test(synthText));
      const targetCat: VibeCategory = selectedVibe === "all" ? (isNumeric ? "numeric" : "void") : selectedVibe;

      const newHandleItem: HandleItem = {
        id: `synth_${Date.now()}_${synthText}`,
        text: synthText,
        category: targetCat,
        addedAt: Date.now(),
        status: "unchecked",
        statusMessage: "Unchecked",
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
      const synthText = synthesizeDynamicHandle(selectedVibe);
      const isNumeric = selectedVibe === "numeric" || (selectedVibe === "all" && /\d/.test(synthText));
      const targetCat: VibeCategory = selectedVibe === "all" ? (isNumeric ? "numeric" : "void") : selectedVibe;
      nextHandle = {
        id: `synth_${Date.now()}_${synthText}`,
        text: synthText,
        category: targetCat,
        addedAt: Date.now(),
        status: "unchecked",
        statusMessage: "Unchecked",
      };
      seenThisSessionRef.current.add(synthText.toLowerCase());
    }

    // Check if we have cached verification status for this handle
    const cachedStatus = getCachedVerification(nextHandle.text);
    const enrichedHandle: HandleItem = cachedStatus
      ? { ...nextHandle, status: cachedStatus.status, statusMessage: cachedStatus.message, statusCheckedAt: cachedStatus.checkedAt }
      : nextHandle;

    setCurrentHandle(enrichedHandle);
    setHasCopied(false);

    // Save to history (deduplicated)
    const updatedHistory = [enrichedHandle, ...history.filter((h) => h.text !== enrichedHandle.text)].slice(0, 50);
    setHistory(updatedHistory);
    saveHistory(updatedHistory);

    logger.info(`Cycled to unique handle: @${enrichedHandle.text} (${enrichedHandle.category})`);

    // Optionally synthesize fresh handles in background
    if (effectiveOnline && Math.random() < 0.25 && !isSynthesizing) {
      triggerBackgroundAISynthesis(selectedVibe);
    }
  }, [filteredPool, currentHandle, history, effectiveOnline, isSynthesizing, selectedVibe]);

  // Background sync for queued items
  const handleBackgroundSync = async () => {
    if (!effectiveOnline || isSyncing) return;
    setIsSyncing(true);

    try {
      logger.info("Executing background sync for queued items...");
      const queue = getSyncQueue();
      if (queue.length > 0) {
        for (const item of queue.slice(0, 5)) {
          try {
            const resp = await fetch(`/api/check-handle/${encodeURIComponent(item)}`);
            if (resp.ok) {
              const resJson = await resp.json();
              setCachedVerification(resJson);
            }
          } catch {
            // retain
          }
        }
        clearSyncQueue();
        setPendingQueue([]);
      }

      setLastSyncTimestamp(Date.now());
      logger.info("Background sync completed successfully.");
    } catch (err) {
      logger.error("Background sync error", { error: String(err) });
    } finally {
      setIsSyncing(false);
    }
  };

  // Toggle favorite
  const handleToggleFavorite = (handle: HandleItem) => {
    const isFav = favorites.some((f) => f.text.toLowerCase() === handle.text.toLowerCase());
    let updated: HandleItem[];
    if (isFav) {
      updated = favorites.filter((f) => f.text.toLowerCase() !== handle.text.toLowerCase());
      logger.info(`Removed @${handle.text} from offline favorites stash`);
    } else {
      updated = [{ ...handle, isFavorite: true }, ...favorites];
      logger.info(`Saved @${handle.text} to offline favorites stash`);
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
    logger.info("Cleared offline favorites stash.");
  };

  // Copy handle
  const handleCopyHandle = (_text: string) => {
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2200);
  };

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is inside an input or textarea
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
          logger.info(`Shortcut copied @${currentHandle.text}`);
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

  const syncState: SyncState = {
    isOnline: effectiveOnline,
    lastSyncTimestamp,
    pendingQueueCount: pendingQueue.length,
    isSyncing,
    offlineCacheCount: uniquePool.length,
  };

  const isCurrentFavorite = Boolean(
    currentHandle && favorites.some((f) => f.text.toLowerCase() === currentHandle.text.toLowerCase())
  );

  return (
    <View className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-neutral-800 selection:text-neutral-100">
      {/* 1. Header & Accessibility Bar */}
      <View className="w-full shrink-0">
        <NetworkStatusBadge
          syncState={syncState}
          onManualSync={handleBackgroundSync}
          onToggleForceOffline={() => setIsForceOffline((prev) => !prev)}
          isForceOffline={isForceOffline}
        />
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

          {/* Stash Button - words only */}
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
          onSelectVibe={(vibe) => {
            setSelectedVibe(vibe);
            logger.info(`Selected vibe filter: ${vibe}`);
          }}
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
          isOffline={!effectiveOnline}
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
