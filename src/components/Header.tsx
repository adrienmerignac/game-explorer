import React, { useRef } from "react";
import { useSearch } from "../context/SearchContext";
import SearchSuggestions from "./Search/SearchSuggestions"; // ✅ Nouveau composant des suggestions

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <header className="header page__header">
      <div className="header__wrapper">
        {/* Logo */}
        <div className="header__item">
          <a className="header__item-link header-logo" href="/">
            <div className="logo">GameHub</div>
          </a>
        </div>

        {/* Barre de recherche */}
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
                {/* Suggestions */}
                <SearchSuggestions searchRef={searchRef} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
