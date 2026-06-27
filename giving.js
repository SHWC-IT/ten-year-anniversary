/* SHWC Giving, recurrence picker that opens the matching Square payment link */
(function () {
  "use strict";

  // One Square payment link per recurrence. Amount is entered by the donor on Square.
  // Add the weekly / one-time links here as they are created.
  var LINKS = {
    once: "https://square.link/u/3Nc6DwDE?src=embed",
    weekly: "https://square.link/u/rnyWGhI0?src=embed",
    monthly: "https://square.link/u/2YJkTmhu?src=embed"
  };

  var state = { freq: "once" };

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
})();
