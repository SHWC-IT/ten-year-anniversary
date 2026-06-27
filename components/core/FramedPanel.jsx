/**
 * The brand's framed gold box — surface panel with a gold hairline border and
 * a second inset border 6px in. Used for CTA panels, the giving card, value
 * cards, and the success/upsell box. Set `glow` for the radial gold wash.
 */
export function FramedPanel({ children, align = "left", glow = false, style, ...rest }) {
  const css = {
    position: "relative",
    background: "var(--surface)",
    border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
    borderRadius: "var(--radius)",
    padding: "clamp(28px, 5vw, 56px) clamp(20px, 4vw, 56px)",
    textAlign: align,
    overflow: "hidden",
    ...style,
  };
  const innerBorder = {
    content: '""',
    position: "absolute",
    inset: "var(--frame-inset)",
    border: "1px solid color-mix(in oklab, var(--accent) 18%, transparent)",
    pointerEvents: "none",
    zIndex: 1,
  };
  const glowStyle = {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(60% 120% at 50% 0%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)",
    pointerEvents: "none",
    zIndex: 0,
  };
  return (
    <div style={css} {...rest}>
      {glow ? <span style={glowStyle} /> : null}
      <span style={innerBorder} />
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </div>
  );
}
