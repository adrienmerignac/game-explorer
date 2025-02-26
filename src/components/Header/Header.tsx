import React, { useRef, useState, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import SearchSuggestions from "../Search/SearchSuggestions";
import { Link } from "react-router-dom";
import Wishlist from "../Wishlist/Wishlist";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import logo from "../../assets/images/game-explorer-logo-150x150.webp";

const Sidebar: React.FC = () => (
  <div className="sidebar">
    <label htmlFor="sidebar-toggle" className="sidebar-close">
      ✖
    </label>
    <nav className="sidebar__nav">
      <ul className="sidebar__list">
        <li>
          <a href="/">🏠 Accueil</a>
        </li>
        <li>
          <a href="/games">🎮 Jeux</a>
        </li>
        <li>
          <a href="/about">ℹ️ À propos</a>
        </li>
        <li>
          <a href="/contact">📞 Contact</a>
        </li>
      </ul>
    </nav>
  </div>
);

const SearchBar: React.FC<{ searchRef: React.RefObject<HTMLInputElement> }> = ({
  searchRef,
}) => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <div className="header__item header__item_search" ref={searchRef}>
      <div className="header__item header__item_center header__search">
        <form
          className="header__search__form"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="header__search__input__area">
            <input
              type="text"
              className="header__search__input"
              role="searchbox"
              placeholder="Search for a game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchSuggestions searchRef={searchRef} />
          </div>
        </form>
      </div>
    </div>
  );
};

const LoginButton: React.FC = () => (
  <div className="header__item header__user">
    <Link to="/login" className="login-icon" aria-label="Login">
      <svg
        className="login-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="24"
        height="24"
      >
        <path d="M10 2H20a2 2 0 012 2v16a2 2 0 01-2 2H10a2 2 0 01-2-2v-4h2v4h10V4H10v4H8V4a2 2 0 012-2zm-1 10l4 4 1.41-1.41L11.83 12H20v-2h-8.17l2.58-2.59L13 6l-4 4z" />
      </svg>
    </Link>
  </div>
);

const Header: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="page__header">
      <div className="header__wrapper">
        <div className="header__row">
          <input
            type="checkbox"
            id="sidebar-toggle"
            className="sidebar-toggle-checkbox"
          />
          <label htmlFor="sidebar-toggle" className="sidebar-toggle">
            ☰
          </label>
          <Sidebar />
          <div className="header__item">
            <a className="header__item-link" href="/">
              <img
                src={logo}
                alt="Game Explorer Logo"
                className="header-logo"
                width="75"
                height="75"
              />
            </a>
          </div>
          {!isMobile && <SearchBar searchRef={searchRef} />}
          <div className="header__item header__wishlist">
            <Wishlist />
          </div>
          <LoginButton />
          <ThemeToggle />
        </div>
        {isMobile && <SearchBar searchRef={searchRef} />}
      </div>
    </header>
  );
};

export default Header;
