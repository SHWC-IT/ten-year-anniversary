// SHWC Anniversary — Giving page (amount picker, designation, donor fields, success).
const { useState: useGState } = React;
const { Eyebrow: GEyebrow, SectionTitle: GTitle, FramedPanel: GPanel, Field: GField, Button: GButton } = window.ShepherdSHouseDesignSystem_571688;

const PRESETS = [25, 50, 100, 250, 500, 1000];

function GivingPage({ onToast }) {
  const [freq, setFreq] = useGState("once");
  const [amount, setAmount] = useGState(100);
  const [custom, setCustom] = useGState("");
  const [done, setDone] = useGState(false);
  const value = custom ? parseFloat(custom) || 0 : amount;

  const seg = (active) => ({
    appearance: "none", border: "none", cursor: "pointer", borderRadius: "var(--radius)",
    fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".68rem", letterSpacing: ".18em", textTransform: "uppercase",
    padding: "1em", minHeight: "44px", transition: "background .2s,color .2s",
    background: active ? "var(--accent)" : "transparent", color: active ? "var(--on-accent)" : "var(--ink-soft)",
  });
  const amt = (active) => ({
    appearance: "none", cursor: "pointer", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.3rem",
    padding: ".55em 0", borderRadius: "var(--radius)", minHeight: "48px",
    border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
    background: active ? "var(--accent)" : "transparent", color: active ? "var(--on-accent)" : "var(--ink)",
  });

  return (
    <section style={{ padding: "clamp(40px,7vh,90px) 0 var(--band-y)", background: "var(--bg)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,.85fr) minmax(0,1fr)", gap: "clamp(30px,5vw,80px)", alignItems: "start" }} className="give-layout">
          <div>
            <GEyebrow>Giving</GEyebrow>
            <GTitle script="decade." style={{ margin: "12px 0 0" }}>Sow into the next</GTitle>
            <p style={{ color: "var(--ink-soft)", maxWidth: "46ch", marginTop: "20px" }}>
              This season we're believing God for the Prayer Tabernacle, prayerfully raising over $100,000 to begin the work. Every gift is secure and tax deductible.
            </p>
          </div>
          <GPanel style={{ padding: "clamp(22px,3.4vw,40px)", boxShadow: "var(--shadow)" }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", margin: "0 auto 18px", background: "var(--grad-gold)", color: "var(--on-accent)", display: "grid", placeItems: "center" }}>
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <GTitle align="center" style={{ fontSize: "1.6rem" }}>Thank You</GTitle>
                <p style={{ color: "var(--ink-soft)", margin: "10px 0 20px" }}>Your gift of ${value.toLocaleString()} {freq === "monthly" ? "/ month " : ""}has been received.</p>
                <GButton variant="ghost" onClick={() => setDone(false)}>Give Again</GButton>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "4px", marginBottom: "22px" }}>
                  <button style={seg(freq === "once")} onClick={() => setFreq("once")}>One-Time</button>
                  <button style={seg(freq === "monthly")} onClick={() => setFreq("monthly")}>Monthly</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", marginBottom: "10px" }}>
                  {PRESETS.map((p) => <button key={p} style={amt(!custom && amount === p)} onClick={() => { setAmount(p); setCustom(""); }}>${p}</button>)}
                </div>
                <div style={{ position: "relative", marginBottom: "18px" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.15rem", color: "var(--ink-soft)" }}>$</span>
                  <input value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="Custom amount" inputMode="decimal"
                    style={{ width: "100%", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.25rem", color: "var(--ink)", background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: ".65em 1em .65em 1.9em", minHeight: "48px", outline: "none" }} />
                </div>
                <GField label="Designation" options={["Prayer Tabernacle", "Global Missions"]} />
                <GField label="Full name" placeholder="Jane Doe" />
                <GField label="Email" type="email" placeholder="jane@email.com" />
                <GButton wide size="lg" onClick={() => value > 0 ? setDone(true) : onToast("Choose an amount first")}>
                  Give ${value.toLocaleString()}{freq === "monthly" ? " / month" : ""}
                </GButton>
                <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "14px", color: "var(--ink-soft)", fontFamily: "var(--font-label)", fontWeight: 600, fontSize: ".7rem", letterSpacing: ".06em" }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  Secured by Stripe · demo only
                </p>
              </>
            )}
          </GPanel>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { GivingPage });
