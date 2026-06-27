/* @ds-bundle: {"format":3,"namespace":"ShepherdSHouseDesignSystem_571688","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"FramedPanel","sourcePath":"components/core/FramedPanel.jsx"},{"name":"SectionTitle","sourcePath":"components/core/SectionTitle.jsx"},{"name":"ProductCard","sourcePath":"components/patterns/ProductCard.jsx"},{"name":"ScheduleRow","sourcePath":"components/patterns/ScheduleRow.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"8d472a6724dc","components/core/Button.jsx":"03d571d7fe7e","components/core/Eyebrow.jsx":"d754b30e25ef","components/core/Field.jsx":"eafa2895b7a2","components/core/FramedPanel.jsx":"589df693fe63","components/core/SectionTitle.jsx":"8e8c13f09575","components/patterns/ProductCard.jsx":"68a4a2b145b1","components/patterns/ScheduleRow.jsx":"4de79302801a","giving.js":"52842067503b","home.js":"b4943b242f3b","image-slot.js":"9309434cb09c","shwc.js":"6aa1a3399740","store.js":"35e60a15cb88","ui_kits/anniversary-site/Chrome.jsx":"d387b0fc1a23","ui_kits/anniversary-site/Collection.jsx":"a9db188c0fd0","ui_kits/anniversary-site/Giving.jsx":"c6a65369e522","ui_kits/anniversary-site/Hero.jsx":"b585f1fe4ecf","ui_kits/anniversary-site/Program.jsx":"c5b2bdfcd722"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ShepherdSHouseDesignSystem_571688 = window.ShepherdSHouseDesignSystem_571688 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Badge({
  children,
  variant = "solid",
  style,
  ...rest
}) {
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
    ...style
  };
  const variants = {
    solid: {
      background: "var(--grad-gold)",
      color: "var(--on-accent)"
    },
    outline: {
      background: "color-mix(in oklab, var(--accent) 8%, transparent)",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--accent) 35%, transparent)"
    },
    muted: {
      background: "var(--bg-2)",
      color: "var(--ink-soft)",
      boxShadow: "inset 0 0 0 1px var(--line-soft)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...variants[variant]
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
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
    sm: {
      padding: ".9em 1.4em",
      fontSize: ".64rem"
    },
    md: {
      padding: "1.1em 1.9em",
      fontSize: ".72rem"
    },
    lg: {
      padding: "1.3em 3.2em",
      fontSize: ".82rem"
    }
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
    ...pads[size]
  };
  const variants = {
    primary: {
      background: "var(--grad-gold)",
      color: "var(--on-accent)",
      boxShadow: size === "lg" ? "var(--shadow-cta)" : "none"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      boxShadow: "inset 0 0 0 1px var(--line)"
    }
  };
  const css = {
    ...base,
    ...variants[variant],
    ...style
  };
  const hover = (e, on) => {
    if (disabled) return;
    if (variant === "primary") {
      e.currentTarget.style.filter = on ? "brightness(1.12)" : "none";
    } else {
      e.currentTarget.style.boxShadow = on ? "inset 0 0 0 1px var(--accent)" : "inset 0 0 0 1px var(--line)";
      e.currentTarget.style.color = on ? "var(--accent)" : "var(--ink)";
    }
  };
  const Tag = href ? "a" : "button";
  const tagProps = href ? {
    href
  } : {
    type,
    disabled
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, tagProps, {
    onClick: onClick,
    style: css,
    onMouseEnter: e => hover(e, true),
    onMouseLeave: e => hover(e, false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Eyebrow({
  children,
  align = "left",
  as = "p",
  style,
  ...rest
}) {
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
    ...style
  };
  const rule = {
    content: '""',
    width: "30px",
    height: "1px",
    background: "currentColor",
    flex: "none"
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: css
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: rule
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
function Field({
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
    marginBottom: "7px"
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
    boxShadow: error ? "0 0 0 3px color-mix(in oklab, var(--danger) 28%, transparent)" : focus ? "var(--ring)" : "none",
    transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)"
  };
  const shared = {
    value,
    defaultValue,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: controlStyle,
    ...rest
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      marginBottom: "16px",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: labelStyle
  }, label, required ? " *" : "") : null, options ? /*#__PURE__*/React.createElement("select", shared, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value ?? o,
    value: o.value ?? o
  }, o.label ?? o))) : /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder
  }, shared)), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "var(--danger)",
      fontSize: ".78rem",
      marginTop: "5px"
    }
  }, error) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Field.jsx", error: String((e && e.message) || e) }); }

// components/core/FramedPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The brand's framed gold box — surface panel with a gold hairline border and
 * a second inset border 6px in. Used for CTA panels, the giving card, value
 * cards, and the success/upsell box. Set `glow` for the radial gold wash.
 */
function FramedPanel({
  children,
  align = "left",
  glow = false,
  style,
  ...rest
}) {
  const css = {
    position: "relative",
    background: "var(--surface)",
    border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
    borderRadius: "var(--radius)",
    padding: "clamp(28px, 5vw, 56px) clamp(20px, 4vw, 56px)",
    textAlign: align,
    overflow: "hidden",
    ...style
  };
  const innerBorder = {
    content: '""',
    position: "absolute",
    inset: "var(--frame-inset)",
    border: "1px solid color-mix(in oklab, var(--accent) 18%, transparent)",
    pointerEvents: "none",
    zIndex: 1
  };
  const glowStyle = {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "radial-gradient(60% 120% at 50% 0%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)",
    pointerEvents: "none",
    zIndex: 0
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: css
  }, rest), glow ? /*#__PURE__*/React.createElement("span", {
    style: glowStyle
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: innerBorder
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2
    }
  }, children));
}
Object.assign(__ds_scope, { FramedPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FramedPanel.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cinzel caps heading. Wrap the word(s) you want in Great Vibes gold script
 * with <em>…</em> inside `children`, OR pass a plain string and use `script`
 * to append a trailing script flourish.
 */
function SectionTitle({
  children,
  script,
  align = "left",
  as = "h2",
  style,
  ...rest
}) {
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
    ...style
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
    verticalAlign: "baseline"
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: css
  }, rest), children, script ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("span", {
    style: scriptStyle
  }, script)) : null);
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// components/patterns/ProductCard.jsx
try { (() => {
const {
  useState
} = React;
const extIcon = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  width: "0.76em",
  height: "0.76em",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  style: {
    marginLeft: ".4em",
    opacity: .8
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "15 3 21 3 21 9"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  y1: "14",
  x2: "21",
  y2: "3"
}));
function ProductCard({
  name,
  price,
  image,
  href,
  cta = "Buy Now",
  external = true,
  onBuy,
  style
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "var(--surface)",
      border: `1px solid ${hover ? "color-mix(in oklab, var(--accent) 55%, transparent)" : "var(--line-soft)"}`,
      borderRadius: "var(--radius)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transform: hover ? "translateY(-4px)" : "none",
      boxShadow: hover ? "var(--shadow)" : "none",
      transition: "transform var(--dur-fast) var(--ease), border-color var(--dur-fast), box-shadow var(--dur-fast)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "1 / 1",
      background: "var(--bg-2)",
      borderBottom: "1px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: ".98rem",
      lineHeight: 1.35,
      color: "var(--ink)"
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: "1.25rem",
      letterSpacing: ".04em",
      color: "var(--accent)"
    }
  }, price), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    href: href,
    onClick: onBuy
  }, cta, external && href ? extIcon : null))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/patterns/ScheduleRow.jsx
