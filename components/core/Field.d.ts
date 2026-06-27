import * as React from "react";

interface FieldOption {
  value: string;
  label: string;
}

/**
 * Labelled text input or select with the SHWC form treatment —
 * tracked-caps label, navy-2 fill, gold focus ring, inline error state.
 */
export interface FieldProps {
  /** Tracked-caps label above the control. */
  label?: string;
  /** Input type (ignored when `options` is provided). @default "text" */
  type?: string;
  /** Provide to render a <select> instead of an <input>. */
  options?: Array<string | FieldOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent) => void;
  placeholder?: string;
  /** Error message — turns the control red and shows the text below. */
  error?: string;
  required?: boolean;
  style?: React.CSSProperties;
}

export function Field(props: FieldProps): JSX.Element;
