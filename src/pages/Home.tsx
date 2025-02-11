import React, { useState, useEffect } from "react";
import { useGames } from "../hooks/useGames";
import HeroBanner from "../components/HeroBanner";
import GameList from "../components/GameList/GameList";

interface HomeProps {
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(page, searchQuery);

  // 🔥 Réinitialiser la page lorsqu'on effectue une nouvelle recherche
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <div className="home-container">
      {/* 🎠 Hero Banner */}
      <div className="hero-banner-container">
        {/* 🎯 Ajout du titre au-dessus du carrousel */}
        <div className="hero-header">
          <h1 className="hero-title">🔥 Top Trending Games</h1>
          <p className="hero-subtitle">
            Découvrez les jeux les plus populaires du moment
          </p>
        </div>
        <HeroBanner />
      </div>

      {/* 🎮 Section des jeux */}
      <div className="games-section">
        <div className="home__discover">
          <h1 className="title">New and Trending</h1>
          <p className="subtitle">Based on player counts and release date</p>
        </div>

        {loading && page === 1 ? (
          <div className="loading">Chargement des jeux...</div>
        ) : (
          <>
            <GameList games={games} />
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
    </div>
  );
};

export default Home;
