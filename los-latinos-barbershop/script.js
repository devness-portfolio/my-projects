const HERO_CANVAS_WIDTH = 960;
const HERO_CANVAS_HEIGHT = 540;
const LANGUAGE_STORAGE_KEY = "losLatinosLanguage";

const translations = {
  en: {
    "page.title": "Los Latinos Barbershop | Fades, Haircuts & Beard Trims in Kenner",
    "meta.description": "Los Latinos Barbershop serves Kenner, Metairie, and New Orleans with haircuts, fades, beard trims, kids cuts, and hot towel grooming. Se habla español.",
    "skip": "Skip to content",
    "header.aria": "Site header",
    "brand.aria": "Los Latinos Barbershop home",
    "nav.aria": "Primary navigation",
    "nav.services": "Services",
    "nav.hours": "Hours",
    "nav.book": "Book",
    "nav.contact": "Contact",
    "language.aria": "Language selection",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "header.call": "Call",
    "hero.eyebrow": "Kenner | Metairie | New Orleans",
    "hero.copy": "Modern cuts, clean fades, and sharp grooming with Latino pride and luxury detail.",
    "hero.actions": "Primary actions",
    "hero.book": "Book your chair",
    "hero.call": "Call the shop",
    "hero.points": "Shop highlights",
    "hero.point1": "Haircuts and fades",
    "hero.point2": "Beard trims",
    "hero.point3": "Kids cuts",
    "hero.point4": "Hot towel service",
    "hero.point5": "Se habla español",
    "services.eyebrow": "Services",
    "services.title": "Premium grooming for everyday confidence.",
    "services.copy": "From sharp fades to family cuts, every service is built around clean detail, comfort, and a fresh finish.",
    "services.grid": "Featured services",
    "service.fade.alt": "Barber blending a clean fade with clippers",
    "service.fade.tag": "Most requested",
    "service.fade.title": "Fades",
    "service.fade.copy": "Low, mid, high, burst, taper, or skin fades blended clean and finished with sharp edges.",
    "service.haircut.alt": "Barber cutting hair with scissors and comb",
    "service.haircut.tag": "Classic to modern",
    "service.haircut.title": "Haircuts",
    "service.haircut.copy": "Clipper and scissor work for polished everyday styles, textured cuts, and clean shape-ups.",
    "service.beard.alt": "Barber shaping a beard with trimmers",
    "service.beard.tag": "Lineup and detail",
    "service.beard.title": "Beard Trims",
    "service.beard.copy": "Balanced shaping, neckline cleanup, and precise line work for a stronger profile.",
    "service.kids.alt": "Barber giving a child a clean haircut",
    "service.kids.tag": "Family friendly",
    "service.kids.title": "Kids Cuts",
    "service.kids.copy": "Patient, comfortable cuts for young clients, school days, photos, and weekend plans.",
    "service.towel.alt": "Barber applying a hot towel during a shave service",
    "service.towel.tag": "Relaxed finish",
    "service.towel.title": "Hot Towel",
    "service.towel.copy": "A warm towel grooming ritual for a cleaner shave feel and a calmer chair experience.",
    "booking.eyebrow": "Appointments",
    "booking.title": "Reserve your chair by phone today.",
    "booking.copy": "Online booking is coming soon. For now, call the shop to check same-day openings, walk-in availability, and the best time to stop by.",
    "booking.label": "Booking opening soon",
    "booking.cardTitle": "Fastest way to book: call the shop.",
    "booking.cardCopy": "Tell us the service you need and whether you prefer English or Spanish.",
    "booking.call": "Call to book",
    "hours.eyebrow": "Hours & Areas",
    "hours.title": "Serving Kenner, Metairie, and New Orleans.",
    "hours.copy": "Hours will be posted soon. Call ahead for today's schedule, chair availability, and walk-in timing.",
    "hours.list": "Shop details",
    "hours.item1.title": "Today's hours",
    "hours.item1.copy": "Call for current availability",
    "hours.item2.title": "Service area",
    "hours.item2.copy": "Kenner, Metairie, New Orleans",
    "hours.item3.title": "Languages",
    "hours.item3.copy": "English and Spanish",
    "footer.copy": "Modern Latino barbershop services in Kenner, Louisiana.",
    "footer.actions": "Footer actions",
    "footer.book": "Book",
    "footer.call": "Call",
    "footer.contact.title": "Contact",
    "footer.contact.phone": "Call +1 (504) 555-0198",
    "footer.contact.hours": "Hours: call for today's schedule",
    "footer.contact.language": "Se habla español",
    "footer.social.title": "Social",
    "footer.directions.title": "Directions",
    "footer.directions.copy": "Los Latinos Barbershop, Kenner, LA",
    "map.aria": "Embedded map",
    "map.title": "Map to Los Latinos Barbershop in Kenner, Louisiana",
    "footer.rights": "All rights reserved.",
    "footer.area": "Kenner, Metairie, New Orleans"
  },
  es: {
    "page.title": "Los Latinos Barbershop | Cortes, Fades y Barba en Kenner",
    "meta.description": "Los Latinos Barbershop atiende a Kenner, Metairie y New Orleans con cortes, fades, barba, cortes para niños y servicio de toalla caliente. Se habla español.",
    "skip": "Saltar al contenido",
    "header.aria": "Encabezado del sitio",
    "brand.aria": "Inicio de Los Latinos Barbershop",
    "nav.aria": "Navegación principal",
    "nav.services": "Servicios",
    "nav.hours": "Horario",
    "nav.book": "Citas",
    "nav.contact": "Contacto",
    "language.aria": "Selección de idioma",
    "menu.open": "Abrir menú",
    "menu.close": "Cerrar menú",
    "header.call": "Llamar",
    "hero.eyebrow": "Kenner | Metairie | New Orleans",
    "hero.copy": "Cortes modernos, fades limpios y grooming con orgullo latino y detalle de lujo.",
    "hero.actions": "Acciones principales",
    "hero.book": "Reserva tu silla",
    "hero.call": "Llama al shop",
    "hero.points": "Detalles del shop",
    "hero.point1": "Cortes y fades",
    "hero.point2": "Arreglo de barba",
    "hero.point3": "Cortes para niños",
    "hero.point4": "Toalla caliente",
    "hero.point5": "Se habla español",
    "services.eyebrow": "Servicios",
    "services.title": "Grooming premium para verte fresco todos los días.",
    "services.copy": "Desde fades definidos hasta cortes familiares, cada servicio se enfoca en detalle limpio, comodidad y un acabado fresco.",
    "services.grid": "Servicios destacados",
    "service.fade.alt": "Barbero mezclando un fade limpio con máquina",
    "service.fade.tag": "Más pedido",
    "service.fade.title": "Fades",
    "service.fade.copy": "Low, mid, high, burst, taper o skin fades bien mezclados y terminados con líneas limpias.",
    "service.haircut.alt": "Barbero cortando cabello con tijeras y peine",
    "service.haircut.tag": "Clásico a moderno",
    "service.haircut.title": "Cortes",
    "service.haircut.copy": "Trabajo con máquina y tijera para estilos del día a día, textura y shape-ups limpios.",
    "service.beard.alt": "Barbero arreglando una barba con máquina",
    "service.beard.tag": "Línea y detalle",
    "service.beard.title": "Barba",
    "service.beard.copy": "Forma balanceada, limpieza del cuello y líneas precisas para un perfil más definido.",
    "service.kids.alt": "Barbero haciendo un corte limpio a un niño",
    "service.kids.tag": "Para la familia",
    "service.kids.title": "Cortes para Niños",
    "service.kids.copy": "Cortes pacientes y cómodos para niños, escuela, fotos y planes del fin de semana.",
    "service.towel.alt": "Barbero aplicando una toalla caliente durante un servicio de afeitado",
    "service.towel.tag": "Final relajado",
    "service.towel.title": "Toalla Caliente",
    "service.towel.copy": "Un ritual de toalla tibia para una sensación de afeitado más limpia y una experiencia más tranquila.",
    "booking.eyebrow": "Citas",
    "booking.title": "Reserva tu silla por teléfono hoy.",
    "booking.copy": "Las citas en línea vienen pronto. Por ahora, llama al shop para preguntar por espacios el mismo día, disponibilidad para walk-ins y la mejor hora para pasar.",
    "booking.label": "Reservas pronto",
    "booking.cardTitle": "La forma más rápida: llama al shop.",
    "booking.cardCopy": "Dinos el servicio que necesitas y si prefieres inglés o español.",
    "booking.call": "Llamar para reservar",
    "hours.eyebrow": "Horario y Áreas",
    "hours.title": "Sirviendo Kenner, Metairie y New Orleans.",
    "hours.copy": "El horario se publicará pronto. Llama antes para confirmar el horario de hoy, disponibilidad de silla y tiempos para walk-ins.",
    "hours.list": "Detalles del shop",
    "hours.item1.title": "Horario de hoy",
    "hours.item1.copy": "Llama para confirmar disponibilidad",
    "hours.item2.title": "Área de servicio",
    "hours.item2.copy": "Kenner, Metairie, New Orleans",
    "hours.item3.title": "Idiomas",
    "hours.item3.copy": "Inglés y español",
    "footer.copy": "Servicios modernos de barbería latina en Kenner, Louisiana.",
    "footer.actions": "Acciones del pie de página",
    "footer.book": "Reservar",
    "footer.call": "Llamar",
    "footer.contact.title": "Contacto",
    "footer.contact.phone": "Llama al +1 (504) 555-0198",
    "footer.contact.hours": "Horario: llama para confirmar el horario de hoy",
    "footer.contact.language": "Se habla español",
    "footer.social.title": "Redes",
    "footer.directions.title": "Direcciones",
    "footer.directions.copy": "Los Latinos Barbershop, Kenner, LA",
    "map.aria": "Mapa integrado",
    "map.title": "Mapa a Los Latinos Barbershop en Kenner, Louisiana",
    "footer.rights": "Todos los derechos reservados.",
    "footer.area": "Kenner, Metairie, New Orleans"
  }
};

