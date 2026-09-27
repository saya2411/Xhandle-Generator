import React from "react";
import { View } from "./native/View";
import { Text } from "./native/Text";

export const NetworkStatusBadge: React.FC = () => {
  return (
    <View
      accessibilityRole="region"
      accessibilityLabel="System status"
      className="w-full flex-row items-center justify-between py-2 px-3 sm:px-4 bg-neutral-950 border-b border-neutral-900 text-xs"
    >
      <View className="flex-row items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-emerald-500/80" />
        <Text baseSize={11} className="font-mono uppercase tracking-wider text-neutral-300 font-medium">
          Autonomous • Offline Ready
        </Text>
      </View>

      <Text baseSize={11} className="font-mono text-neutral-500">
        Zero API • Instant Generation
      </Text>
    </View>
  );
};
