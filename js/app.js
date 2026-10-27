(() => {
  const $ = (sel, el = document) => el.querySelector(sel);
  const money = (n) => STORE.currency + Number(n).toLocaleString("en-IN");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const state = { cat: "All", q: "", sort: "featured", cart: loadCart(), slide: 0 };
  const byId = (id) => PRODUCTS.find((p) => p.id === Number(id));

  /* ---------- storage ---------- */
  function loadCart() {
    try { return JSON.parse(localStorage.getItem("store-cart") || "[]"); } catch { return []; }
  }
  function saveCart() {
    try { localStorage.setItem("store-cart", JSON.stringify(state.cart)); } catch { /* ignore */ }
  }

  /* ---------- placeholder image (used when image is empty or missing) ---------- */
  function placeholder(p) {
    const hues = { Handbags: 335, Jewellery: 42, Wallets: 20, Kids: 190, Stationery: 260, Gifts: 300 };
    const h = hues[p.category] ?? 280;
    const initials = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${h},70%,88%)"/><stop offset="1" stop-color="hsl(${h},60%,72%)"/>
      </linearGradient></defs>
      <rect width="400" height="400" fill="url(#g)"/>
      <text x="200" y="225" font-family="Georgia,serif" font-size="110" font-weight="700" text-anchor="middle" fill="hsl(${h},45%,30%)">${initials}</text>
    </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  const imgSrc = (p) => p.image || placeholder(p);
  const imgTag = (p, alt) =>
    `<img src="${esc(imgSrc(p))}" alt="${esc(alt || p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${placeholder(p).replace(/'/g, "%27")}'">`;

  const discount = (p) => (p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0);

  /* ---------- WhatsApp ---------- */
  function waLink(text) {
    return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
  }
  function orderNow(p, color) {
    const msg = `Hi ${STORE.name}, I want to order:\n${p.name}${color ? " (" + color + ")" : ""}\nPrice: ${money(p.price)}`;
    window.open(waLink(msg), "_blank", "noopener");
  }

  /* ---------- hero slider ---------- */
  function initSlider() {
    const wrap = $("#slides");
    const dots = $("#dots");
    wrap.innerHTML = STORE.slides.map((s, i) => `
      <article class="slide ${i === 0 ? "active" : ""}" aria-hidden="${i !== 0}">
        <h1>${esc(s.title)}</h1>
        <p>${esc(s.text)}</p>
        <button class="btn" type="button" data-go-cat="${esc(s.category)}">${esc(s.cta)}</button>
      </article>`).join("");
    dots.innerHTML = STORE.slides.map((s, i) =>
      `<button class="dot" type="button" role="tab" aria-label="Slide ${i + 1}" aria-selected="${i === 0}" data-slide="${i}"></button>`).join("");

    const show = (n) => {
      state.slide = (n + STORE.slides.length) % STORE.slides.length;
      wrap.querySelectorAll(".slide").forEach((el, i) => {
        el.classList.toggle("active", i === state.slide);
        el.setAttribute("aria-hidden", i !== state.slide);
      });
      dots.querySelectorAll(".dot").forEach((el, i) => el.setAttribute("aria-selected", i === state.slide));
    };
    dots.addEventListener("click", (e) => {
      const b = e.target.closest("[data-slide]");
      if (b) show(Number(b.dataset.slide));
    });
    wrap.addEventListener("click", (e) => {
      const b = e.target.closest("[data-go-cat]");
      if (b) { setCategory(b.dataset.goCat); $("#shop").scrollIntoView(); }
    });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && STORE.slides.length > 1) setInterval(() => show(state.slide + 1), 5500);
  }

  /* ---------- categories + product grid ---------- */
  function renderCats() {
    const all = ["All", ...CATEGORIES];
    $("#cats").innerHTML = all.map((c) =>
      `<button class="chip" type="button" data-cat="${esc(c)}" aria-pressed="${c === state.cat}">${esc(c)}</button>`).join("");
  }
  function setCategory(c) {
    state.cat = c;
    renderCats();
    renderGrid();
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    let list = PRODUCTS.filter((p) =>
      (state.cat === "All" || p.category === state.cat) &&
      (!q || (p.name + " " + p.category + " " + p.colors.join(" ") + " " + p.description).toLowerCase().includes(q)));
    if (state.sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (state.sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (state.sort === "discount") list = [...list].sort((a, b) => discount(b) - discount(a));
    return list;
  }

  function renderGrid() {
    const list = filtered();
    $("#shopTitle").textContent = state.cat === "All" ? "All products" : state.cat;
    $("#resultCount").textContent = `${list.length} ${list.length === 1 ? "product" : "products"}`;
    $("#grid").innerHTML = list.length ? list.map((p) => `
      <article class="card">
        <button class="card-img" type="button" data-open="${p.id}" aria-label="View ${esc(p.name)}">
          ${imgTag(p)}
          ${discount(p) ? `<span class="badge">${discount(p)}% off</span>` : ""}
        </button>
        <div class="card-body">
          <p class="card-cat">${esc(p.category)}</p>
          <button class="card-name" type="button" data-open="${p.id}">${esc(p.name)}</button>
          <div class="price"><strong>${money(p.price)}</strong>${p.mrp > p.price ? `<s>${money(p.mrp)}</s>` : ""}</div>
          <div class="swatches">${esc(p.colors.join(", "))}</div>
          <div class="card-actions">
            <button class="btn btn-dark" type="button" data-add="${p.id}">Add to cart</button>
            <button class="btn btn-wa" type="button" data-order="${p.id}">Order now</button>
          </div>
        </div>
      </article>`).join("")
      : `<p class="empty">No products match your search. Try a different word or category.</p>`;
  }

  /* ---------- product dialog ---------- */
  function openProduct(id) {
    const p = byId(id);
    if (!p) return;
    $("#productBody").innerHTML = `
      <div class="modal-img">${imgTag(p)}</div>
      <div class="modal-info">
        <p class="card-cat">${esc(p.category)}</p>
        <h3 id="pdName">${esc(p.name)}</h3>
        <div class="price"><strong>${money(p.price)}</strong>${p.mrp > p.price ? `<s>${money(p.mrp)}</s> <span class="badge" style="position:static">${discount(p)}% off</span>` : ""}</div>
        <p>${esc(p.description)}</p>
        <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <p class="opt-label">Colour</p>
        <div class="colors" role="radiogroup" aria-label="Colour">
          ${p.colors.map((c, i) => `<label><input type="radio" name="color" value="${esc(c)}" ${i === 0 ? "checked" : ""}><span>${esc(c)}</span></label>`).join("")}
        </div>
        <div class="modal-actions">
          <button class="btn btn-dark" type="button" data-modal-add="${p.id}">Add to cart</button>
          <button class="btn btn-wa" type="button" data-modal-order="${p.id}">Order on WhatsApp</button>
        </div>
      </div>`;
    $("#productDialog").showModal();
  }
  const chosenColor = () => {
    const el = $("#productBody input[name=color]:checked");
    return el ? el.value : "";
  };

  /* ---------- cart ---------- */
  function addToCart(id, color) {
    const p = byId(id);
    if (!p) return;
    const col = color || p.colors[0] || "";
    const row = state.cart.find((r) => r.id === p.id && r.color === col);
    if (row) row.qty += 1; else state.cart.push({ id: p.id, color: col, qty: 1 });
    saveCart();
    renderCart();
    toast(`${p.name} added to cart`);
  }

  function renderCart() {
    const count = state.cart.reduce((n, r) => n + r.qty, 0);
    $("#cartCount").textContent = count;
    const total = state.cart.reduce((n, r) => n + (byId(r.id)?.price || 0) * r.qty, 0);
    $("#cartTotal").textContent = money(total);
    $("#checkoutBtn").disabled = !count;
    $("#cartList").innerHTML = count ? state.cart.map((r, i) => {
      const p = byId(r.id);
      if (!p) return "";
      return `
        <div class="cart-row">
          ${imgTag(p, "")}
          <div>
            <h3>${esc(p.name)}</h3>
            <small>${esc(r.color)} &middot; ${money(p.price)}</small>
            <div class="qty">
              <button type="button" data-dec="${i}" aria-label="Decrease quantity">-</button>
              <span>${r.qty}</span>
              <button type="button" data-inc="${i}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="remove" type="button" data-remove="${i}">Remove</button>
        </div>`;
    }).join("") : `<p class="cart-empty">Your cart is empty. Add something you like.</p>`;
  }

  function checkout() {
    if (!state.cart.length) return;
    const lines = state.cart.map((r, i) => {
      const p = byId(r.id);
      return `${i + 1}. ${p.name}${r.color ? " (" + r.color + ")" : ""} x ${r.qty} = ${money(p.price * r.qty)}`;
    });
    const total = state.cart.reduce((n, r) => n + byId(r.id).price * r.qty, 0);
    const msg = `Hi ${STORE.name}, I want to order:\n${lines.join("\n")}\nTotal: ${money(total)}\n\nMy name:\nDelivery address:`;
    window.open(waLink(msg), "_blank", "noopener");
  }

  /* ---------- small helpers ---------- */
  let toastTimer;
  function toast(text) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = text;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 1800);
  }

  function fillStoreInfo() {
    document.title = `${STORE.name} | ${STORE.tagline}`;
    $("#brandName").textContent = STORE.name;
    $("#profileStoreName").textContent = STORE.name;
    $("#profileTagline").textContent = STORE.tagline;
    const initials = STORE.name.split(/\\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "S";
    $("#storeLogoFallback").textContent = initials;
    if (STORE.logo) {
      const logo = $("#storeLogo");
      logo.src = STORE.logo;
      logo.alt = `${STORE.name} logo`;
      logo.hidden = false;
      logo.addEventListener("error", () => { logo.hidden = true; }, { once: true });
      logo.addEventListener("load", () => { $("#storeLogoFallback").hidden = true; }, { once: true });
    }
    const phoneDigits = String(STORE.phone || STORE.whatsapp || "").replace(/[^+\\d]/g, "");
    $("#profilePhone").href = phoneDigits ? `tel:${phoneDigits}` : "#";
    $("#profilePhone").hidden = !phoneDigits;
    $("#profileWhatsApp").href = waLink(`Hi ${STORE.name}, I have a question.`);
    $("#profileMap").href = STORE.mapLink || "https://maps.google.com";
    $("#profileGoogleReview").href = STORE.googleReview || "#";
    $("#profileGoogleReview").hidden = !STORE.googleReview || STORE.googleReview === "https://g.page/r/";
    $("#waFloat").href = waLink(`Hi ${STORE.name}, I have a question.`);
    $("#contact").innerHTML = `
      <a href="${waLink("Hi " + STORE.name)}" target="_blank" rel="noopener">WhatsApp: ${esc(STORE.phoneDisplay)}</a>
      <a href="mailto:${esc(STORE.email)}">Email: ${esc(STORE.email)}</a>
      <a href="${esc(STORE.mapLink)}" target="_blank" rel="noopener">Visit: ${esc(STORE.address)}</a>
      <a href="${esc(STORE.instagram)}" target="_blank" rel="noopener">Instagram</a>`;
    $("#footerText").textContent = `© ${new Date().getFullYear()} ${STORE.name}. ${STORE.tagline}.`;
  }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    const t = e.target;
    const get = (attr) => t.closest(`[${attr}]`);
    let el;
    if ((el = get("data-cat"))) return setCategory(el.dataset.cat);
    if ((el = get("data-open"))) return openProduct(el.dataset.open);
    if ((el = get("data-add"))) return addToCart(el.dataset.add);
    if ((el = get("data-order"))) { const p = byId(el.dataset.order); return orderNow(p, p.colors[0]); }
    if ((el = get("data-modal-add"))) { addToCart(el.dataset.modalAdd, chosenColor()); return $("#productDialog").close(); }
    if ((el = get("data-modal-order"))) return orderNow(byId(el.dataset.modalOrder), chosenColor());
    if ((el = get("data-inc"))) { state.cart[el.dataset.inc].qty += 1; saveCart(); return renderCart(); }
    if ((el = get("data-dec"))) {
      const row = state.cart[el.dataset.dec];
      row.qty -= 1;
      if (row.qty <= 0) state.cart.splice(el.dataset.dec, 1);
      saveCart(); return renderCart();
    }
    if ((el = get("data-remove"))) { state.cart.splice(el.dataset.remove, 1); saveCart(); return renderCart(); }
    if (get("data-close")) return t.closest("dialog").close();
    // click on the dialog backdrop closes it
    if (t.tagName === "DIALOG") t.close();
  });

  $("#openCart").addEventListener("click", () => { renderCart(); $("#cartDialog").showModal(); });
  $("#checkoutBtn").addEventListener("click", checkout);
  $("#clearCart").addEventListener("click", () => { state.cart = []; saveCart(); renderCart(); });
  $("#searchInput").addEventListener("input", (e) => { state.q = e.target.value; renderGrid(); });
  $("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });

  /* ---------- start ---------- */
  fillStoreInfo();
  initSlider();
  renderCats();
  renderGrid();
  renderCart();
})();