function setCurrentYear() {
  const yearTarget = document.querySelector("[data-current-year]");

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }
}

function getPreferredLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (savedLanguage === "en" || savedLanguage === "es") {
      return savedLanguage;
    }
  } catch {
    // Local storage can be blocked in private or embedded browsing contexts.
  }

  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function updateMetaContent(messages) {
  const description = document.querySelector('meta[name="description"]');

  document.title = messages["page.title"];

  if (description) {
    description.setAttribute("content", messages["meta.description"]);
  }
}

function setTranslatedText(messages) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (key && messages[key]) {
      element.textContent = messages[key];
    }
  });
}

function setTranslatedAttribute(messages, selector, dataAttribute, attribute) {
  document.querySelectorAll(selector).forEach((element) => {
    const key = element.getAttribute(dataAttribute);

    if (key && messages[key]) {
      element.setAttribute(attribute, messages[key]);
    }
  });
}

function updateLanguageButtons(language) {
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    const isSelected = button.getAttribute("data-lang-option") === language;
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function updateMenuToggleLabel(language = document.documentElement.lang) {
  const toggle = document.querySelector("[data-menu-toggle]");

  if (!toggle) {
    return;
  }

  const safeLanguage = language === "es" ? "es" : "en";
  const labelKey = toggle.getAttribute("aria-expanded") === "true" ? "menu.close" : "menu.open";
  toggle.setAttribute("aria-label", translations[safeLanguage][labelKey]);
}

function applyLanguage(language) {
  const safeLanguage = language === "es" ? "es" : "en";
  const messages = translations[safeLanguage];

  document.documentElement.lang = safeLanguage;
  updateMetaContent(messages);
  setTranslatedText(messages);
  setTranslatedAttribute(messages, "[data-i18n-alt]", "data-i18n-alt", "alt");
  setTranslatedAttribute(messages, "[data-i18n-title]", "data-i18n-title", "title");
  setTranslatedAttribute(messages, "[data-i18n-aria-label]", "data-i18n-aria-label", "aria-label");
  updateLanguageButtons(safeLanguage);
  updateMenuToggleLabel(safeLanguage);

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, safeLanguage);
  } catch {
    // The toggle should still work even when storage is unavailable.
  }
}

