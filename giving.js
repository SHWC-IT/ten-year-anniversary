/* SHWC Giving, recurrence picker that opens the matching Square payment link */
(function () {
  "use strict";

  // One Square payment link per recurrence. Amount is entered by the donor on Square.
  // Add the weekly / one-time links here as they are created.
  var LINKS = {
    once: "",
    weekly: "https://square.link/u/rnyWGhI0?src=embed",
    monthly: "https://square.link/u/2YJkTmhu?src=embed"
  };

  var state = { freq: "monthly" };

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
})();
