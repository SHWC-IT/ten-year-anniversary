import { useState } from "react";

export function Field({
  label,
  type = "text",
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  error,
  required = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-label)",
    fontWeight: 700,
    fontSize: ".6rem",
    letterSpacing: ".26em",
    textTransform: "uppercase",
    color: "var(--ink-soft)",
    marginBottom: "7px",
  };
  const controlStyle = {
    width: "100%",
    fontFamily: "var(--font-body)",
    fontSize: "1rem",
    color: "var(--ink)",
    background: "var(--bg-2)",
    border: `1px solid ${error ? "var(--danger)" : focus ? "var(--accent)" : "var(--line)"}`,
    borderRadius: "var(--radius)",
    padding: ".72em .9em",
    minHeight: "46px",
    outline: "none",
    boxShadow: error
      ? "0 0 0 3px color-mix(in oklab, var(--danger) 28%, transparent)"
      : focus
      ? "var(--ring)"
      : "none",
    transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
  };
  const shared = {
    value,
    defaultValue,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: controlStyle,
    ...rest,
  };
  return (
    <label style={{ display: "block", marginBottom: "16px", ...style }}>
      {label ? <span style={labelStyle}>{label}{required ? " *" : ""}</span> : null}
      {options ? (
        <select {...shared}>
          {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>
              {o.label ?? o}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} {...shared} />
      )}
      {error ? (
        <span style={{ display: "block", color: "var(--danger)", fontSize: ".78rem", marginTop: "5px" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
