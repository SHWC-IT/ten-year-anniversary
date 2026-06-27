import * as React from "react";

/**
 * Framed gold box — a surface panel with a gold hairline border plus a second
 * inset border, the signature container for CTA panels, the giving card, and
 * value cards. Optionally adds a radial gold glow from the top.
 */
export interface FramedPanelProps {
  children: React.ReactNode;
  /** @default "left" */
  align?: "left" | "center";
  /** Radial gold wash from the top edge. @default false */
  glow?: boolean;
  style?: React.CSSProperties;
}

export function FramedPanel(props: FramedPanelProps): JSX.Element;
