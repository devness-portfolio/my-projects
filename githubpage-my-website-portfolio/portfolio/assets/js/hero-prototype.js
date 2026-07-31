const output = document.querySelector("#terminal-output");
const terminalWrap = document.querySelector(".terminal-wrap");
const hero = document.querySelector(".hero");
const themeToggle = document.querySelector("#theme-toggle");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const updateThemeToggle = () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${isDark ? "light" : "dark"} theme`,
  );
};

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("hero-theme", nextTheme);
  updateThemeToggle();
});

updateThemeToggle();

const sequence = [
  { type: "command", text: "whoami" },
  { type: "response", text: "anes_mehai — software_engineer" },
  { type: "command", text: "cat core.stack" },
  { type: "response", text: "Java · Spring · Cloud · DevOps" },
  { type: "command", text: "deploy --target public-sector" },
  { type: "success", text: "✓ reliable  ✓ accessible  ✓ production-ready" },
  { type: "command", text: "status --availability" },
  { type: "success", text: "● ready to build systems that serve" },
];

const wait = (duration) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

const createLine = (item) => {
  const line = document.createElement("p");
  line.className = `terminal-line terminal-${item.type}`;

  if (item.type === "command") {
    const prompt = document.createElement("span");
    prompt.className = "terminal-prompt";
    prompt.textContent = "$";
    line.append(prompt);
  }

  const content = document.createElement("span");
  line.append(content);
  output.append(line);
  return content;
};

const showStaticSequence = () => {
  output.replaceChildren();
  sequence.forEach((item) => {
    const content = createLine(item);
    content.textContent = item.text;
  });

  const cursor = document.createElement("span");
  cursor.className = "terminal-cursor";
  cursor.setAttribute("aria-hidden", "true");
  output.lastElementChild?.append(cursor);
};

const runSequence = async () => {
  output.replaceChildren();

  for (const item of sequence) {
    const content = createLine(item);

    if (item.type === "command") {
      for (const character of item.text) {
        content.textContent += character;
        await wait(42 + Math.random() * 34);
      }
      await wait(300);
    } else {
      content.textContent = item.text;
      await wait(520);
    }
  }

  const cursor = document.createElement("span");
  cursor.className = "terminal-cursor";
  cursor.setAttribute("aria-hidden", "true");
  output.lastElementChild?.append(cursor);

  await wait(2600);
  if (!prefersReducedMotion.matches) {
    runSequence();
  }
};

const updateTilt = (event) => {
  if (prefersReducedMotion.matches || window.innerWidth < 901) {
    return;
  }

  const bounds = hero.getBoundingClientRect();
  const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
  const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
  terminalWrap.style.setProperty("--rotate-y", `${horizontal * 3.5}deg`);
  terminalWrap.style.setProperty("--rotate-x", `${vertical * -3}deg`);
};

const resetTilt = () => {
  terminalWrap.style.setProperty("--rotate-y", "0deg");
  terminalWrap.style.setProperty("--rotate-x", "0deg");
};

hero.addEventListener("pointermove", updateTilt);
hero.addEventListener("pointerleave", resetTilt);

if (prefersReducedMotion.matches) {
  showStaticSequence();
} else {
  runSequence();
}
