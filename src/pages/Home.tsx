import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext"; // 🔥 Import du contexte de recherche
import { useGames } from "../hooks/useGames";
import HeroBanner from "../components/HeroBanner";
import GameList from "../components/GameList/GameList";
import RecommendedGames from "../components/RecommendedGames/RecommendedGames";
import TrendingGames from "../components/TrendingGames/TrendingGames";

const Home: React.FC = () => {
  const { debouncedQuery } = useSearch(); // 🔥 On utilise uniquement `debouncedQuery`
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(page, ""); // 🔥 On ne passe plus `debouncedQuery` ici

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]); // 🔥 L'effet ne fait que réinitialiser la page, mais ne recharge pas les jeux

  return (
    <div className="home-container">
      <div className="hero-header">
        <h1 className="hero-title">🔥 Top Trending Games</h1>
        <p className="hero-subtitle">
          Discover the most popular games of the moment
        </p>
      </div>
      <div className="hero-banner">
        <HeroBanner />
      </div>
      <RecommendedGames />
      <TrendingGames />
      <div className="games-section">
        <div className="home__discover">
          <h2 className="title">🔥New and Trending</h2>
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
