import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GameListProps } from "./GameList.types";
import fallbackImage from "../../assets/images/fallback-image.webp";

const GameList: React.FC<GameListProps> = ({ games }) => {
  const [loadedGames, setLoadedGames] = useState(games);

  useEffect(() => {
    setLoadedGames(games);
  }, [games]);

  const displayedGames = useMemo(() => loadedGames, [loadedGames]);

  if (games.length === 0) {
    return <p className="no-games">Aucun jeu trouvé.</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  const getMetacriticClass = (score: number) => {
    if (score >= 80) return "metacritic-green";
    if (score >= 60) return "metacritic-yellow";
    return "metacritic-red";
  };

  return (
    <div className="games-container">
      {displayedGames.map((game) => (
        <Link
          key={game.id}
          to={`/games/${game.id}`}
          className="game-title-link"
        >
          <div className="game-card">
            <picture>
              <source srcSet={game.background_image} type="image/webp" />
              <img
                src={game.background_image || fallbackImage} // 🔥 Utilisation du fallback
                alt={game.name || "Image non disponible"}
                className="game-image"
                loading="lazy"
              />
            </picture>
            <div className="game-info">
              <h2 className="game-title-link">{game.name}</h2>
              <p className="game-release">{formatDate(game.released)}</p>

              <div className="game-notations">
                <span className="game-rating">
                  ⭐ {game.rating > 0 ? game.rating : "Assessment pending"}
                </span>
                {game.metacritic && (
                  <span
                    className={`game-metacritic ${getMetacriticClass(
                      game.metacritic
                    )}`}
                  >
                    {game.metacritic}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GameList;
