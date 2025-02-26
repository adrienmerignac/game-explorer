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
        width="28"
        height="28"
      >
        <path d="M12 2a10 10 0 1 1-10 10A10.012 10.012 0 0 1 12 2zm0 2a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8zm0 2a3 3 0 1 1-3 3 3.003 3.003 0 0 1 3-3zm0 6c-2.209 0-6 1.072-6 3.2V18h12v-2.8c0-2.128-3.791-3.2-6-3.2z" />
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
