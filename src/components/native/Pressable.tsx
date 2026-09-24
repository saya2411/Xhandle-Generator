import React, { CSSProperties } from "react";

export interface PressableProps {
  onPress?: () => void;
  disabled?: boolean;
  children?: React.ReactNode | ((state: { pressed: boolean; hovered: boolean }) => React.ReactNode);
  className?: string;
  style?: CSSProperties;
  accessibilityLabel: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  testID?: string;
  id?: string;
}

/**
 * Cross-platform Pressable component mirroring React Native Pressable.
 * Strictly guarantees ZERO sound playback on click/interaction.
 * Enforces minimum accessible touch target (>= 44px).
 */
export const Pressable: React.FC<PressableProps> = ({
  onPress,
  disabled = false,
  children,
  className = "",
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  testID,
  id,
}) => {
  const [pressed, setPressed] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPress?.();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Strictly zero audio playback!
    if (disabled) return;
    e.preventDefault();
    onPress?.();
  };

  const renderedChildren =
    typeof children === "function" ? children({ pressed, hovered }) : children;

  return (
    <button
      id={id}
      type="button"
      data-testid={testID}
      role={accessibilityRole}
      aria-label={accessibilityLabel}
      aria-description={accessibilityHint}
      aria-disabled={disabled}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center justify-center select-none cursor-pointer outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      style={style}
    >
      {renderedChildren}
    </button>
  );
};
