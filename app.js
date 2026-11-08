import "./dialog.css";
import "./buttons.css";

const cars = [
  { id: 1, make: "Porsche", body: "Sedan", fuel: "Electric", year: "2026", status: "Available", name: "Porsche GT-6 Black Edition", displayName: "GT-6 Black Edition", spec: "Obsidian satin · 4-door", price: 215000, lease: 2190, acceleration: "2.4 sec", powertrain: "Tri-Motor EV", range: "720 km", imageUrl: "/vehicles/gt-6-black-edition.png", imageAlt: "Black Porsche GT-6 driving along the coast at dusk", copy: "Engineered for sustained autobahn sweeps and immediate torque vectoring. Equipped with dual-chamber air suspension, rear-axle steering, and carbon ceramic stopping hardware." },
  { id: 2, make: "Marinello", body: "Coupe", fuel: "V8", year: "2025", status: "Available", name: "V8 Centurion Grand Tourer", displayName: "V8 Centurion Grand Tourer", spec: "Argento Nürburgring · coupe", price: 189500, lease: 1920, acceleration: "3.8 sec", powertrain: "Manual V8", range: "610 km", imageUrl: "/vehicles/v8-centurion-grand-tourer.png", imageAlt: "Silver V8 Centurion Grand Tourer in a modern showroom", copy: "Pure auditory symphony. Naturally aspirated 6.5L power unit with rev limit capped at 8,900 RPM. Dry-sump lubrication and carbon-titanium anti-roll bars tuned for continental crossing." },
  { id: 3, make: "Stratos", body: "Coupe", fuel: "Flat-6", year: "2025", status: "Track ready", name: "Hyperion Coupe 4.0", displayName: "Hyperion Coupe 4.0", spec: "Copper sunset · track coupe", price: 275000, lease: 2780, acceleration: "3.1 sec", powertrain: "4.0L Flat-6", range: "510 km", imageUrl: "/vehicles/hyperion-coupe-4-0.png", imageAlt: "Copper Hyperion Coupe parked beside the coast at sunset", copy: "Full carbon fiber bonnet with negative-pressure extraction ducts, 3-way adjustable Öhlins coilovers and factory high-downforce swan-neck wing producing 480 KG downforce at 240 KM/H." },
  { id: 4, make: "Obsidian", body: "Roadster", fuel: "V8", year: "2025", status: "Available", name: "Obsidian Roadster GT-S", displayName: "Obsidian Roadster GT-S", spec: "Carbon KERS · roadster", price: 139900, lease: 1480, acceleration: "3.2 sec", powertrain: "Twin-Turbo V8", range: "540 km", imageUrl: "/vehicles/obsidian-roadster-kers.png", imageAlt: "Black Obsidian Roadster with yellow accents in a race workshop", copy: "Direct Formula-derived kinetic recovery and precision mechanical calibration. Review every chassis and specification detail before commitment." },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
let mode = "buy";
let term = 24;

function toast(text) { $("#toast").textContent = text; $("#toast").classList.add("show"); window.setTimeout(() => $("#toast").classList.remove("show"), 3000); }
function carById(id) { return cars.find((car) => car.id === Number(id)); }

function renderCars() {
  const query = $("#search").value.toLowerCase();
  const limit = Number($("#budget").value);
  const filters = ["make", "body", "fuel", "year", "status"].reduce((values, id) => ({ ...values, [id]: $(`#${id}`).value }), {});
  const list = cars.filter((car) => Object.entries(filters).every(([key, value]) => value === "all" || car[key] === value) && car.price <= limit && `${car.name} ${car.make} ${car.spec}`.toLowerCase().includes(query));
  $("#results-message").textContent = `Showing ${list.length} vehicles`;
  $("#vehicle-list").innerHTML = list.length ? list.map((car, index) => `<article class="vehicle ${index % 2 ? "reverse" : ""}"><div class="vehicle-image"><img src="${car.imageUrl}" alt="${car.imageAlt}" loading="lazy"><span>VIN # ${String(car.id).padStart(3, "0")}VAULT${car.year}</span><b>${car.status}</b></div><div class="vehicle-copy"><p>${String(car.id).padStart(2, "0")} // ${car.make} atelier <em>${car.spec}</em></p><h3>${car.displayName}</h3><small>${car.year} Model Year · ${car.fuel} high-performance architecture</small><p>${car.copy}</p><div class="stats"><span>0–100 km/h<b>${car.acceleration}</b></span><span>Powertrain<b>${car.powertrain}</b></span><span>Range<b>${car.range}</b></span></div><div class="vehicle-price"><span>Acquisition price<b>${money(car.price)}</b></span><span>Estimated lease:<b>${money(car.lease)} / mo</b></span></div><div class="buttons"><button class="acid" data-action="book" data-car-id="${car.id}">Book test drive</button><button class="secondary" data-action="rent" data-car-id="${car.id}">Rent this vehicle</button></div><div class="sub-buttons"><button data-action="finance" data-car-id="${car.id}">Calc financing</button><button data-action="sticker" data-car-id="${car.id}">Window sticker</button><button data-scroll="trade">Trade-in value</button></div></div></article>`).join("") : '<p class="empty">No vehicles match these filters. Reset filters to see the full fleet.</p>';
}

function updatePayment() {
  const capital = Math.max(0, Number($("#capital").value) || 0), down = Math.min(capital, Number($("#down").value) || 0), rate = Number($("#apr").value) / 100 / 12, balance = capital - down;
  $("#payment-value").textContent = money(rate ? balance * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : balance / term);
  $("#apr-value").textContent = `${$("#apr").value}%`;
}

function selectFinance(car) { $("#capital").value = car.price; $("#down").value = Math.round(car.price * 0.2); $("#finance-form header b").textContent = car.name; updatePayment(); $("#finance").scrollIntoView({ behavior: "smooth" }); }

function createDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "vehicle-dialog";
  dialog.setAttribute("aria-labelledby", "dialog-title");
  dialog.innerHTML = '<div class="dialog-panel"><button class="dialog-close" type="button" aria-label="Close dialog">×</button><div class="dialog-content"></div></div>';
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("submit", (event) => { event.preventDefault(); const kind = event.target.dataset.requestKind; dialog.close(); toast(`${kind} request prepared for concierge review — no data was sent.`); });
  document.body.append(dialog);
  return dialog;
}

