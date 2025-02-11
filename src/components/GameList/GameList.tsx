import React, { useEffect, useReducer, useMemo } from "react";
import { Link } from "react-router-dom";
import { GameListProps } from "./GameList.types";
import { initialState, reducer } from "./GameList.const";

const GameList: React.FC<GameListProps> = ({ games }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isFirstLoad) {
      dispatch({ type: "INITIAL_LOAD", payload: games });
    } else if (games.length > state.loadedGames.length) {
      const newGamesToAdd = games.slice(state.loadedGames.length);
      dispatch({ type: "ADD_NEW_GAMES", payload: newGamesToAdd });
    }
  }, [games, state.isFirstLoad, state.loadedGames.length]);

  const displayedGames = useMemo(() => state.loadedGames, [state.loadedGames]);

  useEffect(() => {
    if (games.length > 0) {
      const largestImage = games[0].background_image;
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = largestImage;
      link.as = "image";
      document.head.appendChild(link);
    }
  }, [games]);

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
        <div
          key={game.id}
          className={`game-card ${state.newGames.includes(game) ? "loading-more" : ""}`}
        >
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
                  className={`game-metacritic ${getMetacriticClass(game.metacritic)}`}
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
