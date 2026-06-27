// SHWC Anniversary — Merch collection + Giving CTA.
const { Eyebrow: ColEyebrow, SectionTitle: ColTitle, ProductCard, FramedPanel, Button: ColBtn } = window.ShepherdSHouseDesignSystem_571688;

const MERCH = [
  { name: "10 Year Anniversary Hat", price: "$25.00", image: "../../assets/merch-hat.webp" },
  { name: "10 Year Anniversary T-Shirt", price: "$30.00", image: "../../assets/merch-tee.webp" },
  { name: "10 Year Anniversary Polo Shirt", price: "$50.00", image: "../../assets/merch-polo.webp" },
  { name: "10 Year Anniversary Tote", price: "$30.00", image: "../../assets/merch-tote.webp" },
];

function Collection({ onToast }) {
  return (
    <section style={{ padding: "var(--band-y) 0", background: "var(--bg)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap", marginBottom: "clamp(28px,4vw,44px)" }}>
          <div>
            <ColEyebrow>Wear It. Share It. Represent.</ColEyebrow>
            <ColTitle script="collection." style={{ marginTop: "8px" }}>The anniversary</ColTitle>
          </div>
          <ColBtn onClick={() => onToast("Opening the store…")}>Shop the Collection</ColBtn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(14px,2vw,24px)" }} className="merch-grid">
          {MERCH.map((m) => <ProductCard key={m.name} {...m} external={false} cta="Add to Cart" onBuy={() => onToast(`Added — ${m.name}`)} />)}
        </div>
      </div>
    </section>
  );
}

function GivingCTA({ onNav }) {
  return (
    <section style={{ padding: "var(--band-y) 0", background: "var(--bg)", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "0 var(--gutter)" }}>
        <FramedPanel align="center" glow>
          <ColEyebrow align="center">Giving</ColEyebrow>
          <ColTitle align="center" script="decade." style={{ margin: "10px 0 0" }}>Sow into the next</ColTitle>
          <p style={{ color: "var(--ink-soft)", maxWidth: "52ch", margin: "16px auto 28px" }}>
            Every seed built this house. This season we're believing God for the <b style={{ color: "var(--ink)" }}>Prayer Tabernacle</b>, a consecrated place of divine encounter. Give securely online in under a minute.
          </p>
          <ColBtn size="lg" onClick={() => onNav("giving")}>Give Now</ColBtn>
          <p style={{ margin: "18px auto 0", fontFamily: "var(--font-label)", fontWeight: 700, fontSize: ".6rem", letterSpacing: ".26em", textTransform: "uppercase", color: "var(--ink-soft)" }}>
            Secure giving · One-time or recurring · Tax deductible
          </p>
        </FramedPanel>
      </div>
    </section>
  );
}

Object.assign(window, { Collection, GivingCTA });
