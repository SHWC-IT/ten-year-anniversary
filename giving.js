/* SHWC Giving, donation flow (front-end mock; Stripe to be wired) */
(function () {
  "use strict";

  var state = { mode: "once", freq: "monthly", amount: 50 };

  var segOnce = document.getElementById("segOnce");
  var segRecur = document.getElementById("segRecur");
  var freqRow = document.getElementById("freqRow");
  var amounts = document.getElementById("amounts");
  var customAmt = document.getElementById("customAmt");
  var giveBtn = document.getElementById("giveBtn");
  var form = document.getElementById("giveForm");
  var fields = document.getElementById("giveFields");
  var success = document.getElementById("giveSuccess");
  var summary = document.getElementById("giveSummary");
  var nameIn = document.getElementById("gname");
  var emailIn = document.getElementById("gemail");

  function money(n) { return "$" + Number(n).toLocaleString("en-US"); }

  function updateBtn() {
    var label = "Give " + money(state.amount);
    if (state.mode === "recur") label += state.freq === "weekly" ? " weekly" : " monthly";
    giveBtn.textContent = label;
    giveBtn.toggleAttribute("disabled", !(state.amount > 0));
  }

  function setMode(mode) {
    state.mode = mode;
    segOnce.setAttribute("aria-pressed", mode === "once" ? "true" : "false");
    segRecur.setAttribute("aria-pressed", mode === "recur" ? "true" : "false");
    freqRow.hidden = mode !== "recur";
    updateBtn();
  }
  segOnce.addEventListener("click", function () { setMode("once"); });
  segRecur.addEventListener("click", function () { setMode("recur"); });

  freqRow.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-freq]");
    if (!b) return;
    state.freq = b.getAttribute("data-freq");
    freqRow.querySelectorAll("button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b ? "true" : "false");
    });
    updateBtn();
  });

  amounts.addEventListener("click", function (e) {
    var b = e.target.closest("button[data-amt]");
    if (!b) return;
    state.amount = parseInt(b.getAttribute("data-amt"), 10);
    customAmt.value = "";
    amounts.querySelectorAll("button").forEach(function (x) {
      x.setAttribute("aria-pressed", x === b ? "true" : "false");
    });
    updateBtn();
  });

  customAmt.addEventListener("input", function () {
    var v = parseFloat(customAmt.value);
    amounts.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
    state.amount = isNaN(v) || v <= 0 ? 0 : v;
    updateBtn();
  });

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  [nameIn, emailIn].forEach(function (el) {
    el.addEventListener("input", function () { el.classList.remove("bad"); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    if (!nameIn.value.trim()) { nameIn.classList.add("bad"); ok = false; }
    if (!validEmail(emailIn.value.trim())) { emailIn.classList.add("bad"); ok = false; }
    if (!ok || !(state.amount > 0)) return;

    var fund = document.getElementById("fund").value;
    var first = nameIn.value.trim().split(" ")[0];
    var rec = state.mode === "recur" ? (state.freq === "weekly" ? " every week" : " every month") : "";
    summary.textContent = first + ", your gift of " + money(state.amount) + rec + " to " + fund + " has been received.";
    fields.hidden = true;
    success.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("giveAgain").addEventListener("click", function (e) {
    e.preventDefault();
    success.hidden = true;
    fields.hidden = false;
  });

  updateBtn();
})();
