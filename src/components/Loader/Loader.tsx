import React from "react";
import "./Loader.css"; // 🔥 Assure-toi de bien importer le CSS

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <p className="loader-text">LEVELING UP...</p>
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>
    </div>
  );
};

export default Loader;
