const CONFIG = window.STORE_CONFIG || {};
const PRODUCTS = [
  { id: 1, name: "S.S.E.R.C. Polo Shirt", nl: "S.S.E.R.C. Poloshirt", descEn: "Navy polo with the S.S.E.R.C. emblem on the chest.", descNl: "Marineblauwe polo met het S.S.E.R.C.-embleem op de borst.", category: "Apparel", type: "Physical", price: 650, tag: "PREORDER", image: "products/sserc-polo.png", code: "SSERC / 001" },
  { id: 2, name: "S.S.E.R.C. Signature Hoodie", nl: "S.S.E.R.C. Signature Hoodie", descEn: "Navy hoodie with a bold S.S.E.R.C. front design.", descNl: "Marineblauwe hoodie met opvallend S.S.E.R.C.-ontwerp op de voorkant.", category: "Apparel", type: "Physical", price: 1100, tag: "PREORDER", image: "products/sserc-hoodie.png", code: "SSERC / 002" },
  { id: 3, name: "S.S.E.R.C. Explorer Tote Bag", nl: "S.S.E.R.C. Explorer Tote Bag", descEn: "Cream tote bag with navy handles and the S.S.E.R.C. emblem.", descNl: "Crèmekleurige draagtas met marineblauwe hengsels en S.S.E.R.C.-embleem.", category: "Accessories", type: "Physical", price: 275, tag: "PREORDER", image: "products/sserc-totebag.png", code: "SSERC / 003" },
  { id: 4, name: "S.S.E.R.C. Mission Notebook", nl: "S.S.E.R.C. Mission Notebook", descEn: "Navy spiral notebook with a rocket-launch illustration.", descNl: "Marineblauw notitieboek met spiraalbinding en raketlanceringillustratie.", category: "Accessories", type: "Physical", price: 225, tag: "PREORDER", image: "products/sserc-notebook.png", code: "SSERC / 004" },
  { id: 5, name: "S.S.E.R.C. Mission Lanyard", nl: "S.S.E.R.C. Mission Lanyard", descEn: "Navy printed lanyard with a metal hook and detachable buckle.", descNl: "Bedrukte marineblauwe lanyard met metalen haak en afneembare gesp.", category: "Accessories", type: "Physical", price: 175, tag: "PREORDER", image: "products/sserc-lanyard.png", code: "SSERC / 005" },
  { id: 6, name: "S.S.E.R.C. Space Sticker Pack", nl: "S.S.E.R.C. Space Sticker Pack", descEn: "A set of space-exploration themed S.S.E.R.C. stickers.", descNl: "Een set S.S.E.R.C.-stickers met ruimtevaartthema.", category: "Stickers", type: "Physical", price: 75, tag: "PREORDER", symbol: "✦", code: "SSERC / 006" }
];
const TEXT = {
  nl: {
    add:"+ IN WINKELTAS", added:"✓ TOEGEVOEGD", physical:"Fysiek", digital:"Digitaal", preorder:"PREORDER",
    empty:"Je winkelmand wacht op iets leuks.", noResults:"Geen producten gevonden. Probeer een andere zoekopdracht.",
    decrease:"Aantal verlagen", increase:"Aantal verhogen", remove:"Verwijderen",
    bankLabel:"Begunstigde", whatsappIntro:"Hallo Twilight Dusk Studios! Ik wil graag deze PREORDER plaatsen:",
    total:"TOTAAL PREORDER", payment:"BETALING: Bankoverschrijving", name:"NAAM", phone:"TELEFOON",
    email:"E-MAIL", none:"Niet opgegeven", delivery:"BEZORGING / DIGITALE LEVERING",
    notes:"Nog af te stemmen", proof:"BETALINGSBEWIJS: Ik heb het bestand geselecteerd. Ik voeg het handmatig toe aan dit WhatsApp-bericht.",
    verify:"Controleer alstublieft de betaling en bevestig mijn preorder. Ik begrijp dat de bestelling pas bevestigd is nadat de betaling is gecontroleerd.",
    setup:"Configuratie nodig: voeg eerst je echte WhatsApp-nummer toe in config.js.",
    chooseProof:"Selecteer eerst je bewijs van overboeking.", emptyCart:"Je winkelmand is leeg.",
    unsupported:"Ongeldig bestand. Kies een JPG, PNG of PDF.", tooLarge:"Het bestand is te groot. Maximum is 8 MB.",
    selected:"Geselecteerd", remember:"Vergeet niet het bestand in WhatsApp toe te voegen.",
    keepTab:"Houd dit tabblad open. Voeg het bestand toe in WhatsApp voordat je het bericht verstuurt.",
    whatsappOpened:"WhatsApp is geopend in een nieuw tabblad. Voeg je betalingsbewijs toe aan het gesprek en verstuur het bericht. Je winkelmand blijft hier bewaard.",
    missingProof:"Selecteer eerst je betalingsbewijs.", language:"nl"
  },
  en: {
    add:"+ ADD TO BAG", added:"✓ ADDED", physical:"Physical", digital:"Digital", preorder:"PREORDER",
    empty:"Your bag is waiting for something good.", noResults:"No products found. Try another search.",
    decrease:"Decrease quantity", increase:"Increase quantity", remove:"Remove",
    bankLabel:"Beneficiary", whatsappIntro:"Hello Twilight Dusk Studios! I'd like to place this PREORDER:",
    total:"PREORDER TOTAL", payment:"PAYMENT: Bank transfer", name:"NAME", phone:"PHONE",
    email:"EMAIL", none:"Not provided", delivery:"DELIVERY / DIGITAL DELIVERY",
    notes:"To be discussed", proof:"PAYMENT PROOF: I have selected this file. I will attach it manually to this WhatsApp message.",
    verify:"Please verify the transfer and confirm my preorder. I understand the order is only confirmed after payment has been verified.",
    setup:"Setup required: add your real WhatsApp number in config.js first.",
    chooseProof:"Please select your bank transfer proof first.", emptyCart:"Your bag is empty.",
    unsupported:"Unsupported file. Please choose a JPG, PNG or PDF.", tooLarge:"File is too large. Maximum size is 8 MB.",
    selected:"Selected", remember:"Remember to attach it in WhatsApp.",
    keepTab:"Keep this tab open. Attach the file in WhatsApp before sending your message.",
    whatsappOpened:"WhatsApp opened in a new tab. Attach your payment proof in the chat and send the message. Your cart remains here.",
    missingProof:"Please select your payment proof first.", language:"en"
  }
};
const $ = s => document.querySelector(s);
let cart = [];
let activeCategory = "All";
let language = localStorage.getItem("tds-language") || "nl";
const money = n => `${CONFIG.currency || "SRD"} ${Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;

function setLanguage(lang) {
  language = lang === "en" ? "en" : "nl";
  localStorage.setItem("tds-language", language);
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
  document.querySelectorAll("[data-lang]").forEach(b => b.classList.toggle("active", b.dataset.lang === language));
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (TEXT_PAGE[language][key] !== undefined) el.innerHTML = TEXT_PAGE[language][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (TEXT_PAGE[language][key] !== undefined) el.placeholder = TEXT_PAGE[language][key];
  });
  $("#searchInput").setAttribute("aria-label", language === "nl" ? "Zoek producten" : "Search products");
  $("#cartDrawer").setAttribute("aria-label", language === "nl" ? "Winkelmand" : "Shopping cart");
  $("#closeCart").setAttribute("aria-label", language === "nl" ? "Sluiten" : "Close");
  $("#bankInstructionsText").innerHTML = bankHtml();
  renderProducts(); renderCart();
}
const TEXT_PAGE = {
 nl: {
  announcement:"✦ TWILIGHT DUSK STUDIOS • ONAFHANKELIJK • PARAMARIBO, SURINAME ✦",navShop:"SHOP",navAbout:"OVER MIJ",navContact:"CONTACT",bag:"WINKELTAS",
  eyebrow:"GOEDE VONDSTEN, GOEDE SFEER",heroTitle:"GOEDE VONDSTEN.<br><span>GOEDE VIBES.</span>",heroDescription:"Een eigenzinnige plek op het internet voor bijzondere items. Ontdek de nieuwste releases van Twilight Dusk Studios.",explore:"ONTDEK DE WEBSHOP",
  newDrop:"NIEUWE<br>DROP<br><b>/// 026</b>",artCaption:"OBJECTEN<br>MET KARAKTER<span>✳</span>",ticker:"NIEUWE VONDSTEN <b>✳</b> EENVOUDIG BESTELLEN <b>✳</b> LOKALE LIEFDE <b>✳</b> NIEUWE VONDSTEN <b>✳</b> EENVOUDIG BESTELLEN <b>✳</b> LOKALE LIEFDE <b>✳</b>",
  collection:"DE COLLECTIE / 001",latest:"DE NIEUWSTE <span>DROP.</span>",searchPlaceholder:"Zoek iets...",catAll:"ALLES",catApparel:"KLEDING",catAccessories:"ACCESSOIRES",catStickers:"STICKERS",catDigital:"DIGITAAL",
  aboutEyebrow:"EEN KLEINE STUDIO MET GROTE ENERGIE",aboutTitle:"NIET ZOMAAR<br>EEN WEBSHOP.",aboutBlurb:"Twilight Dusk Studios brengt fysieke en digitale producten samen met een eigen retro-uitstraling. Ontdek het verhaal achter de studio.",
  needHelp:"HULP NODIG?",letsTalk:"LATEN WE PRATEN.",contactBlurb:"Heb je een vraag over een product of preorder? Neem gerust contact op.",contactStore:"NEEM CONTACT OP",madeIn:"GEMAAKT MET ✳ IN SURINAME",
  yourSelection:"JOUW SELECTIE",yourBag:"JOUW WINKELTAS",subtotal:"TOTAAL (INCL. BTW)",vatIncluded:"Waarvan 10% BTW",deliveryNote:"Eventuele bezorgkosten worden vóór betaling met je bevestigd.",continueCheckout:"DOORGAAN NAAR AFREKENEN",
  almostThere:"BIJNA KLAAR",checkout:"AFREKENEN.",fullName:"VOLLEDIGE NAAM",phone:"TELEFOON / WHATSAPP",email:"E-MAIL",optional:"(OPTIONEEL)",deliveryDetails:"BEZORGING / DIGITALE LEVERING",deliveryPlaceholder:"Adres, ophaalgegevens of e-mailadres voor digitale levering",
  bankTransfer:"BETALING / BANKOVERSCHRIJVING",bankNote:"Maak het exacte orderbedrag over. Je preorder is pas bevestigd nadat de betaling is gecontroleerd.",uploadProof:"BEWIJS VAN OVERBOEKING UPLOADEN",fileRequired:"VERPLICHT · JPG, PNG OF PDF",uploadHelp:"Kies een duidelijke screenshot, foto of PDF-bon. Maximaal 8 MB.",noFile:"Nog geen bewijs geselecteerd.",orderTotal:"TOTAAL PREORDER",continueWhatsapp:"VERDER NAAR WHATSAPP",whatsappAttach:"Nadat WhatsApp opent, voeg je het bewijsbestand handmatig toe aan het gesprek en verstuur je het bericht. Het bestand wordt niet automatisch geüpload of bijgevoegd."
 },
 en: {
  announcement:"✦ TWILIGHT DUSK STUDIOS • INDEPENDENT • PARAMARIBO, SURINAME ✦",navShop:"SHOP",navAbout:"ABOUT ME",navContact:"CONTACT",bag:"BAG",
  eyebrow:"GOOD FINDS, GOOD VIBES",heroTitle:"GOOD FINDS.<br><span>GOOD VIBES.</span>",heroDescription:"An independent corner of the internet for things worth keeping. Discover the latest releases from Twilight Dusk Studios.",explore:"EXPLORE THE STORE",
  newDrop:"NEW<br>DROP<br><b>/// 026</b>",artCaption:"OBJECTS<br>WITH CHARACTER<span>✳</span>",ticker:"FRESH FINDS <b>✳</b> EASY CHECKOUT <b>✳</b> LOCAL LOVE <b>✳</b> FRESH FINDS <b>✳</b> EASY CHECKOUT <b>✳</b> LOCAL LOVE <b>✳</b>",
  collection:"THE COLLECTION / 001",latest:"THE LATEST <span>DROP.</span>",searchPlaceholder:"Find something...",catAll:"ALL ITEMS",catApparel:"APPAREL",catAccessories:"ACCESSORIES",catStickers:"STICKERS",catDigital:"DIGITAL",
  aboutEyebrow:"A SMALL STUDIO WITH BIG ENERGY",aboutTitle:"NOT JUST ANOTHER<br>ONLINE STORE.",aboutBlurb:"Twilight Dusk Studios brings physical and digital products together with its own retro-inspired identity. Discover the story behind the studio.",
  needHelp:"NEED A HAND?",letsTalk:"LET'S TALK.",contactBlurb:"Questions about a product or preorder? Feel free to get in touch.",contactStore:"CONTACT THE STUDIO",madeIn:"MADE WITH ✳ IN SURINAME",
  yourSelection:"YOUR SELECTION",yourBag:"YOUR BAG",subtotal:"TOTAL (VAT INCL.)",vatIncluded:"Including 10% VAT",deliveryNote:"Any delivery fees will be confirmed with you before payment.",continueCheckout:"CONTINUE TO CHECKOUT",
  almostThere:"ALMOST THERE",checkout:"CHECKOUT.",fullName:"FULL NAME",phone:"PHONE / WHATSAPP",email:"EMAIL",optional:"(OPTIONAL)",deliveryDetails:"DELIVERY / DIGITAL DELIVERY",deliveryPlaceholder:"Address, pickup details or email for digital delivery",
  bankTransfer:"PAYMENT / BANK TRANSFER ONLY",bankNote:"Transfer the exact order total. Your preorder is only confirmed after payment has been verified.",uploadProof:"UPLOAD PROOF OF TRANSFER",fileRequired:"REQUIRED · JPG, PNG OR PDF",uploadHelp:"Choose a clear screenshot, photo or PDF receipt. Maximum 8 MB.",noFile:"No proof selected yet.",orderTotal:"PREORDER TOTAL",continueWhatsapp:"CONTINUE TO WHATSAPP",whatsappAttach:"After WhatsApp opens, manually attach the proof file to the chat and send the message. The file is not automatically uploaded or attached."
 }
};
function bankHtml() {
 const accounts = (CONFIG.bankAccounts || []).map(a => `<div class="bank-account"><strong>${a.bank}</strong><span>${a.account}</span></div>`).join("");
 const beneficiary = language === "nl" ? "Begunstigde" : "Beneficiary";
 return `${accounts}<div class="bank-beneficiary"><strong>${beneficiary}:</strong> ${CONFIG.beneficiary || ""}</div>`;
}
function renderProducts() {
 const term = ($("#searchInput").value || "").trim().toLowerCase();
 const visible = PRODUCTS.filter(p => (activeCategory === "All" || p.category === activeCategory) && `${p.name} ${p.nl} ${p.category}`.toLowerCase().includes(term));
 $("#productGrid").innerHTML = visible.length ? visible.map(p => `
  <article class="product-card"><div class="product-art product-photo">${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}${p.image ? `<img src="${p.image}" alt="${language === "nl" ? p.nl : p.name}" loading="lazy">` : `<div class="sticker-placeholder"><span>✦</span><b>S.S.E.R.C.</b><small>SPACE STICKER PACK</small></div>`}<span class="art-code">${p.code}</span></div>
  <div class="product-info"><h3>${language === "nl" ? p.nl : p.name}</h3><p class="product-description">${language === "nl" ? p.descNl : p.descEn}</p><small class="fulfillment-label">${p.type === "Digital" ? TEXT[language].digital : TEXT[language].physical} · ${TEXT[language].preorder}</small>
  <div class="product-bottom"><span class="product-price">${money(p.price)} <small class="vat-included">${language === "nl" ? "incl. BTW" : "incl. VAT"}</small></span><button class="add-button" data-add="${p.id}">${TEXT[language].add}</button></div></div></article>`).join("") : `<p class="no-results">${TEXT[language].noResults}</p>`;
}
function total(){return cart.reduce((s,i)=>s+i.price*i.qty,0);}
function renderCart(){
 const count=cart.reduce((s,i)=>s+i.qty,0);
 $("#cartCount").textContent=count; $("#drawerCount").textContent=`(${count})`;
 $("#cartSubtotal").textContent=money(total()); $("#checkoutTotal").textContent=money(total());
 $("#cartVat").textContent=money(total()/11); $("#checkoutVat").textContent=money(total()/11);
 $("#cartItems").innerHTML=cart.length?cart.map(i=>`<div class="cart-line"><div class="cart-thumb">${i.symbol}</div><div><h4>${language==="nl"?i.nl:i.name}</h4><small>${money(i.price)} ${language==="nl"?"PER STUK":"EACH"}</small><div class="qty-controls"><button data-qty="${i.id}" data-delta="-1" aria-label="${TEXT[language].decrease}">−</button><span>${i.qty}</span><button data-qty="${i.id}" data-delta="1" aria-label="${TEXT[language].increase}">+</button></div></div><button class="remove-button" data-remove="${i.id}" aria-label="${TEXT[language].remove}">×</button></div>`).join(""):`<p class="empty-cart">${TEXT[language].empty}</p>`;
 $("#checkoutButton").disabled=!cart.length; $("#checkoutButton").style.opacity=cart.length?"1":".45";
}
function openCart(){$("#cartDrawer").classList.add("open");$("#drawerBackdrop").classList.add("open");$("#cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#drawerBackdrop").classList.remove("open");$("#cartDrawer").setAttribute("aria-hidden","true");}

document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setLanguage(b.dataset.lang)));
$("#productGrid").addEventListener("click",e=>{
 const btn=e.target.closest("[data-add]");if(!btn)return;
 const p=PRODUCTS.find(x=>x.id===Number(btn.dataset.add));const old=cart.find(x=>x.id===p.id);
 old?old.qty++:cart.push({...p,qty:1});renderCart();btn.textContent=TEXT[language].added;setTimeout(()=>{if(btn.isConnected)btn.textContent=TEXT[language].add;},900);
});
$("#cartItems").addEventListener("click",e=>{
 const q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");
 if(q){const item=cart.find(x=>x.id===Number(q.dataset.qty));item.qty+=Number(q.dataset.delta);if(item.qty<=0)cart=cart.filter(x=>x.id!==item.id);}
 if(r)cart=cart.filter(x=>x.id!==Number(r.dataset.remove));renderCart();
});
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#drawerBackdrop").addEventListener("click",closeCart);
$("#checkoutButton").addEventListener("click",()=>{if(!cart.length)return;closeCart();$("#bankInstructionsText").innerHTML=bankHtml();$("#checkoutDialog").showModal();});
$("#searchInput").addEventListener("input",renderProducts);
$("#categories").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".category").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
$("#themeToggle").addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=next;localStorage.setItem("tds-theme",next);$("#themeToggle").textContent=next==="light"?"☾":"☼";});
const savedTheme=localStorage.getItem("tds-theme");if(savedTheme)document.documentElement.dataset.theme=savedTheme;$("#themeToggle").textContent=document.documentElement.dataset.theme==="light"?"☾":"☼";
$("#contactLink").href=`mailto:${CONFIG.contactEmail||"hello@example.com"}`;$("#year").textContent=new Date().getFullYear();
$("#paymentProof").addEventListener("change",e=>{
 const f=e.target.files&&e.target.files[0],status=$("#fileStatus");if(!f){status.textContent=TEXT_PAGE[language].noFile;return;}
 if(!["image/jpeg","image/png","application/pdf"].includes(f.type)){e.target.value="";status.textContent=TEXT[language].unsupported;return;}
 if(f.size>8*1024*1024){e.target.value="";status.textContent=TEXT[language].tooLarge;return;}
 status.textContent=`${TEXT[language].selected}: ${f.name} · ${(f.size/1024/1024).toFixed(2)} MB. ${TEXT[language].remember}`;
});
$("#checkoutForm").addEventListener("submit",e=>{
 e.preventDefault();const error=$("#formError");error.textContent="";
 if(!cart.length){error.textContent=TEXT[language].emptyCart;return;}
 const proof=$("#paymentProof").files&&$("#paymentProof").files[0];if(!proof){error.textContent=TEXT[language].chooseProof;return;}
 const data=new FormData(e.currentTarget);
 const lines=cart.map(i=>`• ${language==="nl"?i.nl:i.name} × ${i.qty} — ${money(i.price*i.qty)} (${i.type})`).join("\n");
 const message=[
 TEXT[language].whatsappIntro,"",lines,"",`${TEXT[language].total}: ${money(total())} (incl. 10% ${language==="nl"?"BTW":"VAT"})`,
 `${language==="nl"?"Waarvan BTW":"VAT included"}: ${money(total()/11)}`,TEXT[language].payment,
 `${TEXT[language].name}: ${data.get("name")}`,`${TEXT[language].phone}: ${data.get("phone")}`,
 `${TEXT[language].email}: ${data.get("email")||TEXT[language].none}`,`${TEXT[language].delivery}: ${data.get("notes")||TEXT[language].notes}`,
 "",`${TEXT[language].proof} (${proof.name})`,"",TEXT[language].verify
 ].join("\n");
 const number=(CONFIG.whatsappNumber||"").replace(/\D/g,"");
 if(!number||number==="59700000000"){error.textContent=TEXT[language].setup;return;}
 window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,"_blank","noopener");
 $("#fileStatus").textContent=TEXT[language].keepTab;
 error.textContent=TEXT[language].whatsappOpened;
});
setLanguage(language);
