import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import "./ThemeToggle.css"; // Assure-toi que ce fichier est bien importé

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="theme-toggle">
      <input
        type="checkbox"
        checked={theme === "dark"} // Utilise le thème du contexte
        onChange={toggleTheme}
        aria-label="Toggle theme"
      />
      <span className="theme-slider">
        {/* Soleil (Dark mode) - Visible uniquement en mode Dark */}
        <span className={`theme-icon sun ${theme === "dark" ? "visible" : ""}`}>
          <Sun size={16} />
        </span>
        {/* Lune (Light mode) - Visible uniquement en mode Light */}
        <span
          className={`theme-icon moon ${theme === "light" ? "visible" : ""}`}
        >
          <Moon size={16} />
        </span>
      </span>
    </label>
  );
};

export default ThemeToggle;
