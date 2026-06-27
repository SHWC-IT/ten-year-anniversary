export function Badge({ children, variant = "solid", style, ...rest }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    gap: ".5em",
    fontFamily: "var(--font-label)",
    fontWeight: 700,
    fontSize: ".62rem",
    letterSpacing: ".16em",
    textTransform: "uppercase",
    borderRadius: "var(--radius-pill)",
    padding: ".55em 1.1em",
    lineHeight: 1,
    whiteSpace: "nowrap",
    ...style,
  };
  const variants = {
    solid: { background: "var(--grad-gold)", color: "var(--on-accent)" },
    outline: {
      background: "color-mix(in oklab, var(--accent) 8%, transparent)",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--accent) 35%, transparent)",
    },
    muted: {
      background: "var(--bg-2)",
      color: "var(--ink-soft)",
      boxShadow: "inset 0 0 0 1px var(--line-soft)",
    },
  };
  return (
    <span style={{ ...base, ...variants[variant] }} {...rest}>
      {children}
    </span>
  );
}
