import * as React from "react";

/**
 * A single event row in the anniversary schedule — gold date block, title with
 * description and venue link, and a gold time pill. The whole row is clickable.
 */
export interface ScheduleRowProps {
  /** Day of week, e.g. "Fri". */
  dow: string;
  /** Day number, e.g. "09". */
  day: string;
  /** Month abbr, e.g. "Oct". */
  month: string;
  title: string;
  description?: string;
  /** Venue line text (shows a pin icon). */
  venue?: string;
  venueHref?: string;
  /** Time text for the pill, e.g. "9:00 PM ET". */
  time: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function ScheduleRow(props: ScheduleRowProps): JSX.Element;
