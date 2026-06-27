import * as React from "react";

/**
 * Section kicker — gold tracked-caps label with a short leading rule.
 * The brand's signature "eyebrow" that sits above every section title.
 */
export interface EyebrowProps {
  children: React.ReactNode;
  /** @default "left" */
  align?: "left" | "center";
  /** Element to render. @default "p" */
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;