try { (() => {
const {
  useState
} = React;
const pin = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  width: "14",
  height: "14",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  style: {
    flex: "none",
    color: "var(--accent)"
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "11",
  r: "2.4"
}));
const clock = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  width: "15",
  height: "15",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  style: {
    flex: "none",
    color: "var(--accent)"
  }
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 7v5l3 2"
}));

/**
 * One row of the anniversary schedule: date block · title + description + venue · time chip.
 * Whole row is clickable (onClick); the venue link stops propagation.
 */
function ScheduleRow({
  dow,
  day,
  month,
  title,
  description,
  venue,
  venueHref,
  time,
  onClick,
  style
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: "date",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "2px",
      paddingRight: "clamp(14px, 2vw, 24px)",
      borderRight: "1px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".62rem",
      letterSpacing: ".3em",
      textIndent: ".3em",
      textTransform: "uppercase",
      color: "var(--ink-soft)"
    }
  }, dow), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: "clamp(2.1rem, 3.4vw, 2.8rem)",
      lineHeight: 1,
      color: "var(--accent)"
    }
  }, day), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".62rem",
      letterSpacing: ".3em",
      textIndent: ".3em",
      textTransform: "uppercase",
      color: "var(--ink-soft)"
    }
  }, month)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: "main"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      textTransform: "uppercase",
      fontSize: "var(--fs-display-md)",
      letterSpacing: ".05em",
      lineHeight: 1.2,
      margin: 0
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      color: "var(--ink-soft)",
      fontSize: ".96rem",
      maxWidth: "56ch"
    }
  }, description) : null, venue ? /*#__PURE__*/React.createElement("a", {
    href: venueHref,
    onClick: e => e.stopPropagation(),
    target: "_blank",
    rel: "noopener",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      margin: "11px 0 0",
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".67rem",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--ink-soft)",
      textDecoration: "none",
      lineHeight: 1.5
    }
  }, pin, venue) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      gridArea: "time",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      whiteSpace: "nowrap",
      padding: ".75em 1.2em",
      border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)",
      borderRadius: "var(--radius-pill)",
      background: "color-mix(in oklab, var(--accent) 8%, transparent)",
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".72rem",
      letterSpacing: ".16em",
      textTransform: "uppercase"
    }
  }, clock, /*#__PURE__*/React.createElement("span", null, time)));
}
Object.assign(__ds_scope, { ScheduleRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/ScheduleRow.jsx", error: String((e && e.message) || e) }); }

// giving.js
try { (() => {
/* SHWC Giving, donation flow (front-end mock; Stripe to be wired) */
(function () {
  "use strict";

  var state = {
    mode: "once",
    freq: "monthly",
    amount: 50
  };
  var segOnce = document.getElementById("segOnce");
  var segRecur = document.getElementById("segRecur");
  var freqRow = document.getElementById("freqRow");
  var amounts = document.getElementById("amounts");
  var customAmt = document.getElementById("customAmt");
  var giveBtn = document.getElementById("giveBtn");
  var form = document.getElementById("giveForm");
  var fields = document.getElementById("giveFields");
  var success = document.getElementById("giveSuccess");
  var summary = document.getElementById("giveSummary");
  var nameIn = document.getElementById("gname");
  var emailIn = document.getElementById("gemail");
  function money(n) {
    return "$" + Number(n).toLocaleString("en-US");
  }
  function updateBtn() {
    var label = "Give " + money(state.amount);
    if (state.mode === "recur") label += state.freq === "weekly" ? " weekly" : " monthly";
    giveBtn.textContent = label;
    giveBtn.toggleAttribute("disabled", !(state.amount > 0));
  }
  function setMode(mode) {
    state.mode = mode;
    segOnce.setAttribute("aria-pressed", mode === "once" ? "true" : "false");
    segRecur.setAttribute("aria-pressed", mode === "recur" ? "true" : "false");
    freqRow.hidden = mode !== "recur";
    updateBtn();
  }
  segOnce.addEventListener("click", function () {
    setMode("once");
  });
  segRecur.addEventListener("click", function () {
    setMode("recur");
  });
  freqRow.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-freq]");
    if (!b) return;
    state.freq = b.getAttribute("data-freq");
    freqRow.querySelectorAll("button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b ? "true" : "false");
    });
    updateBtn();
  });
  amounts.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-amt]");
    if (!b) return;
    state.amount = parseInt(b.getAttribute("data-amt"), 10);
    customAmt.value = "";
    amounts.querySelectorAll("button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b ? "true" : "false");
    });
    updateBtn();
  });
  customAmt.addEventListener("input", function () {
    var v = parseFloat(customAmt.value);
    amounts.querySelectorAll("button").forEach(function (x) {
      x.setAttribute("aria-pressed", "false");
    });
    state.amount = isNaN(v) || v <= 0 ? 0 : v;
    updateBtn();
  });
  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
  [nameIn, emailIn].forEach(function (el) {
    el.addEventListener("input", function () {
      el.classList.remove("bad");
    });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    if (!nameIn.value.trim()) {
      nameIn.classList.add("bad");
      ok = false;
    }
    if (!validEmail(emailIn.value.trim())) {
      emailIn.classList.add("bad");
      ok = false;
    }
    if (!ok || !(state.amount > 0)) return;
    var fund = document.getElementById("fund").value;
    var first = nameIn.value.trim().split(" ")[0];
    var rec = state.mode === "recur" ? state.freq === "weekly" ? " every week" : " every month" : "";
    summary.textContent = first + ", your gift of " + money(state.amount) + rec + " to " + fund + " has been received.";
    fields.hidden = true;
    success.hidden = false;
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  document.getElementById("giveAgain").addEventListener("click", function (e) {
    e.preventDefault();
    success.hidden = true;
    fields.hidden = false;
  });
  updateBtn();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "giving.js", error: String((e && e.message) || e) }); }

