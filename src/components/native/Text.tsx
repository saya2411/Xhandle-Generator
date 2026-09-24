import React, { CSSProperties } from "react";
import { useAccessibility } from "../../context/AccessibilityContext";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  baseSize?: number; // base font size in px
  accessibilityRole?: "header" | "text" | "alert" | "status";
  accessibilityLiveRegion?: "polite" | "assertive" | "off";
  testID?: string;
}

/**
 * Cross-platform Text primitive mirroring React Native Text with dynamic accessibility scaling.
 */
export const Text: React.FC<TextProps> = ({
  children,
  className = "",
  style,
  baseSize,
  accessibilityRole,
  accessibilityLiveRegion,
  testID,
  ...rest
}) => {
  const { getScaledFontSize } = useAccessibility();

  const scaledStyle: CSSProperties = {
    ...(baseSize ? { fontSize: `${getScaledFontSize(baseSize)}px` } : {}),
    ...style,
  };

  return (
    <span
      data-testid={testID}
      role={accessibilityRole}
      aria-live={accessibilityLiveRegion}
      className={`text-neutral-100 font-mono tracking-tight select-text leading-normal ${className}`}
      style={scaledStyle}
      {...rest}
    >
      {children}
    </span>
  );
};
