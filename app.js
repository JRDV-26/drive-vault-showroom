import "./dialog.css";
import "./buttons.css";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

const cars = [
  {
    id: 1,
    year: "2024",
    status: "Model reference",
    name: "Koenigsegg Jesko Attack",
    displayName: "Koenigsegg Jesko Attack",
    spec: "Track-focused megacar · two seats",
    imageUrl: "/vehicles/jesko-attack-real.png",
    imageAlt: "Koenigsegg Jesko Attack in a dark studio setting",
    copy: "The Jesko Attack is the circuit-focused expression of the Jesko programme, pairing active aerodynamics with a carbon-fibre monocoque and a 9-speed Light Speed Transmission.",
    specifications: [
      ["Power output", "1,600 hp on E85"],
      ["Engine", "5.0L twin-turbo V8"],
      ["Transmission", "9-speed Light Speed Transmission"],
      ["Maximum downforce", "1,400 kg"],
      ["Curb weight", "1,420 kg"],
      ["Production", "125 Jesko Attack and Absolut combined"],
    ],
  },
  {
    id: 2,
    year: "2025",
    status: "Model reference",
    name: "Koenigsegg Gemera",
    displayName: "Koenigsegg Gemera",
    spec: "Four-seat hybrid megacar",
    imageUrl: "/vehicles/gemera-real.png",
    imageAlt: "Koenigsegg Gemera in a dark studio setting",
    copy: "The Gemera recasts the megacar as a four-seat grand tourer, combining extreme hybrid performance with a carbon-fibre monocoque and a genuinely usable cabin.",
    specifications: [
      ["Power output", "2,300 hp combined"],
      ["Powertrain", "Twin-turbo Hot V8 + Dark Matter e-motor"],
      ["Transmission", "9-speed Light Speed Tourbillon Transmission"],
      ["Drivetrain", "All-wheel drive with four-wheel torque vectoring"],
      ["Seating", "Four individual seats"],
      ["Production", "Limited to 300 cars"],
    ],
  },
  {
    id: 3,
    year: "2022",
    status: "Model reference",
    name: "Koenigsegg CC850",
    displayName: "Koenigsegg CC850",
    spec: "Manual-engagement megacar · two seats",
    imageUrl: "/vehicles/cc850-real.png",
    imageAlt: "Koenigsegg CC850 in a dark studio setting",
    copy: "The CC850 honours the original CC8S with a modern carbon-fibre platform and the Engage Shift System—an unusual transmission concept that combines manual involvement with automatic capability.",
    specifications: [
      ["Power output", "1,385 hp on E85"],
      ["Engine", "5.0L twin-turbo V8"],
      ["Transmission", "9-speed LST with Engage Shift System"],
      ["Torque", "1,385 Nm at 4,800 rpm"],
      ["Curb weight", "1,385 kg"],
      ["Architecture", "Carbon-fibre monocoque"],
    ],
  },
  {
    id: 4,
    year: "2022",
    status: "Model reference",
    name: "Koenigsegg Regera",
    displayName: "Koenigsegg Regera",
    spec: "Hybrid grand touring megacar · two seats",
    imageUrl: "/vehicles/regera-real.png",
    imageAlt: "Koenigsegg Regera in a dark studio setting",
    copy: "The Regera pairs a twin-turbo V8 with electric drive and Koenigsegg Direct Drive, replacing a conventional multi-speed gearbox with a distinctive hybrid propulsion system.",
    specifications: [
      ["Combined output", "Over 1,500 hp on E85"],
      ["Engine", "5.0L twin-turbo V8"],
      ["Electric drive", "700 hp electric system"],
      ["Transmission", "Koenigsegg Direct Drive"],
      ["Maximum downforce", "450 kg at 250 km/h"],
      ["Curb weight", "1,590 kg"],
    ],
  },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
function toast(text) { $("#toast").textContent = text; $("#toast").classList.add("show"); window.setTimeout(() => $("#toast").classList.remove("show"), 3000); }
function carById(id) { return cars.find((car) => car.id === Number(id)); }

let exhibitSplide;

function mountExhibit(count) {
  const carousel = $(".exhibit-carousel");
  if (count < 2) return;
  exhibitSplide = new Splide(carousel, {
    type: "loop",
    focus: "center",
    perPage: 1,
    padding: { left: "9vw", right: "9vw" },
    gap: "1.25rem",
    speed: 750,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    pagination: false,
    arrows: false,
    breakpoints: {
      768: { padding: { left: "1rem", right: "1rem" }, gap: "0.75rem" },
    },
  }).mount();
}

function renderCars() {
  exhibitSplide?.destroy(true);
  exhibitSplide = undefined;
  $("#vehicle-list").innerHTML = cars.map((car) => `<li class="splide__slide"><article class="exhibit-vehicle"><img src="${car.imageUrl}" alt="${car.imageAlt}" loading="lazy"><div class="exhibit-overlay"><p>${car.year} ${car.displayName}</p><div><span>${car.status}</span></div><nav class="exhibit-actions" aria-label="${car.displayName} actions"><button class="intersection-button" data-action="rental" data-car-id="${car.id}">Inquire privately</button><button class="intersection-button" data-action="sticker" data-car-id="${car.id}">Vehicle file</button></nav></div></article></li>`).join("");
  mountExhibit(cars.length);
}

function createDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "vehicle-dialog";
  dialog.setAttribute("aria-labelledby", "dialog-title");
  dialog.innerHTML = '<div class="dialog-panel"><button class="dialog-close" type="button" aria-label="Close dialog">×</button><div class="dialog-content"></div></div>';
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("submit", (event) => { event.preventDefault(); const kind = event.target.dataset.requestKind; dialog.close(); toast(`${kind} enquiry prepared for review — no data was sent.`); });
  document.body.append(dialog);
  return dialog;
}