// home.js
try { (() => {
/* SHWC Home, placeholder-link toasts + ministers scroll showcase */
(function () {
  "use strict";

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-toast]");
    if (!a) return;
    e.preventDefault();
    window.SHWC.toast(a.getAttribute("data-toast"));
  });

  /* smooth-scroll for in-page hash links (hero buttons, etc.) */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute("href");
    if (!hash || hash.length < 2) return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.round(top),
      behavior: "smooth"
    });
  });

  /* ---------- hero video: portrait clip on narrow viewports, landscape otherwise ---------- */
  (function () {
    var v = document.querySelector(".hero-video");
    if (!v || !v.dataset.desktop) return;
    var mq = window.matchMedia("(max-width: 680px)");
    var current = "";

    // iOS/Android need muted set as a *property* (not just attribute) for
    // muted-autoplay to be allowed.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;
    function tryPlay() {
      var p = v.play();
      if (p && p.catch) p.catch(function () {/* blocked - will retry on gesture */});
    }
    function pick() {
      var want = mq.matches ? v.dataset.mobile : v.dataset.desktop;
      if (want === current) return;
      current = want;
      v.setAttribute("src", want);
      v.load();
      v.muted = true;
      tryPlay();
    }
    pick();
    if (mq.addEventListener) mq.addEventListener("change", pick);else if (mq.addListener) mq.addListener(pick);

    // Retry as soon as the browser has enough data.
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    // Some devices (e.g. iOS Low Power Mode) block muted autoplay outright and
    // show a play overlay. Kick playback off on the very first user interaction.
    function kick() {
      v.muted = true;
      tryPlay();
      if (!v.paused) {
        ["touchstart", "pointerdown", "click", "scroll", "keydown"].forEach(function (ev) {
          window.removeEventListener(ev, kick);
        });
      }
    }
    ["touchstart", "pointerdown", "click", "scroll", "keydown"].forEach(function (ev) {
      window.addEventListener(ev, kick, {
        passive: true
      });
    });

    // Resume if the tab/app comes back to the foreground.
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        v.muted = true;
        tryPlay();
      }
    });
  })();

  /* ---------- hero video overlay: eases 60% -> 30% as you scroll the hero ---------- */
  (function () {
    var hero = document.querySelector(".hero");
    var media = hero && hero.querySelector(".media");
    if (!media) return;
    var raf = 0;
    function apply() {
      raf = 0;
      var vh = window.innerHeight;
      var range = hero.offsetHeight - vh;
      if (range <= 0) range = 1;
      var p = Math.max(0, Math.min(1, window.scrollY / range));
      // smootherstep for a gentle, gradual ease across the whole hero
      var e = p * p * p * (p * (p * 6 - 15) + 10);
      media.style.setProperty("--hero-ov", (0.6 - 0.3 * e).toFixed(3));
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(apply);
    }
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    apply();
  })();

  /* ---------- Add to Calendar (.ics with all three services) ---------- */
  var addCal = document.getElementById("addCal");
  if (addCal) {
    addCal.addEventListener("click", function (e) {
      e.preventDefault();
      var descTxt = "Shepherd's House Worship Center 10 Year Anniversary - A Decade of Faith. A Lifetime of Impact.";
      var sydnor = "Sydnor Performance Hall, 100 Vernon Street, Lynchburg, VA 24501";
      var campus = "Shepherd's House Lynchburg Campus, 521 Allegheny Avenue, Lynchburg, VA 24501";
      // Oct 2026 is EDT (UTC-4)
      var events = [{
        uid: "shwc10-fri@shwc",
        start: "20261010T010000Z",
        end: "20261010T030000Z",
        title: "SHWC 10th Anniversary - Gathering of Prayer & Thanksgiving",
        loc: campus
      }, {
        uid: "shwc10-sat@shwc",
        start: "20261010T220000Z",
        end: "20261011T000000Z",
        title: "SHWC 10th Anniversary - Night of United Worship",
        loc: sydnor
      }, {
        uid: "shwc10-sun@shwc",
        start: "20261011T140000Z",
        end: "20261011T160000Z",
        title: "SHWC 10th Anniversary - Commissioning Service",
        loc: sydnor
      }];
      var now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
      var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SHWC//10th Anniversary//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
      events.forEach(function (ev) {
        lines.push("BEGIN:VEVENT", "UID:" + ev.uid, "DTSTAMP:" + now, "DTSTART:" + ev.start, "DTEND:" + ev.end, "SUMMARY:" + ev.title, "LOCATION:" + ev.loc.replace(/,/g, "\\,"), "DESCRIPTION:" + descTxt.replace(/,/g, "\\,"), "END:VEVENT");
      });
      lines.push("END:VCALENDAR");
      var blob = new Blob([lines.join("\r\n")], {
        type: "text/calendar;charset=utf-8"
      });
      var url = URL.createObjectURL(blob);
      var dl = document.createElement("a");
      dl.href = url;
      dl.download = "SHWC 10th Anniversary.ics";
      document.body.appendChild(dl);
      dl.click();
      document.body.removeChild(dl);
      setTimeout(function () {
        URL.revokeObjectURL(url);
      }, 4000);
      window.SHWC.toast("Calendar file downloaded - all three services");
    });
  }

  /* ---------- ministers: scroll-scrubbed sticky showcase ----------
     All styles are computed from scroll progress every frame, no CSS transitions, so it cannot stall in any environment. */
  var sec = document.getElementById("ministers");
  if (!sec) return;
  var cards = Array.prototype.slice.call(sec.querySelectorAll(".m-card"));
  var days = Array.prototype.slice.call(sec.querySelectorAll(".m-day"));
  var dots = Array.prototype.slice.call(sec.querySelectorAll(".m-progress i"));
  if (!cards.length) return;
  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }
  function update() {
    var vh = window.innerHeight;
    var rect = sec.getBoundingClientRect();
    var total = sec.offsetHeight - vh;
    if (total <= 0) total = 1;
    var p = clamp(-rect.top / total, 0, 1);
    var pos = p * (cards.length - 1);
    var dayAct = [0, 0, 0];
    cards.forEach(function (c, i) {
      var d = pos - i;
      var a = Math.abs(d);
      var op = clamp(1 - a * 1.5, 0, 1);
      c.style.opacity = op;
      c.style.visibility = op === 0 ? "hidden" : "visible";
      c.style.transform = "translateY(" + (d * -90).toFixed(1) + "px)";
      c.style.zIndex = op > 0.5 ? 2 : 1;
      if (dots[i]) dots[i].className = a < 0.5 ? "on" : "";
    });

    // Day-label activeness: stays full while scrolling between cards of the
    // SAME day; only shrinks/grows when pos crosses into a different day.
    function dayOf(i) {
      i = clamp(i, 0, cards.length - 1);
      return parseInt(cards[i].getAttribute("data-day"), 10) || 0;
    }
    var lo = Math.floor(pos),
      hi = Math.ceil(pos),
      frac = pos - lo;
    var dA = dayOf(lo),
      dB = dayOf(hi);
    if (dA === dB) {
      dayAct[dA] = 1;
    } else {
      dayAct[dA] = 1 - frac;
      dayAct[dB] = frac;
    }
    days.forEach(function (el, i) {
      var act = dayAct[i] || 0;
      el.style.opacity = (0.35 + 0.65 * act).toFixed(3);
      var dEl = el.querySelector(".d");
      if (dEl) dEl.style.transform = "scale(" + (0.62 + 0.38 * act).toFixed(3) + ")";
    });
  }
  // Called directly from the scroll handler: the math is cheap, and some
  // embedded runtimes never fire requestAnimationFrame, which would freeze
  // the showcase if we gated updates behind it.
  /* jump to a specific day inside the scroll showcase */
  function scrollToDay(dayIdx) {
    var idx = -1;
    for (var i = 0; i < cards.length; i++) {
      if (parseInt(cards[i].getAttribute("data-day"), 10) === dayIdx) {
        idx = i;
        break;
      }
    }
    if (idx < 0) return;
    var secTop = sec.getBoundingClientRect().top + window.scrollY;
    var total = sec.offsetHeight - window.innerHeight;
    if (total <= 0) total = 1;
    var target = secTop + idx / (cards.length - 1) * total;
    window.scrollTo({
      top: Math.round(target),
      behavior: "smooth"
    });
  }
  document.addEventListener("click", function (e) {
    var row = e.target.closest("[data-goto-day]");
    if (!row) return;
    scrollToDay(parseInt(row.getAttribute("data-goto-day"), 10));
  });
  window.addEventListener("scroll", update, {
    passive: true
  });
  window.addEventListener("resize", update);
  update();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "home.js", error: String((e && e.message) || e) }); }

