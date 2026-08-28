export function activatePanel(tab, tabs, panels) {
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

const wait = (duration) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

async function runOverviewTyping(transcript, reducedMotion) {
  const lines = [...transcript.querySelectorAll("[data-typing-line]")];
  const cursor = transcript.querySelector("[data-typing-cursor]");
  const compactViewport = window.matchMedia("(max-width: 680px)");
  if (!lines.length || !cursor || reducedMotion.matches || compactViewport.matches) return;

  const textNodes = lines.flatMap((line) => {
    const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  });
  const text = textNodes.map((node) => node.textContent);

  textNodes.forEach((node) => {
    node.textContent = "";
  });

  for (let index = 0; index < textNodes.length; index += 1) {
    const node = textNodes[index];
    node.parentNode.insertBefore(cursor, node.nextSibling);

    for (const character of text[index]) {
      node.textContent += character;
      await wait(character === "\n" ? 45 : 24);
    }

    if (text[index].trim()) await wait(80);
  }
}

export default function setupHero({
  terminalWrap = document.querySelector(".terminal-wrap"),
  hero = document.querySelector(".portfolio-hero"),
  tabs = [...document.querySelectorAll("[data-console-tab]")],
  panels = [...document.querySelectorAll("[data-console-panel]")],
  transcript = document.querySelector("[data-overview-transcript]"),
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
} = {}) {
  if (!terminalWrap || !hero) return;

  const initialTab = tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0];
  if (initialTab) activatePanel(initialTab, tabs, panels);
  if (transcript) runOverviewTyping(transcript, reducedMotion);

  tabs.forEach((tab, index) => {
    // Activate on press as well as click. The console has a subtle pointer-driven
    // tilt, so its hit target can move between pointerdown and pointerup and cause
    // browsers to cancel the resulting click. Keeping click provides keyboard,
    // assistive-technology, and older-browser support.
    tab.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || event.isPrimary === false) return;
      activatePanel(tab, tabs, panels);
    });
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
