#!/usr/bin/env python3
"""Build the shareable review page for the anniversary invitation.

Wraps the rendered email in a framed stage so the pastor and team can approve
copy and design from a link. The email is embedded in an isolated frame, so it
renders exactly as a mail client would show it with no interference from the
surrounding page.

Three details make the preview honest rather than flattering:

  * The brand webfonts are inlined as data URIs. The artifact host blocks font
    CDNs, so without this the email would silently fall back to Georgia and the
    gold script would never appear.
  * The logo is inlined as a data URI too, for the same reason: the host blocks
    remote images, so the hosted URL would never load and the page would show
    the images-blocked state while claiming otherwise. This substitution is for
    the review page only. The real template keeps the hosted URL, because Gmail
    and Outlook both refuse to render data URI images in actual mail.
  * An images-blocked toggle reproduces Outlook's default for external senders,
    which is the state a large share of recipients actually see first.

Fonts are read from a scratch directory; see the FONTS paths below. Re-download
them with curl from fonts.gstatic.com if they are missing.

Usage:
    python3 email/tools/build-review-page.py --out /path/to/review.html
"""

import argparse
import base64
import html
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
EMAIL_DIR = HERE.parent
PREVIEW = EMAIL_DIR / "anniversary-invite.preview.html"

SCRATCH = Path("/Users/brianakumah/.claude/jobs/c6d2dd6d/tmp")
FONTS = [
    ("Cinzel", "600", "normal", SCRATCH / "cinzel.woff2"),
    ("Great Vibes", "400", "normal", SCRATCH / "greatvibes.woff2"),
    ("Hanken Grotesk", "400 700", "normal", SCRATCH / "hanken.woff2"),
]

LOGO_SRC = EMAIL_DIR.parent / "uploads" / "shwc-anniversary-logo.png"
LOGO_HOSTED = "https://ten.theshepherdshouse.church/uploads/shwc-anniversary-logo.png"
LOGO_WIDTH = 440  # a 220px slot at 2x

# Facts shown in the header strip. Kept here so the page cannot drift from the
# numbers the build script reports.
SENDS = 212
INBOXES = 209
SHARED = 3
MINUTES = 11


def font_face_css():
    rules = []
    for family, weight, style, path in FONTS:
        if not path.exists():
            sys.exit(f"Font missing: {path}\nRe-download it before building the review page.")
        b64 = base64.b64encode(path.read_bytes()).decode("ascii")
        rules.append(
            f"@font-face{{font-family:'{family}';font-style:{style};"
            f"font-weight:{weight};font-display:swap;"
            f"src:url(data:font/woff2;base64,{b64}) format('woff2');}}"
        )
    return "\n".join(rules)


