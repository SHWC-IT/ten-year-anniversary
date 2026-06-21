/* SHWC Store, products, cart drawer, guest checkout (Stripe to be wired) */
(function () {
  "use strict";

  var PRODUCTS = [
    { id: "tee",     name: "10YR Anniversary Tee",     price: 25, sizes: ["S", "M", "L", "XL", "2XL"], colors: null, slot: "p-tee",     ph: "Tee photo" },
    { id: "hoodie",  name: "10YR Anniversary Hoodie",  price: 45, sizes: ["S", "M", "L", "XL", "2XL"], colors: null, slot: "p-hoodie",  ph: "Hoodie photo" },
    { id: "hat",     name: "10YR Anniversary Hat",     price: 20, sizes: null, colors: null, slot: "p-hat",     ph: "Hat photo" },
    { id: "tumbler", name: "10YR Anniversary Tumbler", price: 25, sizes: null, colors: null, slot: "p-tumbler", ph: "Tumbler photo" },
    { id: "tote",    name: "Anniversary Tote Bag",     price: 15, sizes: null, colors: ["Black", "Cream"], slot: "p-tote", ph: "Tote photo" }
  ];

  var S = window.SHWC;

  /* ---------- render product grid ---------- */
  function renderGrid() {
    var grid = document.getElementById("storeGrid");
    var html = "";
    PRODUCTS.forEach(function (p, i) {
      html +=
        '<article class="product reveal' + (i % 3 === 1 ? " d1" : i % 3 === 2 ? " d2" : "") + '" data-id="' + p.id + '">' +
          '<div class="ph"><image-slot id="' + p.slot + '" shape="rect" placeholder="' + p.ph + '"></image-slot></div>' +
          '<div class="info">' +
            '<span class="nm">' + p.name + '</span>' +
            '<span class="pr serif">' + S.money(p.price) + '</span>' +
            '<div class="opts">' +
              (p.sizes ? '<select data-opt="size" aria-label="Size">' + p.sizes.map(function (s) { return "<option>" + s + "</option>"; }).join("") + "</select>" : "") +
              (p.colors ? '<select data-opt="color" aria-label="Color">' + p.colors.map(function (c) { return "<option>" + c + "</option>"; }).join("") + "</select>" : "") +
            "</div>" +
            '<button type="button" class="btn sm add">Add to Cart</button>' +
          "</div>" +
        "</article>";
    });
    grid.innerHTML = html;
  }

  /* ---------- drawer ---------- */
  var scrim = document.getElementById("cartScrim");
  var drawer = document.getElementById("cartDrawer");
  var title = document.getElementById("drawerTitle");
  var cartBody = document.getElementById("cartBody");
  var cartFoot = document.getElementById("cartFoot");
  var checkoutBody = document.getElementById("checkoutBody");
  var successBody = document.getElementById("successBody");

  function setStep(step) {
    cartBody.hidden = step !== "cart";
    cartFoot.hidden = step !== "cart";
    checkoutBody.hidden = step !== "checkout";
    successBody.hidden = step !== "success";
    title.textContent = step === "cart" ? "Your Cart" : step === "checkout" ? "Checkout" : "Thank You";
  }
  function openDrawer(step) {
    setStep(step || "cart");
    scrim.classList.add("open");
    drawer.classList.add("open");
    if (window.SHWC && SHWC.unstick) { SHWC.unstick(scrim); SHWC.unstick(drawer); }
  }
  function closeDrawer() {
    scrim.classList.remove("open");
    drawer.classList.remove("open");
  }
  scrim.addEventListener("click", closeDrawer);
  document.getElementById("closeCart").addEventListener("click", closeDrawer);
  document.getElementById("openCart").addEventListener("click", function () { openDrawer("cart"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });

  /* ---------- cart rendering ---------- */
  function subtotal(items) {
    return items.reduce(function (s, it) { return s + it.price * it.qty; }, 0);
  }
  function lineKey(it) { return it.id + "|" + (it.size || "") + "|" + (it.color || ""); }

  function renderCart() {
    var items = S.readCart();
    if (!items.length) {
      cartBody.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p><p style="font-size:.85rem;">Add something from the collection below.</p></div>';
    } else {
      cartBody.innerHTML = items.map(function (it) {
        var meta = [it.size, it.color].filter(Boolean).join(" · ");
        return (
          '<div class="cart-line" data-key="' + lineKey(it) + '">' +
            '<div class="thumb">' + it.name.charAt(0) + "</div>" +
            "<div>" +
              '<div class="nm">' + it.name + "</div>" +
              (meta ? '<div class="meta">' + meta + "</div>" : "") +
              '<div class="qty"><button type="button" data-act="dec" aria-label="Decrease">−</button><span>' + it.qty + '</span><button type="button" data-act="inc" aria-label="Increase">+</button></div>' +
            "</div>" +
            "<div>" +
              '<div class="pr">' + S.money(it.price * it.qty) + "</div>" +
              '<button type="button" class="rm" data-act="rm">Remove</button>' +
            "</div>" +
          "</div>"
        );
      }).join("");
    }
    var sub = subtotal(items);
    document.getElementById("cartSubtotal").textContent = S.money(sub);
    document.getElementById("checkoutTotal").textContent = S.money(sub);
    document.getElementById("toCheckout").toggleAttribute("disabled", !items.length);
  }

  cartBody.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-act]");
    if (!btn) return;
    var key = btn.closest(".cart-line").getAttribute("data-key");
    var items = S.readCart();
    var idx = -1;
    for (var i = 0; i < items.length; i++) if (lineKey(items[i]) === key) { idx = i; break; }
    if (idx < 0) return;
    var act = btn.getAttribute("data-act");
    if (act === "inc") items[idx].qty += 1;
    if (act === "dec") items[idx].qty = Math.max(0, items[idx].qty - 1);
    if (act === "rm") items[idx].qty = 0;
    items = items.filter(function (it) { return it.qty > 0; });
    S.writeCart(items);
  });

  document.addEventListener("cart:change", renderCart);

  /* ---------- add to cart ---------- */
  document.getElementById("storeGrid").addEventListener("click", function (e) {
    var btn = e.target.closest("button.add");
    if (!btn) return;
    var card = btn.closest(".product");
    var p = null;
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === card.getAttribute("data-id")) { p = PRODUCTS[i]; break; }
    var sizeSel = card.querySelector('[data-opt="size"]');
    var colorSel = card.querySelector('[data-opt="color"]');
    S.addToCart({
      id: p.id, name: p.name, price: p.price,
      size: sizeSel ? sizeSel.value : "",
      color: colorSel ? colorSel.value : "",
      qty: 1
    });
    S.toast("Added to cart, " + p.name);
  });

  /* ---------- checkout ---------- */
  document.getElementById("toCheckout").addEventListener("click", function () { setStep("checkout"); });
  document.getElementById("backToCart").addEventListener("click", function (e) { e.preventDefault(); setStep("cart"); });

  var fulfil = document.getElementById("cfulfil");
  var shipField = document.getElementById("shipField");
  fulfil.addEventListener("change", function () { shipField.hidden = fulfil.value !== "ship"; });

  var cname = document.getElementById("cname");
  var cemail = document.getElementById("cemail");
  var caddress = document.getElementById("caddress");
  [cname, cemail, caddress].forEach(function (el) {
    el.addEventListener("input", function () { el.classList.remove("bad"); });
  });
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    if (!cname.value.trim()) { cname.classList.add("bad"); ok = false; }
    if (!validEmail(cemail.value.trim())) { cemail.classList.add("bad"); ok = false; }
    if (fulfil.value === "ship" && !caddress.value.trim()) { caddress.classList.add("bad"); ok = false; }
    if (!ok) return;

    var items = S.readCart();
    var n = items.reduce(function (s, it) { return s + it.qty; }, 0);
    var first = cname.value.trim().split(" ")[0];
    document.getElementById("orderSummary").textContent =
      "Thank you, " + first + ", " + n + (n === 1 ? " item" : " items") + " · " + S.money(subtotal(items)) +
      (fulfil.value === "ship" ? ", shipping to you." : ", ready for pickup at church.");
    S.writeCart([]);
    setStep("success");
  });

  document.getElementById("keepShopping").addEventListener("click", closeDrawer);

  /* ---------- init ---------- */
  renderGrid();
  S.refreshReveal();
  renderCart();
})();
