import { useEffect, useState } from "react";

// Persisted light/dark theme. Dark is the default — the
// blueprint palette is designed for it. The chosen mode is
// written to <body> as a class and remembered in localStorage.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("currentMode") ?? "dark"
  );

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("currentMode", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
