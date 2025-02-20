import React, { useState, useEffect } from "react";
import { getTrendingGames } from "../../services/GameService";
import { Game } from "../../services/GameService.types";
import { Link } from "react-router-dom";
import OptimizedImage from "../OptimizedImage/OptimizedImage"; // ✅ Import du composant optimisé
import fallbackImage from "../../assets/images/fallback-image.webp";

import "../../styles/trendingGames.css";

const TrendingGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchTrendingGames = async () => {
      const data = await getTrendingGames();
      setGames(data);
    };
    fetchTrendingGames();
  }, []);

  const getOptimizedImage = (url?: string) => {
    if (!url) return fallbackImage;
    return url.replace("/media/", "/media/resize/640/-/");
  };

  return (
    <section className="trending-section">
      <h2>🔥 Most played at the moment</h2>
      <div className="trending-games">
        {games.map((game) => (
          <Link
            key={game.id}
            className="trending-game-link"
            to={`/games/${game.id}`}
          >
            <div className="game-card-trending">
              <OptimizedImage
                src={getOptimizedImage(game.background_image)}
                alt={game.name}
                className="game-card__image"
                loading="lazy"
              />
              <div className="game-card__content">
                <h3>{game.name}</h3>
                <p>{game.added} joueurs</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingGames;
