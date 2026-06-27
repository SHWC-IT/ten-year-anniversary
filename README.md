# Shepherd's House Worship Center — Design System

A brand & UI system for **Shepherd's House Worship Center (SHWC)**, a multi-campus church in Lynchburg & Charlottesville, Virginia. The system was extracted from the church's **10 Year Anniversary** microsite and packages its visual foundations, reusable components, and a full interactive UI kit so future anniversary, giving, and event materials stay on-brand.

> **Locked direction** (see `CLAUDE.md`): dark **Navy & Gold** palette · **Cinzel** display caps · **Great Vibes** script accents · sharp 2px corners · framed gold boxes.

## Sources
This system was built from materials the church provided. You may not have access, but they're recorded here:
- **GitHub repo:** `SHWC-IT/ten-year-anniversary` — https://github.com/SHWC-IT/ten-year-anniversary (the live anniversary microsite — explore it to build richer, more accurate designs).
- **Local codebase:** the `ten-year-anniversary/` folder (same site).
- **Live site files in this project:** `index.html`, `about.html`, `giving.html`, `store.html`, `shwc.css`, `shwc.js` — the production microsite, retained at the project root.
- **Uploads:** logos (`uploads/SHWC_17yr_Logo.png`, anniversary mark), hero videos, product photos, minister silhouettes.

The church's main site is https://theshepherdshouse.church and the store is hosted on Square.

---

## Content Fundamentals
How SHWC writes.

- **Voice:** reverent, warm, and celebratory; scripture-rooted without being stiff. It speaks as *the house* — collective ("we're believing God", "every seed built this house") and invitational to the reader ("Join us any week", "Sow into the next decade").
- **Address:** first-person plural ("we", "our house") for the church; second person ("you", imperative CTAs) for invitations. Rarely first-person singular except a pastor's signed letter.
- **Casing:** display headings are **ALL CAPS** (Cinzel). One or two words per heading break into **gold script** (Great Vibes) for warmth — e.g. "Gathering of Nations *Harvest Celebration.*", "Sow into the next *decade.*" Labels/eyebrows are uppercase and letter-spaced.
- **Tone words:** *Celebrate · Remember · Look Ahead · Grace, Destiny & Fulfillment.* The tagline is **"A Home of Grace, Destiny, and Fulfillment."**
- **CTAs:** short, tracked-caps, action-first — "Give Now", "Register", "Shop the Collection", "Add to Calendar".
- **Numerals & dates:** spelled venue + street ("Sydnor Performance Hall · 100 Vernon Street"); date ranges use a spaced hyphen ("October 9 - 11", "2016 - 2026") — **never an em dash** (project rule). Times always carry the zone ("9:00 PM ET").
- **Emoji:** none. The only decorative glyph is a small gold **✦** used as a separator in the marquee.
- **Giving designations:** only **"Prayer Tabernacle"** and **"Global Missions"**.

---

## Visual Foundations

**Color.** Deep navy base (`--navy-900 #0a0f1d`) with raised bands (`--navy-800`) and card surfaces (`--navy-700`). Antique **gold** is the single accent — `--gold-400 #c9a356` for text/lines, a `--grad-gold` gradient (`#ecd29a → #c9a356 → #8a6526`) for fills (buttons, bars, frames). Text is warm cream (`--cream-100 #f0ecdf`), muted to `--cream-500`. On gold, text goes near-black (`--ink-900`). A light "paper" theme exists (`[data-theme="light"]`) but navy is the default and locked direction. Semantic aliases (`--bg`, `--surface`, `--ink`, `--accent`, `--line`) are what components reference.

**Type.** Four families: **Cinzel** (display, 600, ceremonial caps + big numerals), **Great Vibes** (gold script accents, 400, always 1-2 words), **Cormorant Garamond** (500 italic, pull-quotes & lede), **Hanken Grotesk** (UI labels at 700 with .26-.3em tracking, and body at 400/1.65). Headings track +.04em; labels track wide; huge numerals track tight.

**Spacing & shape.** 8px spacing base; fluid `--gutter` (20-80px) and `--band-y` section rhythm. Corners are nearly **sharp** — `--radius: 2px` on buttons/cards/inputs; pills (`999px`) only for time chips, count badges, and toggles; a soft 14px radius is reserved for "place" tiles.

