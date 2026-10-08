/* SHWC shared, nav, reveal, cart store, toast */
(function () {
  "use strict";

  document.body.classList.add("js");

  /* ---------- force dark mode (light mode removed) ---------- */
  document.documentElement.setAttribute("data-base", "dark");

  /* ---------- nav stuck ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.setAttribute("data-stuck", window.scrollY > 10 ? "true" : "false"); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- scroll reveal (JS-driven; visible without JS) ---------- */
  var revealIO = null;
  var ioEverFired = false;
  function revealAll() {
    document.querySelectorAll(".reveal:not(.in)").forEach(function (e) { e.classList.add("in"); });
  }
  function initReveal() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries) {
        ioEverFired = true;
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    }
    els.forEach(function (e) { revealIO.observe(e); });
    // Fallback: some embedded runtimes never fire IntersectionObserver callbacks.
    // An observer must fire an initial callback right after observe(); if nothing
    // has arrived shortly, abandon the animation and show everything.
    setTimeout(function () {
      if (!ioEverFired) revealAll();
    }, 700);
    // Watchdog: if reveals are .in but still computed opacity 0 (animation
    // engine stalled), force everything visible.
    setTimeout(function () {
      var probe = document.querySelector(".reveal.in");
      if (probe && getComputedStyle(probe).opacity === "0") {
        var st = document.createElement("style");
        st.textContent = "body.js .reveal{opacity:1 !important; animation:none !important; transform:none !important;}";
        document.head.appendChild(st);
      }
    }, 1600);
  }

  /* ---------- cart store (shared across pages via localStorage) ---------- */
  var CART_KEY = "shwc_cart_v1";
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function writeCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateBadges(items);
    document.dispatchEvent(new CustomEvent("cart:change", { detail: items }));
  }
  function cartCount(items) {
    return (items || readCart()).reduce(function (s, it) { return s + it.qty; }, 0);
  }
  function addToCart(item) {
    var items = readCart();
    var key = item.id + "|" + (item.size || "") + "|" + (item.color || "");
    var found = null;
    for (var i = 0; i < items.length; i++) {
      var k = items[i].id + "|" + (items[i].size || "") + "|" + (items[i].color || "");
      if (k === key) { found = items[i]; break; }
    }
    if (found) found.qty += item.qty || 1;
    else items.push({ id: item.id, name: item.name, price: item.price, size: item.size || "", color: item.color || "", qty: item.qty || 1 });
    writeCart(items);
  }
  function updateBadges(items) {
    var n = cartCount(items);
    document.querySelectorAll(".cart-btn .count").forEach(function (b) {
      b.textContent = n;
      b.style.display = n > 0 ? "grid" : "none";
    });
  }

  /* ---------- stalled-animation guard ----------
     Some embedded runtimes leave CSS animations forever "pending" at
     currentTime 0, which pins fill-mode:both elements at their `from`
     frame (invisible/off-screen). After the animation should have
     finished, force any still-stuck animation to its end state. */
  function unstick(el) {
    if (!el || !el.getAnimations) return;
    setTimeout(function () {
      el.getAnimations().forEach(function (a) {
        if (a.pending || a.currentTime === 0) {
          try { a.finish(); } catch (e) { try { a.cancel(); } catch (e2) {} }
        }
      });
    }, 450);
  }

  /* ---------- toast ---------- */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    setTimeout(function () { toastEl.classList.add("show"); unstick(toastEl); }, 20);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2400);
  }

  window.SHWC = {
    readCart: readCart,
    writeCart: writeCart,
    addToCart: addToCart,
    cartCount: cartCount,
    toast: toast,
    unstick: unstick,
    refreshReveal: initReveal,
    money: function (n) { return "$" + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, ""); }
  };

  /* ---------- countdown ----------
     Walks the weekend: counts down to each service, shows "Happening Now"
     with a Watch Live link while one is on, and thanks people once Sunday
     is done. Add ?countdown-preview=2026-10-10T19:00 to a URL to preview
     any moment (read as Eastern time). */
  var cbClock = document.getElementById("cbClock");
  if (cbClock) {
    var cbBar = cbClock.closest(".countbar");
    var cbLabel = cbBar && cbBar.querySelector(".cb-label");
    var cbWhen = cbBar && cbBar.querySelector(".cb-when");
    var CB_STREAM = "https://www.youtube.com/@SHWCLynchburg/streams";
    var CB_LIVE_MS = 3 * 3600000; // how long each service shows as Happening Now
    var CB_SERVICES = [
      { start: "2026-10-09T20:00:00-04:00", label: "The Celebration Begins In", when: "Friday, Oct 9 · 8:00 PM ET" },
      { start: "2026-10-10T18:00:00-04:00", label: "Saturday Service Begins In", when: "Saturday, Oct 10 · 6:00 PM ET" },
      { start: "2026-10-11T10:00:00-04:00", label: "Sunday Service Begins In", when: "Sunday, Oct 11 · 10:00 AM ET" }
    ].map(function (sv) { sv.t = new Date(sv.start).getTime(); return sv; });

    var cbOffset = 0;
    var cbPreview = (location.search.match(/[?&]countdown-preview=([^&]+)/) || [])[1];
    if (cbPreview) {
      var cbAt = new Date(decodeURIComponent(cbPreview) + (/[+-]\d\d:\d\d$|Z$/.test(cbPreview) ? "" : "-04:00")).getTime();
      if (!isNaN(cbAt)) cbOffset = cbAt - Date.now();
    }

    var cbExt = '<svg class="ext-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
    var cbLink = document.createElement("a");
    cbLink.className = "cb-live";
    cbLink.href = CB_STREAM;
    cbLink.target = "_blank";
    cbLink.rel = "noopener";
    cbLink.hidden = true;
    cbBar.appendChild(cbLink);

    var pad2 = function (n) { return n < 10 ? "0" + n : "" + n; };
    var cbMode = "";
    var cbUnits = [];
    var cbSet = function (mode, label, when, link) {
      if (mode === cbMode) return;
      cbMode = mode;
      if (cbLabel) { cbLabel.textContent = label || ""; cbLabel.hidden = !label; }
      if (cbWhen) { cbWhen.textContent = when || ""; cbWhen.hidden = !when; }
      cbLink.hidden = !link;
      if (link) cbLink.innerHTML = link + cbExt;
      cbBar.classList.toggle("is-live", mode.indexOf("live") === 0);
      cbBar.classList.toggle("is-done", mode === "done");
      if (mode.indexOf("count") === 0) {
        cbClock.innerHTML = "<span><b>0</b><i>Days</i></span><span><b>00</b><i>Hrs</i></span><span><b>00</b><i>Min</i></span><span><b>00</b><i>Sec</i></span>";
        cbUnits = cbClock.querySelectorAll("b");
      } else {
        cbClock.innerHTML = mode === "done" ? "<b>Thank You for Celebrating With Us</b>" : "<b>Happening Now</b>";
        cbUnits = [];
      }
    };

    var cbTick = function () {
      var now = Date.now() + cbOffset;
      for (var i = 0; i < CB_SERVICES.length; i++) {
        var sv = CB_SERVICES[i];
        if (now < sv.t) {
          // after Friday has begun, the stream link stays up between services
          cbSet("count" + i, sv.label, sv.when, i > 0 ? "Watch Live" : "");
          var diff = sv.t - now;
          var vals = [Math.floor(diff / 86400000), pad2(Math.floor(diff / 3600000) % 24), pad2(Math.floor(diff / 60000) % 60), pad2(Math.floor(diff / 1000) % 60)];
          for (var u = 0; u < cbUnits.length && u < 4; u++) cbUnits[u].textContent = vals[u];
          if (cbUnits[0]) cbUnits[0].parentNode.hidden = vals[0] === 0;
          return;
        }
        if (now < sv.t + CB_LIVE_MS) {
          cbSet("live" + i, "The Celebration Is Here", "", "Watch Live");
          return;
        }
      }
      cbSet("done", "", "", "Watch Again");
    };
    cbTick();
    setInterval(cbTick, 1000);
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var menu = document.getElementById("mobileMenu");
  if (menuBtn && menu) {
    var setMenu = function (open) {
      menu.classList.toggle("open", open);
      menuBtn.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      if (open) unstick(menu);
    };
    menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  initReveal();
  updateBadges();
})();