def logo_data_uri():
    """The logo as a data URI, resized for a 220px slot at 2x."""
    if not LOGO_SRC.exists():
        print(f"warning: logo not found at {LOGO_SRC}, leaving the hosted URL",
              file=sys.stderr)
        return None
    try:
        import io

        from PIL import Image
    except ImportError:
        print("warning: Pillow not installed, leaving the hosted URL", file=sys.stderr)
        return None
    im = Image.open(LOGO_SRC).convert("RGBA")
    height = round(im.height * LOGO_WIDTH / im.width)
    im = im.resize((LOGO_WIDTH, height), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    print(f"  logo inlined     {len(buf.getvalue()):,} bytes at {LOGO_WIDTH}px wide",
          file=sys.stderr)
    return "data:image/png;base64," + b64


def email_document(fonts_css):
    """The rendered email, adapted for a host that blocks every external request."""
    if not PREVIEW.exists():
        sys.exit(f"Preview not found, run render-preview.py first: {PREVIEW}")
    doc = PREVIEW.read_text(encoding="utf-8")

    before = doc
    doc = re.sub(r"@import url\([^)]*\);", fonts_css, doc, count=1)
    if doc == before:
        print("warning: no @import found to replace, fonts may fall back", file=sys.stderr)

    logo = logo_data_uri()
    if logo:
        if LOGO_HOSTED not in doc:
            print(f"warning: hosted logo URL not found in the template, "
                  f"expected {LOGO_HOSTED}", file=sys.stderr)
        doc = doc.replace(LOGO_HOSTED, logo)

    return doc


def build(out):
    fonts_css = font_face_css()
    srcdoc = html.escape(email_document(fonts_css), quote=True)

    page = PAGE_TEMPLATE.replace("__FONTS__", fonts_css)
    page = page.replace("__SRCDOC__", srcdoc)
    page = page.replace("__SENDS__", str(SENDS))
    page = page.replace("__INBOXES__", str(INBOXES))
    page = page.replace("__SHARED__", str(SHARED))
    page = page.replace("__MINUTES__", str(MINUTES))

    out.write_text(page, encoding="utf-8")
    kb = len(page.encode("utf-8")) / 1024
    print(f"review page     {out}")
    print(f"size            {kb:,.0f} KB")


PAGE_TEMPLATE = """<title>Anniversary invitation, email preview</title>
<style>
__FONTS__

/* One deliberate visual world: this page previews a fixed dark-navy
   invitation, so it commits to that ground rather than following the
   viewer's theme. Every colour below is explicit for that reason. */
:root {
  --ground:   #0a0f1d;
  --raised:   #0e1526;
  --card:     #141c31;
  --ink:      #f0ecdf;
  --muted:    #97a0b4;
  --gold:     #c9a356;
  --gold-dim: #8a6526;
  --hair:     #2c3345;
  --hair-faint: #1b2231;

  --display: 'Cinzel', Georgia, 'Times New Roman', serif;
  --script:  'Great Vibes', Georgia, serif;
  --ui:      'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  --serif:   Georgia, 'Times New Roman', serif;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--ground);
  color: var(--ink);
  font-family: var(--ui);
  font-size: 16px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

.shell {
  max-width: 940px;
  margin: 0 auto;
  padding: 56px 24px 80px;
  display: flex;
  flex-direction: column;
  gap: 44px;
}

/* ---- header ---- */
.masthead { display: flex; flex-direction: column; gap: 18px; }

.eyebrow {
  margin: 0;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: var(--gold);
}

h1 {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(30px, 5vw, 46px);
  font-weight: 600;
  letter-spacing: .02em;
  line-height: 1.08;
  text-transform: uppercase;
  text-wrap: balance;
}

h1 em {
  display: block;
  font-family: var(--script);
  font-style: normal;
  font-size: clamp(34px, 5.6vw, 52px);
  letter-spacing: 0;
  text-transform: none;
  color: var(--gold);
  line-height: 1.1;
  margin-top: 2px;
}

.lede {
  margin: 0;
  max-width: 62ch;
  font-family: var(--serif);
  font-size: 17px;
  color: var(--muted);
}

/* ---- facts ---- */
.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1px;
  background: var(--hair);
  border: 1px solid var(--hair);
}

.fact {
  background: var(--raised);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.fact b {
  font-family: var(--display);
  font-size: 30px;
  font-weight: 600;
  line-height: 1;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

.fact span {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--muted);
}

.fact.accent b { color: var(--gold); }

/* ---- stage ---- */
.stage { display: flex; flex-direction: column; gap: 16px; }

.stage-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--hair-faint);
}

h2 {
  margin: 0;
  font-family: var(--display);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--ink);
}

.controls { display: flex; flex-wrap: wrap; gap: 18px; }
.group { display: flex; align-items: center; gap: 8px; }

.group > i {
  font-style: normal;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--muted);
}

.seg { display: flex; border: 1px solid var(--hair); }

.seg button {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-family: var(--ui);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  padding: 8px 13px;
  cursor: pointer;
  transition: color .15s ease, background-color .15s ease;
}

.seg button + button { border-left: 1px solid var(--hair); }
.seg button:hover { color: var(--ink); }

.seg button[aria-pressed="true"] {
  background: var(--gold);
  color: #0d1322;
}

.seg button:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

.viewport {
  background:
    repeating-linear-gradient(45deg, #0c1220 0 10px, #0a0f1d 10px 20px);
  border: 1px solid var(--hair);
  padding: 26px 16px;
  display: flex;
  justify-content: center;
  overflow-x: auto;
}

#frame {
  width: 600px;
  max-width: 100%;
  height: 2600px;
  border: 0;
  display: block;
  background: #0a0f1d;
  box-shadow: 0 30px 70px -30px rgba(0,0,0,.85);
  transition: width .2s ease;
}

.caption {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
  font-family: var(--serif);
  font-style: italic;
}

/* ---- notes ---- */
.notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 26px;
}

.panel {
  background: var(--card);
  border: 1px solid var(--hair);
  padding: 24px 26px 26px;
}

.panel h3 {
  margin: 0 0 14px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .24em;
  text-transform: uppercase;
  color: var(--gold);
}

.panel ul { margin: 0; padding-left: 18px; }

.panel li {
  font-family: var(--serif);
  font-size: 15px;
  color: var(--ink);
  margin-bottom: 9px;
}

.panel li:last-child { margin-bottom: 0; }
.panel li small {
  display: block;
  font-family: var(--ui);
  font-size: 12.5px;
  color: var(--muted);
  margin-top: 2px;
}

.panel p {
  margin: 0 0 12px;
  font-family: var(--serif);
  font-size: 15px;
  color: var(--ink);
}

.panel p:last-child { margin-bottom: 0; }
.panel code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: .88em;
  color: var(--gold);
}

footer {
  border-top: 1px solid var(--hair-faint);
  padding-top: 22px;
  font-size: 12px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--muted);
}

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}

@media (max-width: 620px) {
  .shell { padding: 36px 16px 60px; gap: 34px; }
  .viewport { padding: 14px 8px; }
}
</style>

<div class="shell">

  <header class="masthead">
    <p class="eyebrow">Email campaign, for approval</p>
    <h1>The anniversary invitation<em>ready to send.</em></h1>
    <p class="lede">
      This is exactly what lands in a member's inbox, rendered in the real fonts. Read the copy,
      click the links, and try it with images blocked, which is what Outlook shows first for mail
      from outside the organisation.
    </p>
  </header>

  <section class="facts" aria-label="Send summary">
    <div class="fact"><b>__SENDS__</b><span>Emails</span></div>
    <div class="fact"><b>__INBOXES__</b><span>Inboxes</span></div>
    <div class="fact"><b>__SHARED__</b><span>Shared by two</span></div>
    <div class="fact accent"><b>__MINUTES__</b><span>Minutes to send</span></div>
  </section>

  <section class="stage">
    <div class="stage-bar">
      <h2>The email</h2>
      <div class="controls">
        <div class="group">
          <i>Images</i>
          <div class="seg" role="group" aria-label="Image loading">
            <button type="button" id="imgOn" aria-pressed="true">On</button>
            <button type="button" id="imgOff" aria-pressed="false">Blocked</button>
          </div>
        </div>
        <div class="group">
          <i>Width</i>
          <div class="seg" role="group" aria-label="Preview width">
            <button type="button" id="wDesk" aria-pressed="true">Desktop</button>
            <button type="button" id="wPhone" aria-pressed="false">Phone</button>
          </div>
        </div>
      </div>
    </div>

    <div class="viewport">
      <iframe id="frame" title="Anniversary invitation email preview" srcdoc="__SRCDOC__"></iframe>
    </div>

    <p class="caption">
      Merge fields are filled with a placeholder. Each real recipient sees their own first name.
    </p>
  </section>

  <section class="notes">
    <div class="panel">
      <h3>What to check</h3>
      <ul>
        <li>The wording, top to bottom.
          <small>Cheapest thing to change now, most expensive after 212 people have it.</small></li>
        <li>Service days, times, and venues.
          <small>Friday at the church, Saturday and Sunday at Sydnor Performance Hall.</small></li>
        <li>The Register button goes where you expect.</li>
        <li>Switch images to Blocked.
          <small>The church name should still read clearly with no image at all.</small></li>
      </ul>
    </div>

    <div class="panel">
      <h3>Two decisions left</h3>
      <p><b>Subject line.</b> Currently
        <code>You are invited: Shepherd's House 10th Anniversary, October 9 - 11</code>.
        Say the word and it changes.</p>
      <p><b>Three inboxes get two emails.</b> Those are shared by two family members each, so both
        are invited by name. That was the deliberate choice over one email addressed to a household.</p>
    </div>
  </section>

  <footer>
    Shepherd's House Worship Center &nbsp;&middot;&nbsp; October 9 - 11, 2026 &nbsp;&middot;&nbsp; Lynchburg, Virginia
  </footer>

</div>

<script>
(function () {
  var frame = document.getElementById('frame');

  // srcdoc frames are same-origin, so the height can track the real content
  // instead of guessing. The inline height is the no-JS fallback.
  function fit() {
    try {
      var doc = frame.contentDocument;
      if (!doc || !doc.body) return;
      var h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
      if (h > 200) frame.style.height = (h + 24) + 'px';
    } catch (e) { /* keep the fallback height */ }
  }

  frame.addEventListener('load', function () { fit(); setTimeout(fit, 250); });
  window.addEventListener('resize', fit);

  function pair(onBtn, offBtn, apply) {
    function set(isOn) {
      onBtn.setAttribute('aria-pressed', String(isOn));
      offBtn.setAttribute('aria-pressed', String(!isOn));
      apply(isOn);
      setTimeout(fit, 60);
    }
    onBtn.addEventListener('click', function () { set(true); });
    offBtn.addEventListener('click', function () { set(false); });
  }

  pair(
    document.getElementById('imgOn'),
    document.getElementById('imgOff'),
    function (showImages) {
      var doc = frame.contentDocument;
      if (!doc) return;
      var imgs = doc.getElementsByTagName('img');
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if (showImages) {
          if (img.dataset.held) { img.setAttribute('src', img.dataset.held); }
        } else {
          if (img.getAttribute('src')) { img.dataset.held = img.getAttribute('src'); }
          img.removeAttribute('src');
        }
      }
    }
  );

  pair(
    document.getElementById('wDesk'),
    document.getElementById('wPhone'),
    function (isDesktop) {
      frame.style.width = isDesktop ? '600px' : '375px';
    }
  );
})();
</script>
"""


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path,
                        default=SCRATCH / "anniversary-invite-review.html")
    args = parser.parse_args()
    build(args.out)


if __name__ == "__main__":
    main()
