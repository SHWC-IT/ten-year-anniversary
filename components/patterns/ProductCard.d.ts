import * as React from "react";

/**
 * Merch product card — square image, name, gold serif price, and a Buy Now
 * button that lifts 4px on hover. Used in the anniversary & house collections.
 */
export interface ProductCardProps {
  name: string;
  /** Display price, e.g. "$30.00". */
  price: string;
  /** Image URL (square). */
  image: string;
  /** Destination for the Buy button. */
  href?: string;
  /** Button label. @default "Buy Now" */
  cta?: string;
  /** Append the external-link icon when href is off-site. @default true */
  external?: boolean;
  onBuy?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function ProductCard(props: ProductCardProps): JSX.Element;
