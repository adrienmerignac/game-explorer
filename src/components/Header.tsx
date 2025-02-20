import React, { useRef } from "react";
import { useSearch } from "../context/SearchContext";
import SearchSuggestions from "./Search/SearchSuggestions";
import { useLocation } from "react-router-dom";
import Wishlist from "./Wishlist/Wishlist"; // ✅ Import du composant Wishlist

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`page__header ${
        isHomePage ? "header--colored" : "header--transparent"
      }`}
    >
      <div className="header__wrapper">
        <input
          type="checkbox"
          id="sidebar-toggle"
          className="sidebar-toggle-checkbox"
        />
        <label htmlFor="sidebar-toggle" className="sidebar-toggle">
          ☰
        </label>

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

        <div className="header__item">
          <a className="header__item-link header-logo" href="/">
            <div className="logo">GameHub</div>
          </a>
        </div>

        {/* ✅ Barre de recherche */}
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
                  placeholder="Rechercher un jeu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchSuggestions searchRef={searchRef} />
              </div>
            </form>
          </div>
        </div>

        {/* ✅ Intégration du bouton Wishlist */}
        <div className="header__item header__wishlist">
          <Wishlist />
        </div>
      </div>
    </header>
  );
};

export default Header;
