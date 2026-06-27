export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  wide = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const pads = {
    sm: { padding: ".9em 1.4em", fontSize: ".64rem" },
    md: { padding: "1.1em 1.9em", fontSize: ".72rem" },
    lg: { padding: "1.3em 3.2em", fontSize: ".82rem" },
  };
  const base = {
    appearance: "none",
    border: "none",
    cursor: disabled ? "default" : "pointer",
    textDecoration: "none",
    fontFamily: "var(--font-label)",
    fontWeight: 700,
    letterSpacing: ".22em",
    textTransform: "uppercase",
    borderRadius: "var(--radius)",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: ".6em",
    minHeight: "44px",
    width: wide ? "100%" : "auto",
    transition: "filter var(--dur-fast), box-shadow var(--dur-fast), color var(--dur-fast)",
    opacity: disabled ? 0.45 : 1,
    pointerEvents: disabled ? "none" : "auto",
    ...pads[size],
  };
  const variants = {
    primary: {
      background: "var(--grad-gold)",
      color: "var(--on-accent)",
      boxShadow: size === "lg" ? "var(--shadow-cta)" : "none",
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px var(--line)",
    },
  };
  const css = { ...base, ...variants[variant], ...style };

  const hover = (e, on) => {
    if (disabled) return;
    if (variant === "primary") {
      e.currentTarget.style.filter = on ? "brightness(1.12)" : "none";
    } else {
      e.currentTarget.style.boxShadow = on
        ? "inset 0 0 0 1px var(--accent)"
        : "inset 0 0 0 1px var(--line)";
      e.currentTarget.style.color = on ? "var(--accent)" : "var(--ink)";
    }
  };

  const Tag = href ? "a" : "button";
  const tagProps = href
    ? { href }
    : { type, disabled };

  return (
    <Tag
      {...tagProps}
      onClick={onClick}
      style={css}
      onMouseEnter={(e) => hover(e, true)}
      onMouseLeave={(e) => hover(e, false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
