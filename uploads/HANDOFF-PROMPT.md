# Handoff Prompt — SHWC 10 Year Anniversary Site

Copy everything below the line and paste it as your first message to a new Claude design session that has access to the project files and the GitHub repo.

---

You are taking over an existing, in-production website. **Read the real source files before changing anything; do not rebuild from memory or assumptions.** Start by reading `CLAUDE.md`, `README.md`, `index.html`, and `shwc.css`.

## What this is

A standalone marketing/event website for **Shepherd's House Worship Center (SHWC)**, built to promote and support their **10 Year Anniversary celebration (2016 - 2026)**. It is a satellite site that lives alongside the church's main website (`theshepherdshouse.church`); it is NOT the main church site. Its job: get people to register/attend the three anniversary services, give toward the building fund, and buy anniversary merch.

The core event is the **Gathering of Nations Harvest Celebration**, three services over October 9 - 11, 2026:
- **Fri Oct 9, 9:00 PM ET** — Prayer & Thanksgiving — Shepherd's House Church, 521 Allegheny Ave, Lynchburg, VA
- **Sat Oct 10, 6:00 PM ET** — Night of United Worship — Sydnor Performance Hall, 100 Vernon Street, Lynchburg, VA 24501
- **Sun Oct 11, 10:00 AM ET** — Commissioning Service — Sydnor Performance Hall

## Hard rules (from CLAUDE.md — these are non-negotiable)

- **Never use em dashes (—) in site copy.** Use commas, periods, or a simple hyphen for ranges (e.g. "October 9 - 11").
- **Locked design selection:** dark base, **Navy & Gold** palette, **Cinzel** display font, **Great Vibes** script accents. The `<html>` tag carries `data-base="dark" data-accent="navy" data-display="cinzel" data-script="gvibes"` and `shwc.js` force-locks dark mode. Don't change the theme.
- **Giving designations:** only **"Prayer Tabernacle"** and **"Global Missions"**. Don't invent new ones.
- Venue/time facts above are canonical — keep them consistent across every page.

## How it's built

Plain, dependency-free **static HTML + CSS + vanilla JS**. No framework, no build step, no bundler. Just hand-written files that run as-is in a browser. Keep it that way unless explicitly asked otherwise.

**Pages (each a full standalone HTML doc that shares the CSS + `shwc.js`):**
- `index.html` — Home/Anniversary: countdown bar, hero (autoplay video collage), program schedule, ministers showcase, Rehoboth Prayer Camp banner, two merch teasers, giving teaser, footer. Behavior in `home.js`.
- `about.html` — Values & Mission.
- `giving.html` — Giving page. Behavior in `giving.js`. **Checkout is a front-end mockup only; Stripe is not wired up.** Don't represent it as taking real payments.
- `store.html` — thin redirect to the external store. Behavior in `store.js`.

**Shared assets:**
- `shwc.css` — the entire design system: CSS custom properties (`--bg`, `--accent`, `--ink`, etc.) defined under `:root` with theme variants via `[data-base]` / `[data-accent]` / `[data-display]` selectors. Fonts: Cinzel (display), Great Vibes (script), Hanken Grotesk (body/labels), loaded from Google Fonts. Look up real token names in this file before using any `var(--*)`.
- `shwc.js` — shared runtime: locks dark mode, sticky nav, scroll-reveal (with several fallbacks for embedded runtimes that stall animations), a localStorage cart store (`shwc_cart_v1`), toast, countdown clock, mobile menu. Exposes a `window.SHWC` helper object.
- `home.js`, `giving.js`, `store.js` — per-page behavior.
- `uploads/` — images, logos, minister silhouettes, hero videos (desktop + mobile `.mp4`).
- `Product Photos/` — source merch photography.

**Conventions to match:**
- Write canonical HTML (close every element, double-quote attributes, no self-closing non-void tags).
- Use the existing CSS tokens and component classes; don't invent new colors or one-off styles. Reuse `.btn`, `.band`, `.wrap`, `.section-title`, `.eyebrow`, `.reveal`, etc.
- `data-screen-label` attributes mark major sections — keep them on the semantically-equivalent element when restructuring.
- External links use `target="_blank" rel="noopener"` and an inline external-link SVG icon.
- The store is hosted externally; all Store / Buy Now / Shop links point to the Square store (`https://shwc-store.square.site`).

## How it deploys

**Static hosting on Netlify.** `netlify.toml` sets `publish = "."` (the repo root is the published site) and adds two security headers (`X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`). Two paths:
- Connect the GitHub repo to Netlify — every push to the main branch auto-deploys the root folder. (This is the live path; commit to ship.)
- Or drag the folder into https://app.netlify.com/drop for a one-off deploy.

No server, no environment variables, no backend. Because there's no backend, anything requiring server logic (real Stripe payments, registration capture, form submissions) is currently a mockup or an outbound link and must be wired to an external service before going live.

## Known unfinished / wire-up-before-launch

- **Giving checkout** is a UI mockup; Stripe (or another processor) needs real integration.
- **Registration** buttons currently show a toast / placeholder; the real registration link needs wiring.
- Minister cards are "Coming Soon" placeholders with silhouette images until the lineup is confirmed.

## Working style

When asked for a small change, change only that and preserve everything else. Read the relevant file(s) first, reuse existing patterns, and keep all four pages consistent. When in doubt about facts (venues, times, designations, copy tone), defer to `CLAUDE.md` and the values above.
