// SHWC Anniversary — site chrome: countdown bar, sticky nav, mobile menu, footer.
const { Button } = window.ShepherdSHouseDesignSystem_571688;

const ExtIcon = () => (
  <svg viewBox="0 0 24 24" width="0.76em" height="0.76em" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ marginLeft: ".4em", opacity: .8 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function CountdownBar() {
  const target = new Date("2026-10-09T21:00:00-04:00").getTime();
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, target - now);
  const days = Math.floor(d / 86400000);
  const hrs = Math.floor((d % 86400000) / 3600000);
  const min = Math.floor((d % 3600000) / 60000);
  const sec = Math.floor((d % 60000) / 1000);
  const unit = (n, l) => (
    <span><b style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", letterSpacing: ".02em" }}>{String(n).padStart(2, "0")}</b>
    <i style={{ fontStyle: "normal", fontSize: ".58rem", letterSpacing: ".2em", opacity: .8, marginLeft: ".25em" }}>{l}</i></span>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px 22px", flexWrap: "wrap",
      padding: "9px var(--gutter)", background: "var(--grad-gold)", color: "var(--on-accent)",
      fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".62rem", letterSpacing: ".24em", textTransform: "uppercase", textAlign: "center" }}>
      <span>The Celebration Begins In</span>
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: ".9em", fontSize: ".8rem", letterSpacing: ".1em", fontVariantNumeric: "tabular-nums" }}>
        {unit(days, "Days")}{unit(hrs, "Hrs")}{unit(min, "Min")}{unit(sec, "Sec")}
      </span>
      <span style={{ opacity: .85, whiteSpace: "nowrap" }}>Friday, Oct 9 · 9:00 PM ET</span>
    </div>
  );
}

function Nav({ onNav, onMenu }) {
  const link = { textDecoration: "none", fontFamily: "var(--font-label)", fontSize: ".68rem", fontWeight: 700,
    letterSpacing: ".18em", textTransform: "uppercase", color: "var(--ink-soft)", whiteSpace: "nowrap", cursor: "pointer" };
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "18px", padding: "12px var(--gutter)", background: "color-mix(in oklab, var(--bg) 88%, transparent)",
      backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line-soft)" }}>
      <a onClick={() => onNav("home")} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", cursor: "pointer" }}>
        <img src="../../assets/logo-anniversary.png" alt="SHWC" style={{ width: "48px", height: "48px", objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,.4))" }} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: ".14em", fontSize: ".82rem", textTransform: "uppercase", lineHeight: 1.3, color: "var(--ink)" }}>
          Shepherd's House<small style={{ display: "block", fontFamily: "var(--font-label)", fontWeight: 600, fontSize: ".56rem", letterSpacing: ".34em", color: "var(--ink-soft)" }}>Worship Center</small>
        </span>
      </a>
      <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "clamp(12px,2vw,26px)" }}>
        <a style={link} onClick={() => onNav("home")}>About</a>
        <a style={link} onClick={() => onNav("giving")}>Giving</a>
        <a style={link}>Store<ExtIcon /></a>
        <Button variant="ghost" size="sm">Main Site</Button>
      </nav>
      <button className="nav-burger" onClick={onMenu} aria-label="Menu" style={{ display: "none", appearance: "none",
        background: "transparent", border: "1px solid var(--line)", borderRadius: "var(--radius)", cursor: "pointer",
        width: "44px", height: "44px", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px" }}>
        <span style={{ width: "18px", height: "2px", background: "var(--ink)" }} />
        <span style={{ width: "18px", height: "2px", background: "var(--ink)" }} />
        <span style={{ width: "18px", height: "2px", background: "var(--ink)" }} />
      </button>
    </header>
  );
}

function MobileMenu({ open, onNav, onClose }) {
  if (!open) return null;
  const items = [["01", "Home", "home"], ["02", "The Program", "home"], ["03", "Values & Mission", "home"], ["04", "Giving", "giving"], ["05", "Store", null]];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 80, background: "var(--bg)", padding: "32px var(--gutter)",
      display: "flex", flexDirection: "column", gap: "30px", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose} aria-label="Close" style={{ appearance: "none", background: "transparent", border: "1px solid var(--line)", borderRadius: "var(--radius)", width: "44px", height: "44px", color: "var(--ink)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column" }}>
        {items.map(([n, label, dest]) => (
          <a key={n} onClick={() => { if (dest) onNav(dest); onClose(); }}
            style={{ display: "flex", alignItems: "baseline", gap: "18px", textDecoration: "none", cursor: "pointer",
              fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", fontSize: "clamp(1.7rem,7.5vw,2.4rem)",
              letterSpacing: ".06em", color: "var(--ink)", padding: "15px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <i style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontStyle: "normal", fontSize: ".62rem", letterSpacing: ".24em", color: "var(--accent)" }}>{n}</i>{label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function Footer() {
  const col = { };
  const h5 = { margin: "0 0 12px", fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".6rem", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--accent)" };
  const a = { color: "var(--ink-soft)", textDecoration: "none", display: "block", margin: "0 0 4px", fontSize: ".92rem", padding: "4px 0" };
  return (
    <footer style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line-soft)", padding: "clamp(50px,8vh,84px) 0 30px", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ display: "flex", gap: "clamp(28px,6vw,84px)", flexWrap: "wrap" }}>
          <div style={col}><h5 style={h5}>Lynchburg</h5><p style={{ ...a, padding: 0 }}>521 Allegheny Avenue<br />Lynchburg, VA 24501</p><a style={a}>Facebook</a><a style={a}>Instagram</a><a style={a}>YouTube</a></div>
          <div style={col}><h5 style={h5}>Charlottesville</h5><p style={{ ...a, padding: 0 }}>808 Blenheim Avenue<br />Charlottesville, VA 22902</p><a style={a}>Facebook</a><a style={a}>Instagram</a><a style={a}>YouTube</a></div>
          <div style={col}><h5 style={h5}>Explore</h5><a style={a}>Home</a><a style={a}>Values & Mission</a><a style={a}>Giving</a><a style={a}>Store</a></div>
          <div style={col}><h5 style={h5}>Connect</h5><a style={a}>info@theshepherdshouse.church</a><a style={a}>Main Website</a></div>
        </div>
        <div style={{ marginTop: "32px", paddingTop: "18px", borderTop: "1px solid var(--line-soft)", display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", color: "var(--ink-soft)", opacity: .75, fontFamily: "var(--font-label)", fontWeight: 600, fontSize: ".64rem", letterSpacing: ".14em", textTransform: "uppercase" }}>
          <span>© 2026 Shepherds House Worship Center, Inc.</span>
          <span>A Home of Grace, Destiny, and Fulfillment</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { CountdownBar, Nav, MobileMenu, Footer });
