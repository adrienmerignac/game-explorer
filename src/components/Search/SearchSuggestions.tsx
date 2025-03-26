import React, { useState, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { fetchGames } from "../../services/GameService";
import { Game } from "../../services/GameService.types";
import { Link } from "react-router-dom";

interface SearchSuggestionsProps {
  searchRef: React.RefObject<HTMLInputElement>;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ searchRef }) => {
  const { debouncedQuery, setSearchQuery } = useSearch();
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    let isActive = true;
    const memoryCache = new Map<string, Game[]>();

    const fetchSuggestions = async () => {
      // ⏳ Si on a déjà cette recherche en mémoire → skip l’appel
      if (memoryCache.has(debouncedQuery)) {
        setSuggestions(memoryCache.get(debouncedQuery)!);
        setShowSuggestions(true);
        return;
      }

      try {
        const data = await fetchGames(1, 5, debouncedQuery);

        if (!isActive) return; // ✅ ignore si effet démonté

        memoryCache.set(debouncedQuery, data.results);
        setSuggestions(data.results);
        setShowSuggestions(true);
      } catch (error) {
        if (isActive) {
          console.error(
            "Erreur lors de la récupération des suggestions :",
            error
          );
        }
      }
    };

    fetchSuggestions();

    return () => {
      isActive = false;
    };
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  return (
    showSuggestions &&
    suggestions.length > 0 && (
      <div className="search-suggestions">
        {suggestions.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="search-suggestion"
            onClick={() => {
              setSearchQuery("");
              setShowSuggestions(false);
            }}
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
    )
  );
};

export default SearchSuggestions;
