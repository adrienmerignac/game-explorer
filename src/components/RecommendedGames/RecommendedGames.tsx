import React, { useState, useEffect } from "react";
import { getRecommendedGames } from "../../services/GameService";
import { Game } from "../../services/GameService.types";
import { Link } from "react-router-dom";
import "../../styles/recommendedGames.css";

const RecommendedGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const data = await getRecommendedGames();
      setGames(data);
    };
    fetchRecommendations();
  }, []);

  return (
    <section className="recommended-section">
      <h2>🎯 Recommended for you</h2>
      <div className="recommended-games">
        {games.map((game) => (
          <Link
            key={game.id}
            className="recommended-game-link"
            to={`/games/${game.id}`}
          >
            <div className="game-card-recommended">
              <img
                src={game.background_image}
                alt={game.name}
                className="game-card__image"
                loading="lazy"
              />
              <div className="game-card__content">
                <h3 className="game-card-recommended-title">{game.name}</h3>
                <p>⭐ {game.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedGames;
