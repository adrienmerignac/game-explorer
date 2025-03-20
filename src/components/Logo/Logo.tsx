import React from "react";
import logo from "../../assets/images/game-explorer-logo-150x150.webp";

const Logo: React.FC = () => (
  <div className="header__item">
    <a className="header__item-link" href="/">
      <img
        src={logo}
        alt="Game Explorer Logo"
        className="header-logo"
        width="70"
        height="70"
      />
    </a>
  </div>
);

export default Logo;