const dialog = createDialog();
function openRentalEnquiry(car) {
  dialog.querySelector(".dialog-content").innerHTML = `<p class="eyebrow">Private rental desk</p><h2 id="dialog-title">Inquire privately</h2><p class="dialog-intro">Private rental enquiry for ${car.name} · ${car.spec}</p><form data-request-kind="Private rental"><label>Selected vehicle<input name="vehicle" value="${car.name}" readonly aria-readonly="true"></label><label>Rental start date<input name="rental-start" type="date" required></label><label>Rental end date<input name="rental-end" type="date" required></label><label>Location / destination<input name="location" required autocomplete="address-level2"></label><label>Name<input name="name" required autocomplete="name"></label><label>Email<input name="email" type="email" required autocomplete="email"></label><label>Message<textarea name="message" rows="3" placeholder="Travel plans, collection requirements, or preferences"></textarea></label><button class="acid" type="submit">Send private enquiry →</button></form><p class="dialog-note">Demo only: submitting does not send or store your details.</p>`;
  dialog.showModal();
}
function openSticker(car) {
  const specifications = car.specifications.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");
  dialog.querySelector(".dialog-content").innerHTML = `<p class="eyebrow">Vehicle file // model reference</p><h2 id="dialog-title">${car.name}</h2><p class="dialog-intro">${car.year} · ${car.spec}</p><img class="sticker-image" src="${car.imageUrl}" alt="${car.imageAlt}"><p class="dialog-intro">${car.copy}</p><dl class="sticker-specs">${specifications}</dl><p class="dialog-note">Reference specifications only. Final configuration and availability require confirmation.</p>`;
  dialog.showModal();
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-scroll]");
  if (!trigger) return;
  $(`#${trigger.dataset.scroll}`)?.scrollIntoView({ behavior: "smooth" });
});
$("#telemetri-form").addEventListener("submit", (event) => { event.preventDefault(); toast("Private collection enquiry prepared for review — no data was sent."); });
$("#request-allocation-form").addEventListener("submit", (event) => { event.preventDefault(); toast("Allocation request prepared for review — no data was sent."); });
const menuButton = $(".menu-toggle");
const mainNav = $("#main-nav");
const menuLinks = $$("#main-nav a");

function setMenu(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  mainNav.classList.toggle("is-open", open);
  mainNav.setAttribute("aria-hidden", String(!open));
  mainNav.inert = !open;
  document.documentElement.classList.toggle("menu-open", open);
  document.body.classList.toggle("menu-open", open);
  if (open) {
    window.setTimeout(() => menuLinks[0]?.focus(), 120);
  } else {
    menuButton.focus();
  }
}

menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
menuLinks.forEach((link) => link.addEventListener("click", (event) => {
  const target = $(link.getAttribute("href"));
  if (!target) return;
  event.preventDefault();
  setMenu(false);
  target.scrollIntoView({ behavior: "smooth" });
  window.history.replaceState(null, "", link.getAttribute("href"));
}));
document.addEventListener("keydown", (event) => {
  if (menuButton.getAttribute("aria-expanded") !== "true") return;
  if (event.key === "Escape") {
    event.preventDefault();
    setMenu(false);
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = [menuButton, ...mainNav.querySelectorAll('a[href]')];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
});
document.addEventListener("click", (event) => { const action = event.target.closest("[data-action]"); if (!action) return; const car = carById(action.dataset.carId); if (!car) return; if (action.dataset.action === "rental") openRentalEnquiry(car); if (action.dataset.action === "sticker") openSticker(car); });

const exhibitDragSurface = document.querySelector("#exhibit .splide__track");
const exhibitCursorDot = document.querySelector(".exhibit-drag-cursor-dot");
const exhibitCursorCircle = document.querySelector(".exhibit-drag-cursor-circle");
const exhibitCursorQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");

if (exhibitDragSurface && exhibitCursorDot && exhibitCursorCircle && exhibitCursorQuery.matches) {
  let pointerX = 0;
  let pointerY = 0;
  let circleX = 0;
  let circleY = 0;
  let cursorVisible = false;
  let cursorFrame;

  const updateDot = () => {
    exhibitCursorDot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
  };
  const updateCircle = () => {
    exhibitCursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0) translate(-50%, -50%)`;
  };
  const followPointer = () => {
    circleX += (pointerX - circleX) * 0.18;
    circleY += (pointerY - circleY) * 0.18;
    updateCircle();
    if (Math.abs(pointerX - circleX) > 0.2 || Math.abs(pointerY - circleY) > 0.2) {
      cursorFrame = window.requestAnimationFrame(followPointer);
    } else {
      cursorFrame = undefined;
    }
  };
  const scheduleFollow = () => {
    if (!cursorFrame) cursorFrame = window.requestAnimationFrame(followPointer);
  };
  const isDragTarget = (target) => target instanceof Element && exhibitDragSurface.contains(target) && !target.closest("button");
  const setCursorVisible = (visible) => {
    cursorVisible = visible;
    exhibitCursorDot.classList.toggle("is-visible", visible);
    exhibitCursorCircle.classList.toggle("is-visible", visible);
    if (!visible) exhibitCursorCircle.classList.remove("is-dragging");
  };
  const positionCursor = (event, immediate = false) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    updateDot();
    if (immediate) {
      circleX = pointerX;
      circleY = pointerY;
      updateCircle();
    } else {
      scheduleFollow();
    }
  };

  exhibitDragSurface.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse" || !isDragTarget(event.target)) return;
    positionCursor(event, true);
    setCursorVisible(true);
  });
  exhibitDragSurface.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    positionCursor(event, !cursorVisible);
    setCursorVisible(isDragTarget(event.target));
  });
  exhibitDragSurface.addEventListener("pointerleave", () => setCursorVisible(false));
  exhibitDragSurface.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && cursorVisible && isDragTarget(event.target)) {
      exhibitCursorCircle.classList.add("is-dragging");
    }
  });
  window.addEventListener("pointerup", () => exhibitCursorCircle.classList.remove("is-dragging"));
  window.addEventListener("pointercancel", () => exhibitCursorCircle.classList.remove("is-dragging"));
  window.addEventListener("scroll", () => {
    if (!cursorVisible) return;
    setCursorVisible(isDragTarget(document.elementFromPoint(pointerX, pointerY)));
  }, { passive: true });
}

const hero = document.querySelector(".hero");
const heroParallaxQuery = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
if (hero && heroParallaxQuery.matches) {
  let heroParallaxFrame;
  const resetHeroParallax = () => {
    window.cancelAnimationFrame(heroParallaxFrame);
    hero.style.setProperty("--hero-parallax-x", "0px");
    hero.style.setProperty("--hero-parallax-y", "0px");
  };
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
    const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 16;
    window.cancelAnimationFrame(heroParallaxFrame);
    heroParallaxFrame = window.requestAnimationFrame(() => {
      hero.style.setProperty("--hero-parallax-x", `${offsetX.toFixed(2)}px`);
      hero.style.setProperty("--hero-parallax-y", `${offsetY.toFixed(2)}px`);
    });
  }, { passive: true });
  hero.addEventListener("pointerleave", resetHeroParallax, { passive: true });
}

renderCars();
