import React, { useState, useEffect } from "react";
import { useGames } from "./hooks/useGames";
import Header from "./components/Header";
import GameList from "./components/GameList";
import "./assets/css/App.css"; // Import your styles

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  const { games, loading, totalPages } = useGames(page, debouncedSearchQuery);

  // ⏳ Debounce Effect (Wait 500ms before updating the search query)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => setSearchQuery(query);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <h1 className="title">Bibliothèque de jeux vidéo</h1>

      {loading ? <div className="loading">Chargement des jeux...</div> : <GameList games={games} />}

      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="pagination-btn">
          Précédent
        </button>
        <span className="page-info">Page {page} sur {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="pagination-btn">
          Suivant
        </button>
      </div>
    </div>
  );
};

export default App;
