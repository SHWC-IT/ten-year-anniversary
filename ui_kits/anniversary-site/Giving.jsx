// SHWC Anniversary — Giving page (recurrence picker; routes to per-frequency Square payment links).
const { useState: useGState } = React;
const { Eyebrow: GEyebrow, SectionTitle: GTitle, FramedPanel: GPanel, Button: GButton } = window.ShepherdSHouseDesignSystem_571688;

// One Square payment link per recurrence. Amount is entered by the donor on Square.
const GIVE_LINKS = {
  once: "https://square.link/u/wQ9hihlU?src=embed",
  weekly: "https://square.link/u/rnyWGhI0?src=embed",
  monthly: "https://square.link/u/2YJkTmhu?src=embed",
};
const FREQS = [
  { key: "once", title: "One time", sub: "A single gift" },
  { key: "weekly", title: "Weekly", sub: "Every week" },
  { key: "monthly", title: "Monthly", sub: "Every month" },
];

function GivingPage({ onToast }) {
  const [freq, setFreq] = useGState("monthly");

  const opt = (active) => ({
    appearance: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "4px",
    textAlign: "center", minWidth: 0, padding: "1.1em .35em", borderRadius: "var(--radius)",
    minHeight: "84px", justifyContent: "center", transition: "border-color .2s,background .2s,color .2s",
    border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
    background: active ? "color-mix(in oklab, var(--accent) 10%, transparent)" : "transparent",
    color: "var(--ink)",
  });

  return (
    <section style={{ padding: "clamp(40px,7vh,90px) 0 var(--band-y)", background: "var(--bg)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,.85fr) minmax(0,1fr)", gap: "clamp(30px,5vw,80px)", alignItems: "start" }} className="give-layout">
          <div>
            <GEyebrow>The Next Decade</GEyebrow>
            <GTitle script="Tabernacle." style={{ margin: "12px 0 0" }}>The Prayer</GTitle>
            <p style={{ color: "var(--ink-soft)", maxWidth: "46ch", marginTop: "20px" }}>
              As we enter our next decade, God has placed a clear mandate on our Lead Pastor's heart: to establish a Prayer Tabernacle, a consecrated place where seekers from all walks of life can encounter the presence of God, tarry in prayer, and behold His glory in Spirit and in Truth.
            </p>
            <p style={{ color: "var(--ink-soft)", maxWidth: "46ch", marginTop: "14px" }}>
              To begin this sacred work, we are prayerfully seeking to raise over $100,000. Every gift is secure and tax deductible.
            </p>
          </div>
          <GPanel style={{ padding: "clamp(22px,3.4vw,40px)", boxShadow: "var(--shadow)" }}>
            <p style={{ color: "var(--ink-soft)", margin: "0 0 22px", fontSize: ".98rem", lineHeight: 1.55 }}>
              How would you like to give? Choose a frequency, then enter your amount and details on our secure Square checkout.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "8px", marginBottom: "22px" }}>
              {FREQS.map((f) => (
                <button key={f.key} style={opt(freq === f.key)} onClick={() => setFreq(f.key)}>
                  <span style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".7rem", letterSpacing: ".16em", textTransform: "uppercase", color: freq === f.key ? "var(--accent)" : "var(--ink)" }}>{f.title}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: ".78rem", color: "var(--ink-soft)" }}>{f.sub}</span>
                </button>
              ))}
            </div>
            <GButton wide size="lg" onClick={() => onToast("Opens the Square checkout for " + freq + " giving")}>
              Continue to secure checkout
            </GButton>
            <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "14px", color: "var(--ink-soft)", fontFamily: "var(--font-label)", fontWeight: 600, fontSize: ".7rem", letterSpacing: ".06em" }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              You'll complete your gift on Square's secure checkout.
            </p>
          </GPanel>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { GivingPage });