**Backgrounds.** Solid navy bands alternating base/`tint`. The live site overlays a faint **fractal-noise texture** (screen blend, ~.35 opacity) for an engraved-paper feel, and the hero is **full-bleed video** with a dark scrim. No purple gradients, no photographic hero washes beyond the video.

**The framed box.** Signature container: a surface panel with a gold hairline border **plus a second border inset 6px** (`--frame-inset`), optionally with a radial gold glow from the top. Used for CTA panels, the giving card, and value cards. See `FramedPanel`.

**Borders & dividers.** Hairlines are translucent cream over navy — `--line` (.18) for visible borders, `--line-soft` (.09) for faint dividers and list rules. Lists (schedule, values, milestones) are separated by these rules, not boxed.

**Shadows.** Deep, soft, low: `--shadow: 0 30px 70px -30px rgba(0,0,0,.85)`. Large CTAs add a gold-tinted glow (`--shadow-cta`). Cards are mostly **flat with a hairline**, lifting into shadow only on hover.

**Motion.** Restrained. Reveal-on-scroll is a 0.7s fade-up (`--ease: cubic-bezier(.2,.7,.2,1)`), gated on `prefers-reduced-motion`. A 30s linear **marquee** ribbon. Drawer/toast slide in with `--ease-out`. No bounces, no infinite decorative loops on content.

**Hover / press.** Primary buttons brighten (`filter: brightness(1.12)`). Ghost buttons swap their hairline + text to gold. Product cards translate up 4px + gold border + shadow. List rows wash to ~5% gold. Inputs focus to a gold border + 3px gold ring (`--ring`).

**Imagery.** Warm, gold-lit. The anniversary mark is gold-on-transparent. Product photography is on light/neutral backgrounds; merch in the navy "house collection" sits on a lifted light card so it reads against the dark band.

---

## Iconography
- **Style:** inline **SVG**, 24×24 viewBox, **stroke-only**, `stroke-width: 2` (2.2 for the external-link glyph), round caps & joins, colored `currentColor` → gold. No fills.
- **Recurring icons:** map **pin** (venue/location), **clock** (service times), **heart** (Rehoboth banner), **lock** (secure giving), **check** (success), and the **external-link** arrow-box (off-site Store / Main Site links). These are hand-inlined in the markup, not from an icon library.
- **No icon font, no sprite sheet, no emoji.** The only non-SVG glyph is the gold **✦** marquee separator (a Unicode star).
- **Substitution note:** the project ships no icon-library dependency. If you need icons beyond the set above, use **Lucide** (https://lucide.dev) from CDN — it matches the 24px / 2px-stroke / round-join style almost exactly. Flag any additions so they can be folded into the system.
- Logos live in `assets/` (`logo-anniversary.png`, `logo-17yr.png`); keep clear space ≥ ¼ the logo height.

---

## Index / Manifest

**Foundations**
- `styles.css` — global entry (consumers link this one file). `@import`s everything below.
- `tokens/fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `effects.css`
- `guidelines/*.card.html` — specimen cards shown in the Design System tab (Colors, Type, Spacing, Brand).

**Components** (`window.ShepherdSHouseDesignSystem_571688`)
- `components/core/` — **Button**, **Badge**, **Eyebrow**, **SectionTitle**, **Field**, **FramedPanel**
- `components/patterns/` — **ProductCard**, **ScheduleRow**

**UI kit**
- `ui_kits/anniversary-site/` — interactive recreation of the anniversary home + giving flow (`index.html` + screen JSX). See its `README.md`.

**Brand assets** — `assets/` (logos, merch photos, minister silhouettes).

**Live site (reference, retained)** — `index.html`, `about.html`, `giving.html`, `store.html`, `shwc.css`, `shwc.js`.

**Skill** — `SKILL.md` (use this system inside Claude Code / Agent Skills).

---

### Deploying the live anniversary site
The root `index.html` / `about.html` / `giving.html` / `store.html` are the production microsite. Deploy by dragging the folder into Netlify drop, or connect the `SHWC-IT/ten-year-anniversary` repo. Giving checkout is a front-end mockup; wire Stripe before taking real payments. The store is hosted externally on Square.
