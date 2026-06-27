import * as React from "react";

/**
 * Primary call-to-action button in the SHWC gold-on-navy style.
 * Tracked-caps Hanken label, gold gradient fill (primary) or hairline-outline (ghost),
 * sharp 2px corners, 44px min tap height. Renders an <a> when `href` is set.
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Gold gradient fill, or hairline outline. @default "primary" */
  variant?: "primary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render as a link instead of a button. */
  href?: string;
  /** Full-width block button. @default false */
  wide?: boolean;
  /** @default false */
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
