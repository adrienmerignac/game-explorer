import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === "light" ? (
        <Moon size={24} className="theme-icon" />
      ) : (
        <Sun size={24} className="theme-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
