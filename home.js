/* SHWC Home, placeholder-link toasts + ministers scroll showcase */
(function () {
  "use strict";

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-toast]");
    if (!a) return;
    e.preventDefault();
    window.SHWC.toast(a.getAttribute("data-toast"));
  });

  /* smooth-scroll for in-page hash links (hero buttons, etc.) */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute("href");
    if (!hash || hash.length < 2) return;
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    var top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.round(top), behavior: "smooth" });
  });

  /* ---------- hero video: portrait clip on narrow viewports, landscape otherwise ---------- */
  (function () {
    var v = document.querySelector(".hero-video");
    if (!v || !v.dataset.desktop) return;
    var mq = window.matchMedia("(max-width: 680px)");
    var current = "";

    // iOS/Android need muted set as a *property* (not just attribute) for
    // muted-autoplay to be allowed.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.playsInline = true;

    function tryPlay() {
      var p = v.play();
      if (p && p.catch) p.catch(function () {/* blocked - will retry on gesture */});
    }
    function pick() {
      var want = mq.matches ? v.dataset.mobile : v.dataset.desktop;
      if (want === current) return;
      current = want;
      v.setAttribute("src", want);
      v.load();
      v.muted = true;
      tryPlay();
    }
    pick();
    if (mq.addEventListener) mq.addEventListener("change", pick);
    else if (mq.addListener) mq.addListener(pick);

    // Retry as soon as the browser has enough data.
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    // Some devices (e.g. iOS Low Power Mode) block muted autoplay outright and
    // show a play overlay. Kick playback off on the very first user interaction.
    function kick() {
      v.muted = true;
      tryPlay();
      if (!v.paused) {
        ["touchstart", "pointerdown", "click", "scroll", "keydown"].forEach(function (ev) {
          window.removeEventListener(ev, kick);
        });
      }
    }
    ["touchstart", "pointerdown", "click", "scroll", "keydown"].forEach(function (ev) {
      window.addEventListener(ev, kick, { passive: true });
    });

    // Resume if the tab/app comes back to the foreground.
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) { v.muted = true; tryPlay(); }
    });
  })();

  /* ---------- hero video overlay: eases 60% -> 30% as you scroll the hero ---------- */
  (function () {
    var hero = document.querySelector(".hero");
    var media = hero && hero.querySelector(".media");
    if (!media) return;
    var raf = 0;
    function apply() {
      raf = 0;
      var vh = window.innerHeight;
      var range = hero.offsetHeight - vh;
      if (range <= 0) range = 1;
      var p = Math.max(0, Math.min(1, window.scrollY / range));
      // smootherstep for a gentle, gradual ease across the whole hero
      var e = p * p * p * (p * (p * 6 - 15) + 10);
      media.style.setProperty("--hero-ov", (0.6 - 0.3 * e).toFixed(3));
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(apply); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();
  })();

  /* ---------- Add to Calendar (.ics with all three services) ---------- */
  var addCal = document.getElementById("addCal");
  if (addCal) {
    addCal.addEventListener("click", function (e) {
      e.preventDefault();
      var descTxt = "Shepherd's House Worship Center 10 Year Anniversary - A Decade of Faith. A Lifetime of Impact.";
      var sydnor = "Sydnor Performance Hall, 100 Vernon Street, Lynchburg, VA 24501";
      var campus = "Shepherd's House Lynchburg Campus, 521 Allegheny Avenue, Lynchburg, VA 24501";
      // Oct 2026 is EDT (UTC-4)
      var events = [
        { uid: "shwc10-fri@shwc", start: "20261010T010000Z", end: "20261010T030000Z", title: "SHWC 10th Anniversary - Gathering of Prayer & Thanksgiving", loc: campus },
        { uid: "shwc10-sat@shwc", start: "20261010T220000Z", end: "20261011T000000Z", title: "SHWC 10th Anniversary - Night of United Worship", loc: sydnor },
        { uid: "shwc10-sun@shwc", start: "20261011T140000Z", end: "20261011T160000Z", title: "SHWC 10th Anniversary - Commissioning Service", loc: sydnor }
      ];
      var now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
      var lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//SHWC//10th Anniversary//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH"
      ];
      events.forEach(function (ev) {
        lines.push(
          "BEGIN:VEVENT",
          "UID:" + ev.uid,
          "DTSTAMP:" + now,
          "DTSTART:" + ev.start,
          "DTEND:" + ev.end,
          "SUMMARY:" + ev.title,
          "LOCATION:" + ev.loc.replace(/,/g, "\\,"),
          "DESCRIPTION:" + descTxt.replace(/,/g, "\\,"),
          "END:VEVENT"
        );
      });
      lines.push("END:VCALENDAR");
      var blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var dl = document.createElement("a");
      dl.href = url;
      dl.download = "SHWC 10th Anniversary.ics";
      document.body.appendChild(dl);
      dl.click();
      document.body.removeChild(dl);
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      window.SHWC.toast("Calendar file downloaded - all three services");
    });
  }

  /* ---------- ministers: scroll-scrubbed sticky showcase ----------
     All styles are computed from scroll progress every frame, no CSS transitions, so it cannot stall in any environment. */
  var sec = document.getElementById("ministers");
  if (!sec) return;
  var cards = Array.prototype.slice.call(sec.querySelectorAll(".m-card"));
  var days = Array.prototype.slice.call(sec.querySelectorAll(".m-day"));
  var dots = Array.prototype.slice.call(sec.querySelectorAll(".m-progress i"));
  if (!cards.length) return;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function update() {
    var vh = window.innerHeight;
    var rect = sec.getBoundingClientRect();
    var total = sec.offsetHeight - vh;
    if (total <= 0) total = 1;
    var p = clamp(-rect.top / total, 0, 1);
    var pos = p * (cards.length - 1);

    var dayAct = [0, 0, 0];
    cards.forEach(function (c, i) {
      var d = pos - i;
      var a = Math.abs(d);
      var op = clamp(1 - a * 1.5, 0, 1);
      c.style.opacity = op;
      c.style.visibility = op === 0 ? "hidden" : "visible";
      c.style.transform = "translateY(" + (d * -90).toFixed(1) + "px)";
      c.style.zIndex = op > 0.5 ? 2 : 1;
      if (dots[i]) dots[i].className = a < 0.5 ? "on" : "";
    });

    // Day-label activeness: stays full while scrolling between cards of the
    // SAME day; only shrinks/grows when pos crosses into a different day.
    function dayOf(i) {
      i = clamp(i, 0, cards.length - 1);
      return parseInt(cards[i].getAttribute("data-day"), 10) || 0;
    }
    var lo = Math.floor(pos), hi = Math.ceil(pos), frac = pos - lo;
    var dA = dayOf(lo), dB = dayOf(hi);
    if (dA === dB) { dayAct[dA] = 1; }
    else { dayAct[dA] = 1 - frac; dayAct[dB] = frac; }

    days.forEach(function (el, i) {
      var act = dayAct[i] || 0;
      el.style.opacity = (0.35 + 0.65 * act).toFixed(3);
      var dEl = el.querySelector(".d");
      if (dEl) dEl.style.transform = "scale(" + (0.62 + 0.38 * act).toFixed(3) + ")";
    });
  }
  // Called directly from the scroll handler: the math is cheap, and some
  // embedded runtimes never fire requestAnimationFrame, which would freeze
  // the showcase if we gated updates behind it.
  /* jump to a specific day inside the scroll showcase */
  function scrollToDay(dayIdx) {
    var idx = -1;
    for (var i = 0; i < cards.length; i++) {
      if (parseInt(cards[i].getAttribute("data-day"), 10) === dayIdx) { idx = i; break; }
    }
    if (idx < 0) return;
    var secTop = sec.getBoundingClientRect().top + window.scrollY;
    var total = sec.offsetHeight - window.innerHeight;
    if (total <= 0) total = 1;
    var target = secTop + (idx / (cards.length - 1)) * total;
    window.scrollTo({ top: Math.round(target), behavior: "smooth" });
  }
  document.addEventListener("click", function (e) {
    var row = e.target.closest("[data-goto-day]");
    if (!row) return;
    scrollToDay(parseInt(row.getAttribute("data-goto-day"), 10));
  });

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
