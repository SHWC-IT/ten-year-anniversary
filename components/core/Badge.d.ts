import * as React from "react";

/**
 * Small tracked-caps pill — dates, times, status tags. Pairs an inline SVG
 * icon (e.g. clock, pin) as a leading child for time/venue chips.
 */
export interface BadgeProps {
  children: React.ReactNode;
  /** Gold fill, gold outline, or neutral. @default "solid" */
  variant?: "solid" | "outline" | "muted";
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
