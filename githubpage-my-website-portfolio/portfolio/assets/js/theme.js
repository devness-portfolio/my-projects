const THEME_KEY = "theme";

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
  storage = window.localStorage,
} = {}) {
  if (!body || !toggle) return;

  const savedTheme = getStoredTheme(storage);

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;
    body.classList.toggle("dark-mode", isDark);
    storeTheme(storage, isDark ? "dark" : "light");
  });
}
