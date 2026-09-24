import React from "react";
import { View } from "./native/View";
import { Text } from "./native/Text";
import { Pressable } from "./native/Pressable";
import { SyncState } from "../types";

interface NetworkStatusBadgeProps {
  syncState: SyncState;
  onManualSync: () => void;
  onToggleForceOffline?: () => void;
  isForceOffline?: boolean;
}

export const NetworkStatusBadge: React.FC<NetworkStatusBadgeProps> = ({
  syncState,
  onManualSync,
  onToggleForceOffline,
  isForceOffline = false,
}) => {
  const isActuallyOnline = syncState.isOnline && !isForceOffline;

  return (
    <View
      accessibilityRole="region"
      accessibilityLabel="Network status"
      className="w-full flex-row items-center justify-between py-2 px-3 sm:px-4 bg-neutral-950 border-b border-neutral-900 text-xs"
    >
      <View className="flex-row items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            isActuallyOnline ? "bg-emerald-500/80" : "bg-neutral-600"
          }`}
        />
        <Text
          baseSize={11}
          className={`font-mono uppercase tracking-wider ${
            isActuallyOnline ? "text-neutral-300 font-medium" : "text-neutral-500"
          }`}
        >
          {isActuallyOnline ? "Online" : "Offline"}
        </Text>
      </View>

      <View className="flex-row items-center gap-2">
        {onToggleForceOffline && (
          <Pressable
            id="toggle-offline-mode"
            onPress={onToggleForceOffline}
            accessibilityLabel={isForceOffline ? "Disable simulated offline mode" : "Enable simulated offline mode"}
            className="px-2.5 py-1 rounded border border-neutral-850 bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 hover:border-neutral-750 min-h-[28px] inline-flex items-center justify-center transition-colors"
          >
            <span className="text-[11px] font-mono text-neutral-400 select-none">
              {isForceOffline ? "Go Online" : "Simulate Offline"}
            </span>
          </Pressable>
        )}

        <Pressable
          id="manual-sync-btn"
          onPress={onManualSync}
          disabled={syncState.isSyncing || !isActuallyOnline}
          accessibilityLabel="Sync offline data with server"
          className="px-2.5 py-1 rounded border border-neutral-850 bg-neutral-900/80 text-neutral-400 hover:border-neutral-750 hover:text-neutral-200 min-h-[28px] inline-flex items-center justify-center transition-colors"
        >
          <span className="text-[11px] font-mono text-neutral-400 select-none">
            {syncState.isSyncing ? "Syncing..." : "Sync"}
          </span>
        </Pressable>
      </View>
    </View>
  );
};
