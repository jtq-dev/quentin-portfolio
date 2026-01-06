export type ThemeMode = "dark" | "light";

const KEY = "qp_theme";

export function getInitialTheme(): ThemeMode {
  const saved = localStorage.getItem(KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(KEY, theme);
}
