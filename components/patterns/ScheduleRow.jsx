import { useState } from "react";

const pin = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: "none", color: "var(--accent)" }}>
    <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" /><circle cx="12" cy="11" r="2.4" />
  </svg>
);
const clock = (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: "none", color: "var(--accent)" }}>
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);

/**
 * One row of the anniversary schedule: date block · title + description + venue · time chip.
 * Whole row is clickable (onClick); the venue link stops propagation.
 */
export function ScheduleRow({ dow, day, month, title, description, venue, venueHref, time, onClick, style }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateAreas: '"date main time"',
        gridTemplateColumns: "92px minmax(0, 1fr) auto",
        gap: "clamp(18px, 3.4vw, 48px)",
        alignItems: "center",
        padding: "clamp(22px, 3vw, 34px) clamp(4px, 1vw, 12px)",
        borderBottom: "1px solid var(--line-soft)",
        cursor: onClick ? "pointer" : "default",
        background: hover ? "color-mix(in oklab, var(--accent) 5%, transparent)" : "transparent",
        transition: "background var(--dur-fast)",
        ...style,
      }}
    >
      <div style={{ gridArea: "date", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", paddingRight: "clamp(14px, 2vw, 24px)", borderRight: "1px solid var(--line-soft)" }}>
        <span style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".62rem", letterSpacing: ".3em", textIndent: ".3em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{dow}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(2.1rem, 3.4vw, 2.8rem)", lineHeight: 1, color: "var(--accent)" }}>{day}</span>
        <span style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".62rem", letterSpacing: ".3em", textIndent: ".3em", textTransform: "uppercase", color: "var(--ink-soft)" }}>{month}</span>
      </div>
      <div style={{ gridArea: "main" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", fontSize: "var(--fs-display-md)", letterSpacing: ".05em", lineHeight: 1.2, margin: 0 }}>{title}</h3>
        {description ? <p style={{ margin: "6px 0 0", color: "var(--ink-soft)", fontSize: ".96rem", maxWidth: "56ch" }}>{description}</p> : null}
        {venue ? (
          <a href={venueHref} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener"
            style={{ display: "inline-flex", alignItems: "center", gap: "7px", margin: "11px 0 0", fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".67rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-soft)", textDecoration: "none", lineHeight: 1.5 }}>
            {pin}{venue}
          </a>
        ) : null}
      </div>
      <div style={{ gridArea: "time", display: "inline-flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", padding: ".75em 1.2em", border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)", borderRadius: "var(--radius-pill)", background: "color-mix(in oklab, var(--accent) 8%, transparent)", fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase" }}>
        {clock}<span>{time}</span>
      </div>
    </div>
  );
}
