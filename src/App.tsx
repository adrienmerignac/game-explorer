import React, { useState, useEffect } from "react";
import { useGames } from "./hooks/useGames";
import Header from "./components/Header";
import GameList from "./components/GameList";
import "./styles/App.css";

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  const { games, loading, hasMore } = useGames(page, debouncedSearchQuery);

  // ⏳ Debounce pour éviter de lancer la recherche à chaque frappe
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => setSearchQuery(query);

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <h1 className="title">Bibliothèque de jeux vidéo</h1>

      {loading && page === 1 ? (
        <div className="loading">Chargement des jeux...</div>
      ) : (
        <>
          <GameList games={games} />

          {/* Bouton "Charger plus" */}
          {hasMore && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Charger plus
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
