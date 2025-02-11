import React, { useState } from "react";
import { useGames } from "../hooks/useGames";
import HeroBanner from "../components/HeroBanner";
import GameList from "../components/GameList";

interface HomeProps {
  searchQuery: string; // ✅ Ajoute la prop searchQuery
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(page, searchQuery); // ✅ Utiliser searchQuery ici

  return (
    <div className="home-container">
      <div className="home__discover">
        <h1 className="title">New and trending</h1>
        <p className="subtitle">
          Based on player counts and release date
        </p>
      </div>
      <HeroBanner />

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
  );
};

export default Home;
