const CONFIG = window.STORE_CONFIG || {};
const PRODUCTS = [
  { id: 1, name: "Retro Club Tee", category: "Apparel", type: "Physical", price: 450, tag: "PREORDER", symbol: "✳", code: "PM / 001" },
  { id: 2, name: "Everyday Tote", category: "Accessories", type: "Physical", price: 275, tag: "PREORDER", symbol: "▧", code: "PM / 002" },
  { id: 3, name: "Digital Wallpaper Pack", category: "Digital", type: "Digital", price: 125, tag: "DIGITAL", symbol: "▦", code: "PM / 003" },
  { id: 4, name: "Printable Planner", category: "Digital", type: "Digital", price: 195, tag: "INSTANT / AFTER CONFIRMATION", symbol: "✴", code: "PM / 004" }
];
let cart = [];
let activeCategory = "All";
const $ = (s) => document.querySelector(s);
const money = (n) => `${CONFIG.currency || "SRD"} ${Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

function renderProducts() {
  const term = ($("#searchInput").value || "").trim().toLowerCase();
  const visible = PRODUCTS.filter(p => (activeCategory === "All" || p.category === activeCategory) && `${p.name} ${p.category}`.toLowerCase().includes(term));
  $("#productGrid").innerHTML = visible.length ? visible.map(p => `
    <article class="product-card">
      <div class="product-art">${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
        <div class="art-shape">${p.symbol}</div><span class="art-code">${p.code}</span>
      </div>
      <div class="product-info"><h3>${p.name}</h3><small class="fulfillment-label">${p.type || "Physical"} · PREORDER</small><div class="product-bottom">
        <span class="product-price">${money(p.price)}</span>
        <button class="add-button" data-add="${p.id}">+ ADD TO BAG</button>
      </div></div>
    </article>`).join("") : `<p class="no-results">No items found. Try another search.</p>`;
}
function total() { return cart.reduce((sum,item) => sum + item.price * item.qty, 0); }
function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.qty, 0);
  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = `(${count})`;
  $("#cartSubtotal").textContent = money(total());
  $("#checkoutTotal").textContent = money(total());
  $("#cartItems").innerHTML = cart.length ? cart.map(item => `
    <div class="cart-line"><div class="cart-thumb">${item.symbol}</div><div>
      <h4>${item.name}</h4><small>${money(item.price)} EACH</small>
      <div class="qty-controls"><button data-qty="${item.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${item.id}" data-delta="1" aria-label="Increase quantity">+</button></div>
    </div><button class="remove-button" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button></div>`).join("") : `<p class="empty-cart">Your bag is waiting for something good.</p>`;
  $("#checkoutButton").disabled = !cart.length;
  $("#checkoutButton").style.opacity = cart.length ? "1" : ".45";
}
function openCart() { $("#cartDrawer").classList.add("open"); $("#drawerBackdrop").classList.add("open"); $("#cartDrawer").setAttribute("aria-hidden","false"); }
function closeCart() { $("#cartDrawer").classList.remove("open"); $("#drawerBackdrop").classList.remove("open"); $("#cartDrawer").setAttribute("aria-hidden","true"); }

$("#productGrid").addEventListener("click", e => {
  const btn = e.target.closest("[data-add]"); if (!btn) return;
  const p = PRODUCTS.find(x => x.id === Number(btn.dataset.add));
  const existing = cart.find(x => x.id === p.id);
  existing ? existing.qty++ : cart.push({...p,qty:1});
  renderCart(); btn.textContent = "✓ ADDED"; setTimeout(() => btn.textContent = "+ ADD TO BAG",900);
});
$("#cartItems").addEventListener("click", e => {
  const qty = e.target.closest("[data-qty]"), remove = e.target.closest("[data-remove]");
  if (qty) { const item = cart.find(x => x.id === Number(qty.dataset.qty)); item.qty += Number(qty.dataset.delta); if (item.qty <= 0) cart = cart.filter(x => x.id !== item.id); }
  if (remove) cart = cart.filter(x => x.id !== Number(remove.dataset.remove));
  renderCart();
});
$("#openCart").addEventListener("click",openCart);
$("#closeCart").addEventListener("click",closeCart);
$("#drawerBackdrop").addEventListener("click",closeCart);
$("#checkoutButton").addEventListener("click",() => {
  if (!cart.length) return;
  closeCart();
  $("#bankInstructionsText").textContent = CONFIG.bankInstructions || "Contact the store for bank transfer details.";
  $("#checkoutDialog").showModal();
});
$("#searchInput").addEventListener("input",renderProducts);
$("#categories").addEventListener("click",e => {
  const btn = e.target.closest("[data-category]"); if (!btn) return;
  activeCategory = btn.dataset.category;
  document.querySelectorAll(".category").forEach(x => x.classList.toggle("active",x === btn));
  renderProducts();
});
$("#themeToggle").addEventListener("click",() => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("pixel-market-theme",next);
  $("#themeToggle").textContent = next === "light" ? "☾" : "☼";
});
const savedTheme = localStorage.getItem("pixel-market-theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
$("#themeToggle").textContent = document.documentElement.dataset.theme === "light" ? "☾" : "☼";
$("#contactLink").href = `mailto:${CONFIG.contactEmail || "hello@example.com"}`;
$("#year").textContent = new Date().getFullYear();

$("#paymentProof").addEventListener("change", e => {
  const file = e.target.files && e.target.files[0];
  const status = $("#fileStatus");
  if (!file) { status.textContent = "No proof selected yet."; return; }
  const allowed = ["image/jpeg", "image/png", "application/pdf"];
  if (!allowed.includes(file.type)) {
    e.target.value = "";
    status.textContent = "Unsupported file. Please choose a JPG, PNG or PDF.";
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    e.target.value = "";
    status.textContent = "File is too large. Maximum size is 8 MB.";
    return;
  }
  status.textContent = `Selected: ${file.name} · ${(file.size / 1024 / 1024).toFixed(2)} MB. Remember to attach it in WhatsApp.`;
});

$("#checkoutForm").addEventListener("submit",e => {
  e.preventDefault();
  const error = $("#formError"); error.textContent = "";
  if (!cart.length) { error.textContent = "Your bag is empty."; return; }
  const proof = $("#paymentProof").files && $("#paymentProof").files[0];
  if (!proof) { error.textContent = "Please select your bank transfer proof first."; return; }
  const data = new FormData(e.currentTarget);
  const lines = cart.map(i => `• ${i.name} × ${i.qty} — ${money(i.price*i.qty)} (${i.type || "Physical"})`).join("\n");
  const message = [
    `Hello ${CONFIG.storeName || "store"}! I'd like to submit this PREORDER:`,
    "", lines, "", `PREORDER TOTAL: ${money(total())}`, "PAYMENT: Bank transfer",
    `NAME: ${data.get("name")}`, `PHONE: ${data.get("phone")}`,
    `EMAIL: ${data.get("email") || "Not provided"}`,
    `DELIVERY / DIGITAL DELIVERY DETAILS: ${data.get("notes") || "To be discussed"}`,
    "", `PROOF OF TRANSFER: I have selected ${proof.name}. I will attach the file to this WhatsApp message.`,
    "", "Please verify the transfer and confirm my preorder. I understand the order is not confirmed until payment is verified."
  ].join("\n");
  const number = (CONFIG.whatsappNumber || "").replace(/\D/g,"");
  if (!number || number === "59700000000") {
    error.textContent = "Setup needed: add your real WhatsApp number in config.js before accepting orders.";
    return;
  }
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,"_blank","noopener");
  // Keep the cart and selected proof in this tab so the customer can return,
  // attach the file manually in WhatsApp, and only clear after they choose to.
  $("#fileStatus").textContent = `Keep this tab open. Attach "${proof.name}" in WhatsApp before sending your order.`;
  error.textContent = "WhatsApp opened in a new tab. Attach your selected proof file in that chat, then send the message. Your cart remains here until you clear it.";
});
renderProducts(); renderCart();