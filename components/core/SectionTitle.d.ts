import * as React from "react";

/**
 * Cinzel uppercase section heading with an optional Great Vibes gold script
 * flourish. The script word is the accent — keep it to one or two words.
 */
export interface SectionTitleProps {
  /** Heading text. Plain string, or include your own <em> for inline script. */
  children: React.ReactNode;
  /** Trailing script-flourish word(s) rendered in gold Great Vibes. */
  script?: string;
  /** @default "left" */
  align?: "left" | "center";
  /** @default "h2" */
  as?: "h1" | "h2" | "h3";
  style?: React.CSSProperties;
}

export function SectionTitle(props: SectionTitleProps): JSX.Element;
