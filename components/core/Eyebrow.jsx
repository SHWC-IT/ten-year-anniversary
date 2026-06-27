export function Eyebrow({ children, align = "left", as = "p", style, ...rest }) {
  const css = {
    fontFamily: "var(--font-label)",
    fontWeight: 700,
    fontSize: "var(--fs-eyebrow)",
    letterSpacing: ".3em",
    textTransform: "uppercase",
    color: "var(--accent)",
    margin: 0,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: align === "center" ? "center" : "flex-start",
    gap: "1em",
    ...style,
  };
  const rule = {
    content: '""',
    width: "30px",
    height: "1px",
    background: "currentColor",
    flex: "none",
  };
  const Tag = as;
  return (
    <Tag style={css} {...rest}>
      <span aria-hidden="true" style={rule} />
      {children}
    </Tag>
  );
}
