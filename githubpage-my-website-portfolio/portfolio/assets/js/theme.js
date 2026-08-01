const THEME_KEY = "theme";
const THEME_COLORS = { light: "#f5f8f6", dark: "#07110e" };

function getStoredTheme(storage) {
  try {
    return storage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function storeTheme(storage, theme) {
  try {
    storage.setItem(THEME_KEY, theme);
  } catch {
    // Private browsing and locked-down contexts can block localStorage.
  }
}

export default function setupTheme({
  body = document.body,
  toggle = document.getElementById("theme-toggle"),
  colorMeta = document.querySelector('meta[name="theme-color"]'),
  storage = window.localStorage,
} = {}) {
  if (!body || !toggle) return;

  const savedTheme = getStoredTheme(storage);

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
    colorMeta?.setAttribute("content", THEME_COLORS.dark);
  }

  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;
    body.classList.toggle("dark-mode", isDark);
    colorMeta?.setAttribute("content", THEME_COLORS[isDark ? "dark" : "light"]);
    storeTheme(storage, isDark ? "dark" : "light");
  });
}
