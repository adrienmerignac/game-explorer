import React, { useState, useEffect, useRef } from "react";
import { useSearch } from "../context/SearchContext";
import { fetchGames } from "../services/GameService";
import { Game } from "../services/GameService.types";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, debouncedQuery } = useSearch();
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length > 1) {
        try {
          const data = await fetchGames(1, 5, debouncedQuery);
          setSuggestions(data.results);
          setShowSuggestions(true);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des suggestions :",
            error
          );
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header page__header">
      <div className="header__wrapper">
        {/* Logo */}
        <div className="header__item">
          <a className="header__item-link header-logo" href="/">
            <div className="logo">GameHub</div>
          </a>
        </div>

        {/* Barre de recherche avec suggestions */}
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
                  onFocus={() => setShowSuggestions(true)}
                />
                {/* Afficher les suggestions uniquement si `showSuggestions` est true */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="search-suggestions">
                    {suggestions.map((game) => (
                      <Link
                        key={game.id}
                        to={`/games/${game.id}`}
                        className="search-suggestion"
                        onClick={() => setSearchQuery("")}
                      >
                        <img
                          src={game.background_image}
                          alt={game.name}
                          className="suggestion-img"
                        />
                        <span>{game.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
