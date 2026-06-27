# UI Kit — Anniversary Site

Interactive recreation of the Shepherd's House Worship Center **10 Year Anniversary** microsite (the live site at the project root: `index.html`, `giving.html`, etc.). Built entirely from this design system's tokens (`styles.css`) and components (`window.ShepherdSHouseDesignSystem_571688`).

## Run it
Open `index.html`. It depends on the compiled `_ds_bundle.js` at the project root, so make sure the design system has compiled (run `check_design_system`). Components render `undefined` only if the bundle is stale.

## What's interactive
- **Live countdown** to Fri Oct 9, 2026 · 9:00 PM ET.
- **Routing** between Home and Giving (top nav + mobile menu + CTAs).
- **Mobile menu** (hamburger appears < 860px).
- **Schedule rows** and CTAs fire toasts.
- **Merch** "Add to Cart" fires a toast.
- **Giving form** — frequency toggle, amount presets + custom, designation (Prayer Tabernacle / Global Missions), donor fields, and a success state.

## Screens
| File | Renders |
|------|---------|
| `Chrome.jsx` | `CountdownBar`, `Nav`, `MobileMenu`, `Footer` |
| `Hero.jsx` | `Hero` (logo lockup + actions), `Marquee` |
| `Program.jsx` | `Program` (schedule via `ScheduleRow`), `RehobothBanner` |
| `Collection.jsx` | `Collection` (merch via `ProductCard`), `GivingCTA` (via `FramedPanel`) |
| `Giving.jsx` | `GivingPage` (full giving flow) |

## Fidelity notes
- The live hero uses a full-bleed background **video**; this kit substitutes a navy radial gradient (video assets live in `uploads/`).
- The live "Ministers" scroll-scrubbed showcase is omitted (it's a bespoke scroll interaction, not a reusable pattern). The Meet the Ministers CTA is present.
- Real store/registration URLs are replaced with toasts in this demo.
