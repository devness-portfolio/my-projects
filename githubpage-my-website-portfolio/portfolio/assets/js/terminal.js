const responses = Object.freeze({
  whoami: "Anes Mehai — Software Engineer. +5 years building secure, dependable software, including federal systems.",
  impact: "Federal modernization, Java-based MFA, and production systems. Explore Professional Career for the roles and engineering decisions behind the work.",
  approach: "Understand the problem → define boundaries → build focused components → verify behavior → ship and observe. Keep interfaces clear and changes testable.",
  skills: "Java · Spring Boot · REST APIs · SQL\nJavaScript · React · HTML · CSS\nLinux · CI/CD · Jenkins · AWS · GCP · Docker",
  help: "Available commands: whoami, impact, approach, skills, help. This demo runs locally in your browser.",
});

export function resolveTerminalCommand(value) {
  const command = String(value ?? "").trim().toLowerCase();
  if (!command) return "Type a command, or choose one above. Try help.";
  return Object.hasOwn(responses, command)
    ? responses[command]
    : "Command not found. Try whoami, impact, approach, skills, or help.";
}

export default function setupTerminal({
  root = document,
  form = root.querySelector("[data-terminal-form]"),
  input = root.querySelector("[data-terminal-input]"),
  output = root.querySelector("[data-terminal-output]"),
  buttons = [...root.querySelectorAll("[data-terminal-command]")],
} = {}) {
  if (!form || !input || !output) return;
  form.hidden = false;
  const run = (command) => {
    output.hidden = false;
    // Text only: user input never becomes markup or executable code.
    output.textContent = resolveTerminalCommand(command);
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run(input.value);
  });
  buttons.forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    input.value = button.dataset.terminalCommand;
    run(input.value);
    input.focus({ preventScroll: true });
  }));
}