// image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "image-slot.js", error: String((e && e.message) || e) }); }

// shwc.js
try { (() => {
/* SHWC shared, nav, reveal, cart store, toast */
(function () {
  "use strict";

  document.body.classList.add("js");

  /* ---------- force dark mode (light mode removed) ---------- */
  document.documentElement.setAttribute("data-base", "dark");

  /* ---------- nav stuck ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.setAttribute("data-stuck", window.scrollY > 10 ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
  }

  /* ---------- scroll reveal (JS-driven; visible without JS) ---------- */
  var revealIO = null;
  var ioEverFired = false;
  function revealAll() {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (e) {
      e.classList.add("in");
    });
  }
  function initReveal() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        ioEverFired = true;
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            revealIO.unobserve(en.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -6% 0px"
      });
    }
    els.forEach(function (e) {
      revealIO.observe(e);
    });
    // Fallback: some embedded runtimes never fire IntersectionObserver callbacks.
    // An observer must fire an initial callback right after observe(); if nothing
    // has arrived shortly, abandon the animation and show everything.
    setTimeout(function () {
      if (!ioEverFired) revealAll();
    }, 700);
    // Watchdog: if reveals are .in but still computed opacity 0 (animation
    // engine stalled), force everything visible.
    setTimeout(function () {
      var probe = document.querySelector(".reveal.in");
      if (probe && getComputedStyle(probe).opacity === "0") {
        var st = document.createElement("style");
        st.textContent = "body.js .reveal{opacity:1 !important; animation:none !important; transform:none !important;}";
        document.head.appendChild(st);
      }
    }, 1600);
  }

  /* ---------- cart store (shared across pages via localStorage) ---------- */
  var CART_KEY = "shwc_cart_v1";
  function readCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateBadges(items);
    document.dispatchEvent(new CustomEvent("cart:change", {
      detail: items
    }));
  }
  function cartCount(items) {
    return (items || readCart()).reduce(function (s, it) {
      return s + it.qty;
    }, 0);
  }
  function addToCart(item) {
    var items = readCart();
    var key = item.id + "|" + (item.size || "") + "|" + (item.color || "");
    var found = null;
    for (var i = 0; i < items.length; i++) {
      var k = items[i].id + "|" + (items[i].size || "") + "|" + (items[i].color || "");
      if (k === key) {
        found = items[i];
        break;
      }
    }
    if (found) found.qty += item.qty || 1;else items.push({
      id: item.id,
      name: item.name,
      price: item.price,
      size: item.size || "",
      color: item.color || "",
      qty: item.qty || 1
    });
    writeCart(items);
  }
  function updateBadges(items) {
    var n = cartCount(items);
    document.querySelectorAll(".cart-btn .count").forEach(function (b) {
      b.textContent = n;
      b.style.display = n > 0 ? "grid" : "none";
    });
  }

  /* ---------- stalled-animation guard ----------
     Some embedded runtimes leave CSS animations forever "pending" at
     currentTime 0, which pins fill-mode:both elements at their `from`
     frame (invisible/off-screen). After the animation should have
     finished, force any still-stuck animation to its end state. */
  function unstick(el) {
    if (!el || !el.getAnimations) return;
    setTimeout(function () {
      el.getAnimations().forEach(function (a) {
        if (a.pending || a.currentTime === 0) {
          try {
            a.finish();
          } catch (e) {
            try {
              a.cancel();
            } catch (e2) {}
          }
        }
      });
    }, 450);
  }

  /* ---------- toast ---------- */
  var toastEl = null,
    toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    setTimeout(function () {
      toastEl.classList.add("show");
      unstick(toastEl);
    }, 20);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2400);
  }
  window.SHWC = {
    readCart: readCart,
    writeCart: writeCart,
    addToCart: addToCart,
    cartCount: cartCount,
    toast: toast,
    unstick: unstick,
    refreshReveal: initReveal,
    money: function (n) {
      return "$" + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, "");
    }
  };

  /* ---------- countdown ---------- */
  var cbClock = document.getElementById("cbClock");
  if (cbClock) {
    var cbTarget = new Date(cbClock.getAttribute("data-target")).getTime();
    var cbUnits = cbClock.querySelectorAll("b");
    var pad2 = function (n) {
      return n < 10 ? "0" + n : "" + n;
    };
    var cbTimer = null;
    var cbTick = function () {
      var diff = cbTarget - Date.now();
      if (diff <= 0) {
        cbClock.innerHTML = "<b>Happening Now</b>";
        if (cbTimer) clearInterval(cbTimer);
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor(diff / 3600000) % 24;
      var m = Math.floor(diff / 60000) % 60;
      var s = Math.floor(diff / 1000) % 60;
      var vals = [d, pad2(h), pad2(m), pad2(s)];
      for (var i = 0; i < cbUnits.length && i < 4; i++) cbUnits[i].textContent = vals[i];
    };
    cbTick();
    cbTimer = setInterval(cbTick, 1000);
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var menu = document.getElementById("mobileMenu");
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menu.classList.toggle("open", open);
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) unstick(menu);
    };
    menuBtn.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }
  initReveal();
  updateBadges();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "shwc.js", error: String((e && e.message) || e) }); }

