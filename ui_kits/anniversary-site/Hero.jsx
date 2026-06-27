// SHWC Anniversary — Hero + marquee.
const { Button: HeroButton } = window.ShepherdSHouseDesignSystem_571688;

function Hero({ onNav }) {
  return (
    <section style={{ position: "relative", textAlign: "center", overflow: "hidden",
      background: "radial-gradient(120% 90% at 50% 0%, var(--navy-700) 0%, var(--navy-900) 60%)",
      borderBottom: "1px solid var(--line-soft)" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.35)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "var(--maxw)", margin: "0 auto", padding: "clamp(40px,7vh,90px) var(--gutter) clamp(48px,8vh,90px)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(14px,3vh,30px)" }}>
        <img src="../../assets/logo-anniversary.png" alt="Shepherd's House 10th Anniversary"
          style={{ height: "min(40svh, 340px)", width: "auto", maxWidth: "76vw", objectFit: "contain", filter: "drop-shadow(0 18px 48px rgba(0,0,0,.55))" }} />
        <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", fontSize: "clamp(.92rem,2.4vw,1.45rem)", letterSpacing: ".26em", margin: 0 }}>
          A Decade of Faith. A Lifetime of Impact.
        </p>
        <p style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".72rem", letterSpacing: ".5em", textIndent: ".5em", color: "var(--accent)", margin: 0, textTransform: "uppercase" }}>2016 - 2026</p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "clamp(10px,2vh,20px)" }}>
          <HeroButton onClick={() => onNav("program")}>Register Now</HeroButton>
          <HeroButton variant="ghost" onClick={() => onNav("ministers")}>Meet the Ministers</HeroButton>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const grp = (
    <div style={{ display: "flex", alignItems: "center", gap: "40px", paddingRight: "40px", whiteSpace: "nowrap",
      fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", textTransform: "uppercase", letterSpacing: ".22em", color: "var(--ink)" }}>
      <span>Celebrate</span><i style={{ fontStyle: "normal", color: "var(--accent)", fontSize: ".8rem" }}>✦</i>
      <span>Remember</span><i style={{ fontStyle: "normal", color: "var(--accent)", fontSize: ".8rem" }}>✦</i>
      <span>Look Ahead</span><i style={{ fontStyle: "normal", color: "var(--accent)", fontSize: ".8rem" }}>✦</i>
      <span>A Home of Grace, Destiny & Fulfillment</span><i style={{ fontStyle: "normal", color: "var(--accent)", fontSize: ".8rem" }}>✦</i>
    </div>
  );
  return (
    <div style={{ overflow: "hidden", borderBottom: "1px solid var(--line-soft)", padding: "12px 0", userSelect: "none", background: "var(--bg)" }}>
      <div className="mq-track" style={{ display: "flex", width: "max-content" }}>{grp}{grp}</div>
    </div>
  );
}

Object.assign(window, { Hero, Marquee });
