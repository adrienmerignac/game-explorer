import { useEffect, useState } from "react";

export const useTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  // Dark mode par défaut, sauf si l'utilisateur a déjà choisi Light Mode
  const [theme, setTheme] = useState(
    storedTheme || (prefersLight ? "light" : "dark")
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