// store.js
try { (() => {
/* SHWC Store, products, cart drawer, guest checkout (Stripe to be wired) */
(function () {
  "use strict";

  var PRODUCTS = [{
    id: "tee",
    name: "10YR Anniversary Tee",
    price: 25,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: null,
    slot: "p-tee",
    ph: "Tee photo"
  }, {
    id: "hoodie",
    name: "10YR Anniversary Hoodie",
    price: 45,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: null,
    slot: "p-hoodie",
    ph: "Hoodie photo"
  }, {
    id: "hat",
    name: "10YR Anniversary Hat",
    price: 20,
    sizes: null,
    colors: null,
    slot: "p-hat",
    ph: "Hat photo"
  }, {
    id: "tumbler",
    name: "10YR Anniversary Tumbler",
    price: 25,
    sizes: null,
    colors: null,
    slot: "p-tumbler",
    ph: "Tumbler photo"
  }, {
    id: "tote",
    name: "Anniversary Tote Bag",
    price: 15,
    sizes: null,
    colors: ["Black", "Cream"],
    slot: "p-tote",
    ph: "Tote photo"
  }];
  var S = window.SHWC;

  /* ---------- render product grid ---------- */
  function renderGrid() {
    var grid = document.getElementById("storeGrid");
    var html = "";
    PRODUCTS.forEach(function (p, i) {
      html += '<article class="product reveal' + (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "") + '" data-id="' + p.id + '">' + '<div class="ph"><image-slot id="' + p.slot + '" shape="rect" placeholder="' + p.ph + '"></image-slot></div>' + '<div class="info">' + '<span class="nm">' + p.name + '</span>' + '<span class="pr serif">' + S.money(p.price) + '</span>' + '<div class="opts">' + (p.sizes ? '<select data-opt="size" aria-label="Size">' + p.sizes.map(function (s) {
        return "<option>" + s + "</option>";
      }).join("") + "</select>" : "") + (p.colors ? '<select data-opt="color" aria-label="Color">' + p.colors.map(function (c) {
        return "<option>" + c + "</option>";
      }).join("") + "</select>" : "") + "</div>" + '<button type="button" class="btn sm add">Add to Cart</button>' + "</div>" + "</article>";
    });
    grid.innerHTML = html;
  }

  /* ---------- drawer ---------- */
  var scrim = document.getElementById("cartScrim");
  var drawer = document.getElementById("cartDrawer");
  var title = document.getElementById("drawerTitle");
  var cartBody = document.getElementById("cartBody");
  var cartFoot = document.getElementById("cartFoot");
  var checkoutBody = document.getElementById("checkoutBody");
  var successBody = document.getElementById("successBody");
  function setStep(step) {
    cartBody.hidden = step !== "cart";
    cartFoot.hidden = step !== "cart";
    checkoutBody.hidden = step !== "checkout";
    successBody.hidden = step !== "success";
    title.textContent = step === "cart" ? "Your Cart" : step === "checkout" ? "Checkout" : "Thank You";
  }
  function openDrawer(step) {
    setStep(step || "cart");
    scrim.classList.add("open");
    drawer.classList.add("open");
    if (window.SHWC && SHWC.unstick) {
      SHWC.unstick(scrim);
      SHWC.unstick(drawer);
    }
  }
  function closeDrawer() {
    scrim.classList.remove("open");
    drawer.classList.remove("open");
  }
  scrim.addEventListener("click", closeDrawer);
  document.getElementById("closeCart").addEventListener("click", closeDrawer);
  document.getElementById("openCart").addEventListener("click", function () {
    openDrawer("cart");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  /* ---------- cart rendering ---------- */
  function subtotal(items) {
    return items.reduce(function (s, it) {
      return s + it.price * it.qty;
    }, 0);
  }
  function lineKey(it) {
    return it.id + "|" + (it.size || "") + "|" + (it.color || "");
  }
  function renderCart() {
    var items = S.readCart();
    if (!items.length) {
      cartBody.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><p style="font-size:.85rem;">Add something from the collection below.</p></div>';
    } else {
      cartBody.innerHTML = items.map(function (it) {
        var meta = [it.size, it.color].filter(Boolean).join(" · ");
        return '<div class="cart-line" data-key="' + lineKey(it) + '">' + '<div class="thumb">' + it.name.charAt(0) + "</div>" + "<div>" + '<div class="nm">' + it.name + "</div>" + (meta ? '<div class="meta">' + meta + "</div>" : "") + '<div class="qty"><button type="button" data-act="dec" aria-label="Decrease">−</button><span>' + it.qty + '</span><button type="button" data-act="inc" aria-label="Increase">+</button></div>' + "</div>" + "<div>" + '<div class="pr">' + S.money(it.price * it.qty) + "</div>" + '<button type="button" class="rm" data-act="rm">Remove</button>' + "</div>" + "</div>";
      }).join("");
    }
    var sub = subtotal(items);
    document.getElementById("cartSubtotal").textContent = S.money(sub);
    document.getElementById("checkoutTotal").textContent = S.money(sub);
    document.getElementById("toCheckout").toggleAttribute("disabled", !items.length);
  }
  cartBody.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-act]");
    if (!btn) return;
    var key = btn.closest(".cart-line").getAttribute("data-key");
    var items = S.readCart();
    var idx = -1;
    for (var i = 0; i < items.length; i++) if (lineKey(items[i]) === key) {
      idx = i;
      break;
    }
    if (idx < 0) return;
    var act = btn.getAttribute("data-act");
    if (act === "inc") items[idx].qty += 1;
    if (act === "dec") items[idx].qty = Math.max(0, items[idx].qty - 1);
    if (act === "rm") items[idx].qty = 0;
    items = items.filter(function (it) {
      return it.qty > 0;
    });
    S.writeCart(items);
  });
  document.addEventListener("cart:change", renderCart);

  /* ---------- add to cart ---------- */
  document.getElementById("storeGrid").addEventListener("click", function (e) {
    var btn = e.target.closest("button.add");
    if (!btn) return;
    var card = btn.closest(".product");
    var p = null;
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === card.getAttribute("data-id")) {
      p = PRODUCTS[i];
      break;
    }
    var sizeSel = card.querySelector('[data-opt="size"]');
    var colorSel = card.querySelector('[data-opt="color"]');
    S.addToCart({
      id: p.id,
      name: p.name,
      price: p.price,
      size: sizeSel ? sizeSel.value : "",
      color: colorSel ? colorSel.value : "",
      qty: 1
    });
    S.toast("Added to cart, " + p.name);
  });

  /* ---------- checkout ---------- */
  document.getElementById("toCheckout").addEventListener("click", function () {
    setStep("checkout");
  });
  document.getElementById("backToCart").addEventListener("click", function (e) {
    e.preventDefault();
    setStep("cart");
  });
  var fulfil = document.getElementById("cfulfil");
  var shipField = document.getElementById("shipField");
  fulfil.addEventListener("change", function () {
    shipField.hidden = fulfil.value !== "ship";
  });
  var cname = document.getElementById("cname");
  var cemail = document.getElementById("cemail");
  var caddress = document.getElementById("caddress");
  [cname, cemail, caddress].forEach(function (el) {
    el.addEventListener("input", function () {
      el.classList.remove("bad");
    });
  });
  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }
  document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    if (!cname.value.trim()) {
      cname.classList.add("bad");
      ok = false;
    }
    if (!validEmail(cemail.value.trim())) {
      cemail.classList.add("bad");
      ok = false;
    }
    if (fulfil.value === "ship" && !caddress.value.trim()) {
      caddress.classList.add("bad");
      ok = false;
    }
    if (!ok) return;
    var items = S.readCart();
    var n = items.reduce(function (s, it) {
      return s + it.qty;
    }, 0);
    var first = cname.value.trim().split(" ")[0];
    document.getElementById("orderSummary").textContent = "Thank you, " + first + ", " + n + (n === 1 ? " item" : " items") + " · " + S.money(subtotal(items)) + (fulfil.value === "ship" ? ", shipping to you." : ", ready for pickup at church.");
    S.writeCart([]);
    setStep("success");
  });
  document.getElementById("keepShopping").addEventListener("click", closeDrawer);

  /* ---------- init ---------- */
  renderGrid();
  S.refreshReveal();
  renderCart();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "store.js", error: String((e && e.message) || e) }); }

