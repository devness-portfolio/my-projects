const flowSteps = {
  request: {
    state: "Request received",
    description: "Validate the route, normalize input, and attach request context before authentication.",
    code: "POST /reports/export",
  },
  auth: {
    state: "Identity verified",
    description: "Require an authenticated session and a second factor before sensitive operations continue.",
    code: "SecurityFilterChain → MFA",
  },
  service: {
    state: "Policy applied",
    description: "Apply business rules in a focused service layer, keeping controllers small and testable.",
    code: "ReportService.generate()",
  },
  data: {
    state: "Data returned",
    description: "Execute a parameterized query, map only the required fields, and return an auditable result.",
    code: "PreparedStatement → DTO",
  },
};

export default function setupWorkDemo({
  buttons = [...document.querySelectorAll("[data-flow-step]")],
  description = document.getElementById("flow-description"),
  code = document.getElementById("flow-code"),
  state = document.querySelector(".demo-state"),
} = {}) {
  if (!buttons.length || !description || !code || !state) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const step = flowSteps[button.dataset.flowStep];
      if (!step) return;

      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
      description.textContent = step.description;
      code.textContent = step.code;
      state.textContent = step.state;
    });
  });
}
