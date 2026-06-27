import { useState } from "react";
import { Button } from "../core/Button.jsx";

const extIcon = (
  <svg viewBox="0 0 24 24" width="0.76em" height="0.76em" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ marginLeft: ".4em", opacity: .8 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export function ProductCard({ name, price, image, href, cta = "Buy Now", external = true, onBuy, style }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hover ? "color-mix(in oklab, var(--accent) 55%, transparent)" : "var(--line-soft)"}`,
        borderRadius: "var(--radius)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "var(--shadow)" : "none",
        transition: "transform var(--dur-fast) var(--ease), border-color var(--dur-fast), box-shadow var(--dur-fast)",
        ...style,
      }}
    >
      <div style={{ aspectRatio: "1 / 1", background: "var(--bg-2)", borderBottom: "1px solid var(--line-soft)" }}>
        <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        <span style={{ fontWeight: 600, fontSize: ".98rem", lineHeight: 1.35, color: "var(--ink)" }}>{name}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.25rem", letterSpacing: ".04em", color: "var(--accent)" }}>{price}</span>
        <div style={{ marginTop: "auto" }}>
          <Button size="sm" href={href} onClick={onBuy}>
            {cta}{external && href ? extIcon : null}
          </Button>
        </div>
      </div>
    </article>
  );
}