const dialog = createDialog();
function openRequest(car, kind) {
  const rental = kind === "Rental";
  dialog.querySelector(".dialog-content").innerHTML = `<p class="eyebrow">${rental ? "Track rental desk" : "Showroom concierge"}</p><h2 id="dialog-title">${rental ? "Request rental availability" : "Book a test drive"}</h2><p class="dialog-intro">${car.name} · ${car.spec}</p><form data-request-kind="${kind}"><label>Your name<input name="name" required autocomplete="name"></label><label>Email address<input name="email" type="email" required autocomplete="email"></label><label>${rental ? "Preferred rental start" : "Preferred appointment"}<input name="date" type="date" required></label><label>Notes <textarea name="notes" rows="3" placeholder="Preferred time or requirements"></textarea></label><button class="acid" type="submit">Prepare ${rental ? "rental" : "test-drive"} request →</button></form><p class="dialog-note">Demo only: submitting does not send or store your details.</p>`;
  dialog.showModal();
}
function openSticker(car) {
  dialog.querySelector(".dialog-content").innerHTML = `<p class="eyebrow">Digital Monroney // verified</p><h2 id="dialog-title">${car.name}</h2><p class="dialog-intro">${car.year} · ${car.spec} · VIN # ${String(car.id).padStart(3, "0")}VAULT${car.year}</p><img class="sticker-image" src="${car.imageUrl}" alt="${car.imageAlt}"><dl class="sticker-specs"><div><dt>Acquisition price</dt><dd>${money(car.price)}</dd></div><div><dt>Estimated lease</dt><dd>${money(car.lease)} / month</dd></div><div><dt>Acceleration</dt><dd>0–100 km/h in ${car.acceleration}</dd></div><div><dt>Powertrain</dt><dd>${car.powertrain}</dd></div><div><dt>Range</dt><dd>${car.range}</dd></div><div><dt>Allocation status</dt><dd>${car.status}</dd></div></dl>`;
  dialog.showModal();
}

$$("[data-mode]").forEach((button) => button.addEventListener("click", () => { mode = button.dataset.mode; $$('[data-mode]').forEach((item) => item.classList.toggle("active", item.dataset.mode === mode)); $("#mode-copy").textContent = mode === "buy" ? "↪ Dynamic inventory pricing active" : "↪ Private track-day availability active"; renderCars(); }));
$$("[data-scroll]").forEach((button) => button.addEventListener("click", () => $(`#${button.dataset.scroll}`).scrollIntoView({ behavior: "smooth" })));
["search", "make", "body", "fuel", "year", "status", "budget"].forEach((id) => $("#" + id).addEventListener(["make", "body", "fuel", "year", "status"].includes(id) ? "change" : "input", () => { if (id === "budget") $("#budget-value").textContent = money(Number($("#budget").value)); renderCars(); }));
$("#reset").addEventListener("click", () => { ["make", "body", "fuel", "year", "status"].forEach((id) => $("#" + id).value = "all"); $("#search").value = ""; $("#budget").value = 380000; $("#budget-value").textContent = "$380,000"; renderCars(); });
$$("[data-term]").forEach((button) => button.addEventListener("click", () => { term = Number(button.dataset.term); $$('[data-term]').forEach((item) => item.classList.toggle("active", item === button)); updatePayment(); }));
["capital", "down", "apr"].forEach((id) => $("#" + id).addEventListener("input", updatePayment));
$("#finance-form").addEventListener("submit", (event) => { event.preventDefault(); toast("Rate request prepared for concierge review — no data was sent."); });
$("#trade-form").addEventListener("submit", (event) => { event.preventDefault(); toast("Certified valuation request prepared for review — no data was sent."); });
$(".menu-toggle").addEventListener("click", (event) => { const open = event.currentTarget.getAttribute("aria-expanded") === "true"; event.currentTarget.setAttribute("aria-expanded", String(!open)); $("#main-nav").classList.toggle("open", !open); });
document.addEventListener("click", (event) => { const action = event.target.closest("[data-action]"); if (!action) return; const car = carById(action.dataset.carId); if (!car) { toast(`${action.dataset.action} selected — concierge request prepared.`); return; } if (action.dataset.action === "book") openRequest(car, "Test-drive"); if (action.dataset.action === "rent") openRequest(car, "Rental"); if (action.dataset.action === "finance") selectFinance(car); if (action.dataset.action === "sticker") openSticker(car); });

renderCars();
updatePayment();
