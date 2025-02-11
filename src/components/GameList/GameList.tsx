import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GameListProps } from "./GameList.types";

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
        <div key={game.id} className="game-card">
          <img
            src={game.background_image}
            alt={game.name}
            className="game-image"
          />
          <div className="game-info">
            <div className="game-title">
              <Link to={`/games/${game.id}`} className="game-title-link">
                {game.name}
              </Link>
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
            <p className="game-release">{formatDate(game.released)}</p>
            <p className="game-rating">Note : {game.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
