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

export default function setupHero({
  output = document.querySelector("#terminal-output"),
  terminalWrap = document.querySelector(".terminal-wrap"),
  hero = document.querySelector(".portfolio-hero"),
  reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"),
} = {}) {
  if (!output || !terminalWrap || !hero) return;

  let animationRun = 0;
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

  const addCursor = () => {
    const cursor = document.createElement("span");
    cursor.className = "terminal-cursor";
    cursor.setAttribute("aria-hidden", "true");
    output.lastElementChild?.append(cursor);
  };

  const showStaticSequence = () => {
    output.replaceChildren();
    sequence.forEach((item) => {
      createLine(item).textContent = item.text;
    });
    addCursor();
  };

  const runSequence = async () => {
    const currentRun = ++animationRun;
    output.replaceChildren();

    for (const item of sequence) {
      if (currentRun !== animationRun) return;
      const content = createLine(item);

      if (item.type === "command") {
        for (const character of item.text) {
          content.textContent += character;
          await wait(42 + Math.random() * 34);
          if (currentRun !== animationRun) return;
        }
        await wait(300);
      } else {
        content.textContent = item.text;
        await wait(520);
      }
    }

    addCursor();
    await wait(2600);
    if (!reducedMotion.matches && currentRun === animationRun) {
      runSequence();
    }
  };

  const updateTilt = (event) => {
    if (reducedMotion.matches || window.innerWidth < 901) return;

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

  if (reducedMotion.matches) {
    showStaticSequence();
  } else {
    runSequence();
  }
}
