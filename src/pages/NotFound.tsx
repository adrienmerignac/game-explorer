import React from "react";
import { Link } from "react-router-dom";
import "../styles/notFound.css"; // Tu peux ajouter un style dédié

import workInProgressImage from "../assets/images/work-in-progress.webp"; // Ajoute une image sympa

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img
          src={workInProgressImage}
          alt="Work in Progress"
          className="not-found-image"
        />
        <h1>🚧 Work in Progress 🚧</h1>
        <p>This page is still under development!</p>
        <Link to="/" className="not-found-button">
          🏠 Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
