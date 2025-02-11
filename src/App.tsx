import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Assurez-vous d'importer useLocation correctement
import { useGames } from "./hooks/useGames";
import Header from "./components/Header";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";  // Assure-toi que GameDetails est importé
import "./styles/App.css";

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Déclaration du query "debounced"
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

  // On déplace useLocation à l'intérieur de BrowserRouter
  return (
    <BrowserRouter>  
      <div className="app">
        <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        {/* Utilisation de useLocation à l'intérieur du Router */}
        <Routes>
          {/* Page principale avec la liste des jeux */}
          <Route
            path="/"
            element={
              <>
                {/* Afficher le titre seulement si on est sur la page d'accueil */}
                <LocationAwareTitle />
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
              </>
            }
          />

          {/* Page de détails d'un jeu */}
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

// Nouveau composant qui affiche conditionnellement le titre
const LocationAwareTitle: React.FC = () => {
  const location = useLocation(); // useLocation est maintenant appelé dans un composant interne

  return (
    location.pathname === "/" && <h1 className="title">Bibliothèque de jeux vidéo</h1>
  );
};

export default App;