function initLanguageToggle() {
  const toggle = document.querySelector("[data-language-toggle]");

  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang-option]");

    if (!button) {
      return;
    }

    applyLanguage(button.getAttribute("data-lang-option"));
  });

  applyLanguage(getPreferredLanguage());
}

function initMobileMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("#primary-nav");

  if (!header || !toggle || !nav) {
    return;
  }

  function setMenuState(isOpen) {
    header.classList.toggle("is-menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    updateMenuToggleLabel(document.documentElement.lang);
  }

  toggle.addEventListener("click", () => {
    setMenuState(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      setMenuState(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });

  const wideScreenQuery = window.matchMedia("(min-width: 681px)");
  const closeOnWideScreen = (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  };

  if (typeof wideScreenQuery.addEventListener === "function") {
    wideScreenQuery.addEventListener("change", closeOnWideScreen);
  } else if (typeof wideScreenQuery.addListener === "function") {
    wideScreenQuery.addListener(closeOnWideScreen);
  }

  updateMenuToggleLabel(document.documentElement.lang);
}

function drawCoverImage(context, image, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const x = (width - drawWidth) / 2;
  const y = (height - drawHeight) / 2;

  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function drawLight(context, x, y, radius, color) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function startHeroBackdropVideo() {
  const video = document.querySelector("[data-hero-video]");
  const usesGeneratedBackdrop = video?.hasAttribute("data-generated-backdrop");
  const hasNativeVideoSource = Boolean(video?.getAttribute("src") || video?.querySelector("source"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canStreamCanvas = typeof HTMLCanvasElement !== "undefined"
    && "captureStream" in HTMLCanvasElement.prototype;

  if (!video || !usesGeneratedBackdrop || hasNativeVideoSource || prefersReducedMotion || !canStreamCanvas) {
    return;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) {
    return;
  }

  canvas.width = HERO_CANVAS_WIDTH;
  canvas.height = HERO_CANVAS_HEIGHT;

  const poster = new Image();
  poster.decoding = "async";
  poster.src = video.getAttribute("poster") || "assets/hero-shop.png";

  const stream = canvas.captureStream(30);
  video.srcObject = stream;
  video.addEventListener("playing", () => video.classList.add("is-ready"), { once: true });

  let animationFrame = 0;
  let imageReady = false;

  poster.addEventListener("load", () => {
    imageReady = true;
  });

  function renderFrame(now) {
    const seconds = now / 1000;
    const width = canvas.width;
    const height = canvas.height;

    if (imageReady) {
      drawCoverImage(context, poster, width, height);
    } else {
      const base = context.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#051421");
      base.addColorStop(0.5, "#12618f");
      base.addColorStop(1, "#9b273a");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);
    }

    context.globalCompositeOperation = "source-over";
    context.fillStyle = "rgba(5, 20, 33, 0.32)";
    context.fillRect(0, 0, width, height);

    context.globalCompositeOperation = "screen";
    drawLight(
      context,
      width * (0.22 + Math.sin(seconds * 0.18) * 0.05),
      height * (0.28 + Math.cos(seconds * 0.24) * 0.07),
      230,
      "rgba(231, 189, 90, 0.26)"
    );
    drawLight(
      context,
      width * (0.78 + Math.cos(seconds * 0.16) * 0.06),
      height * (0.64 + Math.sin(seconds * 0.2) * 0.05),
      280,
      "rgba(27, 128, 107, 0.24)"
    );
    drawLight(
      context,
      width * (0.5 + Math.sin(seconds * 0.12) * 0.08),
      height * (0.42 + Math.cos(seconds * 0.15) * 0.06),
      210,
      "rgba(155, 39, 58, 0.2)"
    );
    context.globalCompositeOperation = "source-over";

    animationFrame = window.requestAnimationFrame(renderFrame);
  }

  video.play().catch(() => {
    stream.getTracks().forEach((track) => track.stop());
  });

  animationFrame = window.requestAnimationFrame(renderFrame);

  window.addEventListener(
    "pagehide",
    () => {
      window.cancelAnimationFrame(animationFrame);
      stream.getTracks().forEach((track) => track.stop());
    },
    { once: true }
  );
}

setCurrentYear();
initMobileMenu();
initLanguageToggle();
startHeroBackdropVideo();
