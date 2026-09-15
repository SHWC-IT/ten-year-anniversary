/* SHWC Giving, recurrence picker that opens the matching Square payment link */
(function () {
  "use strict";

  // One Square payment link per recurrence. Amount is entered by the donor on Square.
  // Add the weekly / one-time links here as they are created.
  var LINKS = {
    once: "https://square.link/u/NKMTbdVA?src=embed",
    weekly: "https://square.link/u/ZnYT9T6H?src=embed",
    monthly: "https://square.link/u/2YJkTmhu?src=embed"
  };

  var state = { freq: "once" };

  // Pledge form, embedded in a modal on this page.
  //
  // TO TURN THE PLEDGE BUTTON ON: paste the form's embed URL here. The button
  // stays hidden while this is empty, so nothing half-built ships to visitors.
  //
  // In the form builder, set the after-submit redirect to
  // https://<this site>/pledge-complete.html. That page breaks out of the
  // iframe on load, so finishing the pledge lands the visitor on our thank you
  // page in the full window, the same way registration already works.
  var PLEDGE_FORM_URL = "";

  var grid = document.getElementById("recurGrid");
  var form = document.getElementById("giveForm");
  var giveBtn = document.getElementById("giveBtn");
  var unavailable = document.getElementById("giveUnavailable");

  grid.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-freq]");
    if (!b) return;
    state.freq = b.getAttribute("data-freq");
    grid.querySelectorAll("button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b ? "true" : "false");
    });
    unavailable.hidden = true;
  });

  // Open the Square checkout in a centered popup (falls back to a new tab).
  function openCheckout(url) {
    var title = "Square Payment Links";
    var topWindow = window.top ? window.top : window;

    var dualScreenLeft = topWindow.screenLeft !== undefined ? topWindow.screenLeft : topWindow.screenX;
    var dualScreenTop = topWindow.screenTop !== undefined ? topWindow.screenTop : topWindow.screenY;

    var width = topWindow.innerWidth || document.documentElement.clientWidth || screen.width;
    var height = topWindow.innerHeight || document.documentElement.clientHeight || screen.height;

    var h = height * 0.75;
    var w = 500;

    var systemZoom = width / topWindow.screen.availWidth;
    var left = (width - w) / 2 / systemZoom + dualScreenLeft;
    var top = (height - h) / 2 / systemZoom + dualScreenTop;

    var newWindow = window.open(
      url,
      title,
      "scrollbars=yes, width=" + (w / systemZoom) + ", height=" + (h / systemZoom) + ", top=" + top + ", left=" + left
    );

    if (newWindow && window.focus) newWindow.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var url = LINKS[state.freq];
    if (!url) {
      unavailable.hidden = false;
      return;
    }
    unavailable.hidden = true;
    openCheckout(url);
  });

  // Fit the "Choose your giving frequency" heading to the box width on one line,
  // at the largest size that fits, on any screen size.
  var pick = form.querySelector(".give-pick");
  function fitPick() {
    if (!pick) return;
    pick.style.fontSize = "35px";
    var avail = pick.clientWidth;
    var text = pick.scrollWidth;
    if (text > avail && text > 0) {
      var size = Math.max(12, 35 * (avail / text) * 0.98);
      pick.style.fontSize = size.toFixed(1) + "px";
    }
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitPick);
  }
  fitPick();
  window.addEventListener("resize", fitPick);

  /* ---------- pledge modal ---------- */
  var pledgeRow = document.getElementById("pledgeRow");
  var pledgeBtn = document.getElementById("pledgeBtn");
  var pledgeModal = document.getElementById("pledgeModal");
  var pledgeFrame = document.getElementById("pledgeFrame");
  if (!PLEDGE_FORM_URL || !pledgeRow || !pledgeBtn || !pledgeModal || !pledgeFrame) return;

  pledgeRow.hidden = false;
  var lastFocus = null;

  function openPledge() {
    lastFocus = document.activeElement;
    // Load the form the first time it is asked for, then leave it in place so
    // a reopen keeps whatever the visitor had already typed.
    if (!pledgeFrame.getAttribute("src")) pledgeFrame.setAttribute("src", PLEDGE_FORM_URL);
    pledgeModal.hidden = false;
    document.body.style.overflow = "hidden";
    var closeBtn = pledgeModal.querySelector(".modal-x");
    if (closeBtn) closeBtn.focus();
  }

  function closePledge() {
    pledgeModal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  pledgeBtn.addEventListener("click", openPledge);
  pledgeModal.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-pledge]")) closePledge();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !pledgeModal.hidden) closePledge();
  });
})();
