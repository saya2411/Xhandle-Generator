import React, { CSSProperties } from "react";

export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  testID?: string;
  accessibilityRole?: string;
  accessibilityLabel?: string;
}

/**
 * Cross-platform layout container mirroring React Native View.
 */
export const View: React.FC<ViewProps> = ({
  children,
  className = "",
  style,
  testID,
  accessibilityRole,
  accessibilityLabel,
  ...rest
}) => {
  return (
    <div
      data-testid={testID}
      role={accessibilityRole}
      aria-label={accessibilityLabel}
      className={`box-border flex flex-col relative shrink-0 ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};
