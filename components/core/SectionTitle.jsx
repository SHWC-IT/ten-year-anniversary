/**
 * Cinzel caps heading. Wrap the word(s) you want in Great Vibes gold script
 * with <em>…</em> inside `children`, OR pass a plain string and use `script`
 * to append a trailing script flourish.
 */
export function SectionTitle({ children, script, align = "left", as = "h2", style, ...rest }) {
  const css = {
    fontFamily: "var(--font-display)",
    fontWeight: "var(--wt-display)",
    textTransform: "uppercase",
    fontSize: "var(--fs-display-lg)",
    lineHeight: "var(--lh-tight)",
    letterSpacing: "var(--track-display)",
    margin: 0,
    textAlign: align,
    textWrap: "pretty",
    ...style,
  };
  const scriptStyle = {
    fontFamily: "var(--font-script)",
    fontStyle: "normal",
    fontWeight: 400,
    textTransform: "none",
    color: "var(--accent)",
    letterSpacing: 0,
    fontSize: "1.18em",
    lineHeight: 1.04,
    display: "inline-block",
    verticalAlign: "baseline",
  };
  const Tag = as;
  return (
    <Tag style={css} {...rest}>
      {children}
      {script ? <> <span style={scriptStyle}>{script}</span></> : null}
    </Tag>
  );
}
