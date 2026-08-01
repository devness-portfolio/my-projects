function activatePanel(tab, tabs, panels) {
  const panelName = tab.dataset.consoleTab;

  tabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.dataset.consolePanel !== panelName;
  });
}

export default function setupHero({
  terminalWrap = document.querySelector(".terminal-wrap"),
  hero = document.querySelector(".portfolio-hero"),
  tabs = [...document.querySelectorAll("[data-console-tab]")],
  panels = [...document.querySelectorAll("[data-console-panel]")],
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
} = {}) {
  if (!terminalWrap || !hero) return;

  const initialTab = tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];
  if (initialTab) activatePanel(initialTab, tabs, panels);

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activatePanel(tab, tabs, panels));
    tab.addEventListener("keydown", (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      activatePanel(tabs[nextIndex], tabs, panels);
      tabs[nextIndex].focus();
    });
  });

  const updateTilt = (event) => {
    if (reducedMotion.matches || window.innerWidth < 981) return;

    const bounds = hero.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    terminalWrap.style.setProperty("--rotate-y", `${horizontal * 3}deg`);
    terminalWrap.style.setProperty("--rotate-x", `${vertical * -2.5}deg`);
  };

  const resetTilt = () => {
    terminalWrap.style.setProperty("--rotate-y", "0deg");
    terminalWrap.style.setProperty("--rotate-x", "0deg");
  };

  hero.addEventListener("pointermove", updateTilt);
  hero.addEventListener("pointerleave", resetTilt);
}
