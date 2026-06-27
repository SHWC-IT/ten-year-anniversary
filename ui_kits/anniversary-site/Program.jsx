// SHWC Anniversary — Program schedule + Rehoboth banner.
const { Eyebrow, SectionTitle, ScheduleRow, Button: ProgBtn } = window.ShepherdSHouseDesignSystem_571688;

const DAYS = [
  { dow: "Fri", day: "09", month: "Oct", title: "Gathering of Prayer & Thanksgiving",
    description: "A sacred gathering of prayer and thanksgiving, an offering of remembrance and gratitude unto the Lord.",
    venue: "Shepherd's House Church · 521 Allegheny Ave", time: "9:00 PM ET" },
  { dow: "Sat", day: "10", month: "Oct", title: "Night of United Worship",
    description: "A powerful night of united worship, coming into one accord to exalt the name above all names.",
    venue: "Sydnor Performance Hall · 100 Vernon Street", time: "6:00 PM ET" },
  { dow: "Sun", day: "11", month: "Oct", title: "Commissioning Service",
    description: "Releasing the Church into its next dimension of purpose and impact.",
    venue: "Sydnor Performance Hall · 100 Vernon Street", time: "10:00 AM ET" },
];

function Program({ onToast }) {
  return (
    <section style={{ padding: "var(--band-y) 0", background: "var(--bg)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <Eyebrow>The Anniversary Program · October 9 - 11</Eyebrow>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", margin: "14px 0 4px",
          fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--accent)" }}><path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" /><circle cx="12" cy="11" r="2.4" /></svg>
          Two Venues · Lynchburg, Virginia
        </div>
        <SectionTitle script="Harvest Celebration.">Gathering of Nations</SectionTitle>
        <div style={{ marginTop: "clamp(26px,4vw,46px)", borderTop: "1px solid var(--line)" }}>
          {DAYS.map((d) => <ScheduleRow key={d.day} {...d} venueHref="#" onClick={() => onToast(`${d.title} — details coming soon`)} />)}
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "clamp(26px,3vw,40px)" }}>
          <ProgBtn onClick={() => onToast("Registration link to be wired up")}>Register</ProgBtn>
          <ProgBtn variant="ghost" onClick={() => onToast("Calendar invite downloaded")}>Add to Calendar</ProgBtn>
          <ProgBtn variant="ghost">Directions · Fri (Church)</ProgBtn>
        </div>
      </div>
    </section>
  );
}

function RehobothBanner({ onToast }) {
  return (
    <section style={{ background: "var(--grad-gold)", color: "var(--on-accent)", padding: "clamp(34px,5vw,56px) 0", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "0 var(--gutter)", display: "flex", alignItems: "center", gap: "clamp(18px,3vw,40px)", flexWrap: "wrap" }}>
        <span style={{ width: "56px", height: "56px", borderRadius: "50%", flex: "none", display: "grid", placeItems: "center", border: "1.5px solid var(--on-accent)" }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12C19 16.4 12 21 12 21Z" /></svg>
        </span>
        <div style={{ flex: "1 1 300px" }}>
          <b style={{ fontFamily: "var(--font-display)", fontWeight: 600, textTransform: "uppercase", fontSize: "clamp(1.3rem,2.6vw,1.7rem)", letterSpacing: ".06em", display: "block" }}>Rehoboth Prayer Camp</b>
          <span style={{ opacity: .85, fontSize: ".98rem" }}><b style={{ letterSpacing: ".08em" }}>August 28 - 30, 2026</b> · Theme: <em style={{ fontStyle: "italic" }}>God's Dwelling Place</em></span>
        </div>
        <button onClick={() => onToast("Rehoboth registration opening soon")} style={{ appearance: "none", border: "none", cursor: "pointer",
          fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".8rem", letterSpacing: ".22em", textTransform: "uppercase",
          padding: "1.2em 2.8em", borderRadius: "var(--radius)", background: "var(--bg)", color: "var(--ink)", boxShadow: "0 14px 36px -14px rgba(0,0,0,.55)" }}>Register</button>
      </div>
    </section>
  );
}

Object.assign(window, { Program, RehobothBanner });