// ui_kits/anniversary-site/Chrome.jsx
try { (() => {
// SHWC Anniversary — site chrome: countdown bar, sticky nav, mobile menu, footer.
const {
  Button
} = window.ShepherdSHouseDesignSystem_571688;
const ExtIcon = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  width: "0.76em",
  height: "0.76em",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  style: {
    marginLeft: ".4em",
    opacity: .8
  }
}, /*#__PURE__*/React.createElement("path", {
  d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "15 3 21 3 21 9"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  y1: "14",
  x2: "21",
  y2: "3"
}));
function CountdownBar() {
  const target = new Date("2026-10-09T21:00:00-04:00").getTime();
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const d = Math.max(0, target - now);
  const days = Math.floor(d / 86400000);
  const hrs = Math.floor(d % 86400000 / 3600000);
  const min = Math.floor(d % 3600000 / 60000);
  const sec = Math.floor(d % 60000 / 1000);
  const unit = (n, l) => /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: "1.05rem",
      letterSpacing: ".02em"
    }
  }, String(n).padStart(2, "0")), /*#__PURE__*/React.createElement("i", {
    style: {
      fontStyle: "normal",
      fontSize: ".58rem",
      letterSpacing: ".2em",
      opacity: .8,
      marginLeft: ".25em"
    }
  }, l));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px 22px",
      flexWrap: "wrap",
      padding: "9px var(--gutter)",
      background: "var(--grad-gold)",
      color: "var(--on-accent)",
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".62rem",
      letterSpacing: ".24em",
      textTransform: "uppercase",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("span", null, "The Celebration Begins In"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: ".9em",
      fontSize: ".8rem",
      letterSpacing: ".1em",
      fontVariantNumeric: "tabular-nums"
    }
  }, unit(days, "Days"), unit(hrs, "Hrs"), unit(min, "Min"), unit(sec, "Sec")), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .85,
      whiteSpace: "nowrap"
    }
  }, "Friday, Oct 9 \xB7 9:00 PM ET"));
}
function Nav({
  onNav,
  onMenu
}) {
  const link = {
    textDecoration: "none",
    fontFamily: "var(--font-label)",
    fontSize: ".68rem",
    fontWeight: 700,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color: "var(--ink-soft)",
    whiteSpace: "nowrap",
    cursor: "pointer"
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "18px",
      padding: "12px var(--gutter)",
      background: "color-mix(in oklab, var(--bg) 88%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("home"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-anniversary.png",
    alt: "SHWC",
    style: {
      width: "48px",
      height: "48px",
      objectFit: "contain",
      filter: "drop-shadow(0 2px 8px rgba(0,0,0,.4))"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      letterSpacing: ".14em",
      fontSize: ".82rem",
      textTransform: "uppercase",
      lineHeight: 1.3,
      color: "var(--ink)"
    }
  }, "Shepherd's House", /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      fontFamily: "var(--font-label)",
      fontWeight: 600,
      fontSize: ".56rem",
      letterSpacing: ".34em",
      color: "var(--ink-soft)"
    }
  }, "Worship Center"))), /*#__PURE__*/React.createElement("nav", {
    className: "nav-desktop",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(12px,2vw,26px)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: link,
    onClick: () => onNav("home")
  }, "About"), /*#__PURE__*/React.createElement("a", {
    style: link,
    onClick: () => onNav("giving")
  }, "Giving"), /*#__PURE__*/React.createElement("a", {
    style: link
  }, "Store", /*#__PURE__*/React.createElement(ExtIcon, null)), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Main Site")), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    onClick: onMenu,
    "aria-label": "Menu",
    style: {
      display: "none",
      appearance: "none",
      background: "transparent",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius)",
      cursor: "pointer",
      width: "44px",
      height: "44px",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "18px",
      height: "2px",
      background: "var(--ink)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "18px",
      height: "2px",
      background: "var(--ink)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "18px",
      height: "2px",
      background: "var(--ink)"
    }
  })));
}
function MobileMenu({
  open,
  onNav,
  onClose
}) {
  if (!open) return null;
  const items = [["01", "Home", "home"], ["02", "The Program", "home"], ["03", "Values & Mission", "home"], ["04", "Giving", "giving"], ["05", "Store", null]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 80,
      background: "var(--bg)",
      padding: "32px var(--gutter)",
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      appearance: "none",
      background: "transparent",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius)",
      width: "44px",
      height: "44px",
      color: "var(--ink)",
      cursor: "pointer",
      fontSize: "1.2rem"
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, items.map(([n, label, dest]) => /*#__PURE__*/React.createElement("a", {
    key: n,
    onClick: () => {
      if (dest) onNav(dest);
      onClose();
    },
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "18px",
      textDecoration: "none",
      cursor: "pointer",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      textTransform: "uppercase",
      fontSize: "clamp(1.7rem,7.5vw,2.4rem)",
      letterSpacing: ".06em",
      color: "var(--ink)",
      padding: "15px 0",
      borderBottom: "1px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: ".62rem",
      letterSpacing: ".24em",
      color: "var(--accent)"
    }
  }, n), label))));
}
function Footer() {
  const col = {};
  const h5 = {
    margin: "0 0 12px",
    fontFamily: "var(--font-label)",
    fontWeight: 700,
    fontSize: ".6rem",
    letterSpacing: ".3em",
    textTransform: "uppercase",
    color: "var(--accent)"
  };
  const a = {
    color: "var(--ink-soft)",
    textDecoration: "none",
    display: "block",
    margin: "0 0 4px",
    fontSize: ".92rem",
    padding: "4px 0"
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--bg-2)",
      borderTop: "1px solid var(--line-soft)",
      padding: "clamp(50px,8vh,84px) 0 30px",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "clamp(28px,6vw,84px)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("h5", {
    style: h5
  }, "Lynchburg"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...a,
      padding: 0
    }
  }, "521 Allegheny Avenue", /*#__PURE__*/React.createElement("br", null), "Lynchburg, VA 24501"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Facebook"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Instagram"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "YouTube")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("h5", {
    style: h5
  }, "Charlottesville"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...a,
      padding: 0
    }
  }, "808 Blenheim Avenue", /*#__PURE__*/React.createElement("br", null), "Charlottesville, VA 22902"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Facebook"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Instagram"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "YouTube")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("h5", {
    style: h5
  }, "Explore"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Values & Mission"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Giving"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Store")), /*#__PURE__*/React.createElement("div", {
    style: col
  }, /*#__PURE__*/React.createElement("h5", {
    style: h5
  }, "Connect"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "info@theshepherdshouse.church"), /*#__PURE__*/React.createElement("a", {
    style: a
  }, "Main Website"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "32px",
      paddingTop: "18px",
      borderTop: "1px solid var(--line-soft)",
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
      flexWrap: "wrap",
      color: "var(--ink-soft)",
      opacity: .75,
      fontFamily: "var(--font-label)",
      fontWeight: 600,
      fontSize: ".64rem",
      letterSpacing: ".14em",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Shepherds House Worship Center, Inc."), /*#__PURE__*/React.createElement("span", null, "A Home of Grace, Destiny, and Fulfillment"))));
}
Object.assign(window, {
  CountdownBar,
  Nav,
  MobileMenu,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/anniversary-site/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/anniversary-site/Collection.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SHWC Anniversary — Merch collection + Giving CTA.
const {
  Eyebrow: ColEyebrow,
  SectionTitle: ColTitle,
  ProductCard,
  FramedPanel,
  Button: ColBtn
} = window.ShepherdSHouseDesignSystem_571688;
const MERCH = [{
  name: "10 Year Anniversary Hat",
  price: "$25.00",
  image: "../../assets/merch-hat.webp"
}, {
  name: "10 Year Anniversary T-Shirt",
  price: "$30.00",
  image: "../../assets/merch-tee.webp"
}, {
  name: "10 Year Anniversary Polo Shirt",
  price: "$50.00",
  image: "../../assets/merch-polo.webp"
}, {
  name: "10 Year Anniversary Tote",
  price: "$30.00",
  image: "../../assets/merch-tote.webp"
}];
function Collection({
  onToast
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--band-y) 0",
      background: "var(--bg)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "24px",
      flexWrap: "wrap",
      marginBottom: "clamp(28px,4vw,44px)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ColEyebrow, null, "Wear It. Share It. Represent."), /*#__PURE__*/React.createElement(ColTitle, {
    script: "collection.",
    style: {
      marginTop: "8px"
    }
  }, "The anniversary")), /*#__PURE__*/React.createElement(ColBtn, {
    onClick: () => onToast("Opening the store…")
  }, "Shop the Collection")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "clamp(14px,2vw,24px)"
    },
    className: "merch-grid"
  }, MERCH.map(m => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: m.name
  }, m, {
    external: false,
    cta: "Add to Cart",
    onBuy: () => onToast(`Added — ${m.name}`)
  }))))));
}
function GivingCTA({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--band-y) 0",
      background: "var(--bg)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement(FramedPanel, {
    align: "center",
    glow: true
  }, /*#__PURE__*/React.createElement(ColEyebrow, {
    align: "center"
  }, "Giving"), /*#__PURE__*/React.createElement(ColTitle, {
    align: "center",
    script: "decade.",
    style: {
      margin: "10px 0 0"
    }
  }, "Sow into the next"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--ink-soft)",
      maxWidth: "52ch",
      margin: "16px auto 28px"
    }
  }, "Every seed built this house. This season we're believing God for the ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ink)"
    }
  }, "Prayer Tabernacle"), ", a consecrated place of divine encounter. Give securely online in under a minute."), /*#__PURE__*/React.createElement(ColBtn, {
    size: "lg",
    onClick: () => onNav("giving")
  }, "Give Now"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px auto 0",
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".6rem",
      letterSpacing: ".26em",
      textTransform: "uppercase",
      color: "var(--ink-soft)"
    }
  }, "Secure giving \xB7 One-time or recurring \xB7 Tax deductible"))));
}
Object.assign(window, {
  Collection,
  GivingCTA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/anniversary-site/Collection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/anniversary-site/Giving.jsx
try { (() => {
// SHWC Anniversary — Giving page (amount picker, designation, donor fields, success).
const {
  useState: useGState
} = React;
const {
  Eyebrow: GEyebrow,
  SectionTitle: GTitle,
  FramedPanel: GPanel,
  Field: GField,
  Button: GButton
} = window.ShepherdSHouseDesignSystem_571688;
const PRESETS = [25, 50, 100, 250, 500, 1000];
function GivingPage({
  onToast
}) {
  const [freq, setFreq] = useGState("once");
  const [amount, setAmount] = useGState(100);
  const [custom, setCustom] = useGState("");
  const [done, setDone] = useGState(false);
  const value = custom ? parseFloat(custom) || 0 : amount;
  const seg = active => ({
    appearance: "none",
    border: "none",
    cursor: "pointer",
    borderRadius: "var(--radius)",
    fontFamily: "var(--font-label)",
    fontWeight: 700,
    fontSize: ".68rem",
    letterSpacing: ".18em",
    textTransform: "uppercase",
    padding: "1em",
    minHeight: "44px",
    transition: "background .2s,color .2s",
    background: active ? "var(--accent)" : "transparent",
    color: active ? "var(--on-accent)" : "var(--ink-soft)"
  });
  const amt = active => ({
    appearance: "none",
    cursor: "pointer",
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "1.3rem",
    padding: ".55em 0",
    borderRadius: "var(--radius)",
    minHeight: "48px",
    border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
    background: active ? "var(--accent)" : "transparent",
    color: active ? "var(--on-accent)" : "var(--ink)"
  });
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "clamp(40px,7vh,90px) 0 var(--band-y)",
      background: "var(--bg)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(0,.85fr) minmax(0,1fr)",
      gap: "clamp(30px,5vw,80px)",
      alignItems: "start"
    },
    className: "give-layout"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GEyebrow, null, "Giving"), /*#__PURE__*/React.createElement(GTitle, {
    script: "decade.",
    style: {
      margin: "12px 0 0"
    }
  }, "Sow into the next"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--ink-soft)",
      maxWidth: "46ch",
      marginTop: "20px"
    }
  }, "This season we're believing God for the Prayer Tabernacle, prayerfully raising over $100,000 to begin the work. Every gift is secure and tax deductible.")), /*#__PURE__*/React.createElement(GPanel, {
    style: {
      padding: "clamp(22px,3.4vw,40px)",
      boxShadow: "var(--shadow)"
    }
  }, done ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "10px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      margin: "0 auto 18px",
      background: "var(--grad-gold)",
      color: "var(--on-accent)",
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "30",
    height: "30",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement(GTitle, {
    align: "center",
    style: {
      fontSize: "1.6rem"
    }
  }, "Thank You"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--ink-soft)",
      margin: "10px 0 20px"
    }
  }, "Your gift of $", value.toLocaleString(), " ", freq === "monthly" ? "/ month " : "", "has been received."), /*#__PURE__*/React.createElement(GButton, {
    variant: "ghost",
    onClick: () => setDone(false)
  }, "Give Again")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius)",
      padding: "4px",
      marginBottom: "22px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: seg(freq === "once"),
    onClick: () => setFreq("once")
  }, "One-Time"), /*#__PURE__*/React.createElement("button", {
    style: seg(freq === "monthly"),
    onClick: () => setFreq("monthly")
  }, "Monthly")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "8px",
      marginBottom: "10px"
    }
  }, PRESETS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    style: amt(!custom && amount === p),
    onClick: () => {
      setAmount(p);
      setCustom("");
    }
  }, "$", p))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: "18px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: "1.15rem",
      color: "var(--ink-soft)"
    }
  }, "$"), /*#__PURE__*/React.createElement("input", {
    value: custom,
    onChange: e => setCustom(e.target.value.replace(/[^0-9.]/g, "")),
    placeholder: "Custom amount",
    inputMode: "decimal",
    style: {
      width: "100%",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: "1.25rem",
      color: "var(--ink)",
      background: "var(--bg-2)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius)",
      padding: ".65em 1em .65em 1.9em",
      minHeight: "48px",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement(GField, {
    label: "Designation",
    options: ["Prayer Tabernacle", "Global Missions"]
  }), /*#__PURE__*/React.createElement(GField, {
    label: "Full name",
    placeholder: "Jane Doe"
  }), /*#__PURE__*/React.createElement(GField, {
    label: "Email",
    type: "email",
    placeholder: "jane@email.com"
  }), /*#__PURE__*/React.createElement(GButton, {
    wide: true,
    size: "lg",
    onClick: () => value > 0 ? setDone(true) : onToast("Choose an amount first")
  }, "Give $", value.toLocaleString(), freq === "monthly" ? " / month" : ""), /*#__PURE__*/React.createElement("p", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "14px",
      color: "var(--ink-soft)",
      fontFamily: "var(--font-label)",
      fontWeight: 600,
      fontSize: ".7rem",
      letterSpacing: ".06em"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "11",
    width: "18",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4"
  })), "Secured by Stripe \xB7 demo only"))))));
}
Object.assign(window, {
  GivingPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/anniversary-site/Giving.jsx", error: String((e && e.message) || e) }); }

// ui_kits/anniversary-site/Hero.jsx
try { (() => {
// SHWC Anniversary — Hero + marquee.
const {
  Button: HeroButton
} = window.ShepherdSHouseDesignSystem_571688;
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      textAlign: "center",
      overflow: "hidden",
      background: "radial-gradient(120% 90% at 50% 0%, var(--navy-700) 0%, var(--navy-900) 60%)",
      borderBottom: "1px solid var(--line-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,.35)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2,
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "clamp(40px,7vh,90px) var(--gutter) clamp(48px,8vh,90px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "clamp(14px,3vh,30px)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-anniversary.png",
    alt: "Shepherd's House 10th Anniversary",
    style: {
      height: "min(40svh, 340px)",
      width: "auto",
      maxWidth: "76vw",
      objectFit: "contain",
      filter: "drop-shadow(0 18px 48px rgba(0,0,0,.55))"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      textTransform: "uppercase",
      fontSize: "clamp(.92rem,2.4vw,1.45rem)",
      letterSpacing: ".26em",
      margin: 0
    }
  }, "A Decade of Faith. A Lifetime of Impact."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".72rem",
      letterSpacing: ".5em",
      textIndent: ".5em",
      color: "var(--accent)",
      margin: 0,
      textTransform: "uppercase"
    }
  }, "2016 - 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "clamp(10px,2vh,20px)"
    }
  }, /*#__PURE__*/React.createElement(HeroButton, {
    onClick: () => onNav("program")
  }, "Register Now"), /*#__PURE__*/React.createElement(HeroButton, {
    variant: "ghost",
    onClick: () => onNav("ministers")
  }, "Meet the Ministers"))));
}
function Marquee() {
  const grp = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "40px",
      paddingRight: "40px",
      whiteSpace: "nowrap",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: "1rem",
      textTransform: "uppercase",
      letterSpacing: ".22em",
      color: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Celebrate"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontStyle: "normal",
      color: "var(--accent)",
      fontSize: ".8rem"
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("span", null, "Remember"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontStyle: "normal",
      color: "var(--accent)",
      fontSize: ".8rem"
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("span", null, "Look Ahead"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontStyle: "normal",
      color: "var(--accent)",
      fontSize: ".8rem"
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("span", null, "A Home of Grace, Destiny & Fulfillment"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontStyle: "normal",
      color: "var(--accent)",
      fontSize: ".8rem"
    }
  }, "\u2726"));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      borderBottom: "1px solid var(--line-soft)",
      padding: "12px 0",
      userSelect: "none",
      background: "var(--bg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mq-track",
    style: {
      display: "flex",
      width: "max-content"
    }
  }, grp, grp));
}
Object.assign(window, {
  Hero,
  Marquee
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/anniversary-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/anniversary-site/Program.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// SHWC Anniversary — Program schedule + Rehoboth banner.
const {
  Eyebrow,
  SectionTitle,
  ScheduleRow,
  Button: ProgBtn
} = window.ShepherdSHouseDesignSystem_571688;
const DAYS = [{
  dow: "Fri",
  day: "09",
  month: "Oct",
  title: "Gathering of Prayer & Thanksgiving",
  description: "A sacred gathering of prayer and thanksgiving, an offering of remembrance and gratitude unto the Lord.",
  venue: "Shepherd's House Church · 521 Allegheny Ave",
  time: "9:00 PM ET"
}, {
  dow: "Sat",
  day: "10",
  month: "Oct",
  title: "Night of United Worship",
  description: "A powerful night of united worship, coming into one accord to exalt the name above all names.",
  venue: "Sydnor Performance Hall · 100 Vernon Street",
  time: "6:00 PM ET"
}, {
  dow: "Sun",
  day: "11",
  month: "Oct",
  title: "Commissioning Service",
  description: "Releasing the Church into its next dimension of purpose and impact.",
  venue: "Sydnor Performance Hall · 100 Vernon Street",
  time: "10:00 AM ET"
}];
function Program({
  onToast
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--band-y) 0",
      background: "var(--bg)",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The Anniversary Program \xB7 October 9 - 11"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      margin: "14px 0 4px",
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".72rem",
      letterSpacing: ".16em",
      textTransform: "uppercase",
      color: "var(--ink-soft)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "17",
    height: "17",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    style: {
      color: "var(--accent)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "11",
    r: "2.4"
  })), "Two Venues \xB7 Lynchburg, Virginia"), /*#__PURE__*/React.createElement(SectionTitle, {
    script: "Harvest Celebration."
  }, "Gathering of Nations"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(26px,4vw,46px)",
      borderTop: "1px solid var(--line)"
    }
  }, DAYS.map(d => /*#__PURE__*/React.createElement(ScheduleRow, _extends({
    key: d.day
  }, d, {
    venueHref: "#",
    onClick: () => onToast(`${d.title} — details coming soon`)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "clamp(26px,3vw,40px)"
    }
  }, /*#__PURE__*/React.createElement(ProgBtn, {
    onClick: () => onToast("Registration link to be wired up")
  }, "Register"), /*#__PURE__*/React.createElement(ProgBtn, {
    variant: "ghost",
    onClick: () => onToast("Calendar invite downloaded")
  }, "Add to Calendar"), /*#__PURE__*/React.createElement(ProgBtn, {
    variant: "ghost"
  }, "Directions \xB7 Fri (Church)"))));
}
function RehobothBanner({
  onToast
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--grad-gold)",
      color: "var(--on-accent)",
      padding: "clamp(34px,5vw,56px) 0",
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--maxw)",
      margin: "0 auto",
      padding: "0 var(--gutter)",
      display: "flex",
      alignItems: "center",
      gap: "clamp(18px,3vw,40px)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      flex: "none",
      display: "grid",
      placeItems: "center",
      border: "1.5px solid var(--on-accent)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12C19 16.4 12 21 12 21Z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 300px"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      textTransform: "uppercase",
      fontSize: "clamp(1.3rem,2.6vw,1.7rem)",
      letterSpacing: ".06em",
      display: "block"
    }
  }, "Rehoboth Prayer Camp"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .85,
      fontSize: ".98rem"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      letterSpacing: ".08em"
    }
  }, "August 28 - 30, 2026"), " \xB7 Theme: ", /*#__PURE__*/React.createElement("em", {
    style: {
      fontStyle: "italic"
    }
  }, "God's Dwelling Place"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onToast("Rehoboth registration opening soon"),
    style: {
      appearance: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-label)",
      fontWeight: 700,
      fontSize: ".8rem",
      letterSpacing: ".22em",
      textTransform: "uppercase",
      padding: "1.2em 2.8em",
      borderRadius: "var(--radius)",
      background: "var(--bg)",
      color: "var(--ink)",
      boxShadow: "0 14px 36px -14px rgba(0,0,0,.55)"
    }
  }, "Register")));
}
Object.assign(window, {
  Program,
  RehobothBanner
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/anniversary-site/Program.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.FramedPanel = __ds_scope.FramedPanel;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ScheduleRow = __ds_scope.ScheduleRow;

})();
