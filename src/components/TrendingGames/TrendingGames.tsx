import React, { useState, useEffect } from "react";
import { getTrendingGames } from "../../services/GameService";
import { Game } from "../../services/GameService.types";
import { Link } from "react-router-dom";
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
              <img
                src={game.background_image}
                alt={game.name}
                className="game-card__image"
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
