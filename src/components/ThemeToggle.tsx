import React from "react";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === "light" ? "🌙 Dark Mode " : "🌞 Light Mode"}
    </button>
  );
};

export default ThemeToggle;
