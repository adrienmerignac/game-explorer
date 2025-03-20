import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GameListProps } from "./GameList.types";
import fallbackImage from "../../assets/images/fallback-image.webp";
import OptimizedImage from "../OptimizedImage/OptimizedImage"; // ✅ Import du composant réutilisable

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

  const getOptimizedImage = (url?: string) => {
    if (!url) return fallbackImage;
    return url.replace("/media/", "/media/resize/640/-/");
  };

  return (
    <div className="games-container">
      {displayedGames.map((game) => (
        <Link key={game.id} to={`/games/${game.id}`} className="game-card-link">
          <div className="game-card">
            <div className="game-image">
              <picture>
                {/* ✅ Utilisation du composant OptimizedImage */}
                <OptimizedImage
                  src={getOptimizedImage(game.background_image)}
                  alt={game.name}
                />
              </picture>
            </div>
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
                    {game.metacritic} / 100
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
