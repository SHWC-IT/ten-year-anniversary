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

  /* ---------- countdown ---------- */
  var cbClock = document.getElementById("cbClock");
  if (cbClock) {
    var cbTarget = new Date(cbClock.getAttribute("data-target")).getTime();
    var cbUnits = cbClock.querySelectorAll("b");
    var pad2 = function (n) { return n < 10 ? "0" + n : "" + n; };
    var cbTimer = null;
    var cbTick = function () {
      var diff = cbTarget - Date.now();
      if (diff <= 0) {
        cbClock.innerHTML = "<b>Happening Now</b>";
        if (cbTimer) clearInterval(cbTimer);
        return;
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor(diff / 3600000) % 24;
      var m = Math.floor(diff / 60000) % 60;
      var s = Math.floor(diff / 1000) % 60;
      var vals = [d, pad2(h), pad2(m), pad2(s)];
      for (var i = 0; i < cbUnits.length && i < 4; i++) cbUnits[i].textContent = vals[i];
    };
    cbTick();
    cbTimer = setInterval(cbTick, 1000);
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
