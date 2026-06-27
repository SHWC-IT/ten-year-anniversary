---
name: shwc-design
description: Use this skill to generate well-branded interfaces and assets for Shepherd's House Worship Center (SHWC), either for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping in the church's Navy & Gold anniversary brand.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Brand:** Shepherd's House Worship Center — a multi-campus church (Lynchburg & Charlottesville, VA). This system came from their 10 Year Anniversary microsite.
- **Locked look:** dark **Navy & Gold**, **Cinzel** caps display, **Great Vibes** gold script accents, sharp 2px corners, double-bordered "framed gold box" panels. Never use em dashes; date ranges use a spaced hyphen ("October 9 - 11").
- **Global CSS:** link `styles.css` (it `@import`s `tokens/`). Reference tokens like `--bg`, `--surface`, `--ink`, `--accent`, `--grad-gold`, `--font-display`, `--font-script`, `--radius`.
- **Components:** load `_ds_bundle.js`, then read from `window.ShepherdSHouseDesignSystem_571688` — `Button`, `Badge`, `Eyebrow`, `SectionTitle`, `Field`, `FramedPanel`, `ProductCard`, `ScheduleRow`. Each has a `.prompt.md` with usage.
- **Full screens:** `ui_kits/anniversary-site/` is a working recreation of the site (countdown, hero, schedule, merch, giving) — copy from it.
- **Assets:** `assets/` has logos, merch photos, and minister silhouettes. Icons are inline stroke SVGs (24px, 2px stroke); use Lucide from CDN if you need more.
- **Content:** reverent + celebratory, "we"/the house voice, ALL-CAPS headings with a 1-2 word gold script flourish, tracked-caps CTAs. Giving designations are only "Prayer Tabernacle" and "Global Missions".
