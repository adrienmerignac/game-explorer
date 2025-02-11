import React, { useEffect, useState, useMemo } from "react";
import { Game } from "../services/GameService.types";
import { Link } from "react-router-dom";

interface GameListProps {
  games: Game[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
  const [newGames, setNewGames] = useState<Game[]>([]); // Liste des nouveaux jeux à animer
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [loadedGames, setLoadedGames] = useState<Game[]>([]);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      setLoadedGames(games);
    } else {
      if (games.length > loadedGames.length) {
        const newGamesToAdd = games.slice(loadedGames.length);
        setLoadedGames((prevGames) => [...prevGames, ...newGamesToAdd]);
        setNewGames(newGamesToAdd);
      }
    }
  }, [games, isFirstLoad, loadedGames]); // Ajout de `isFirstLoad` et `loadedGames` pour éviter des dépendances manquantes

  // Utilisation de useMemo pour éviter des recalculs inutiles
  const displayedGames = useMemo(() => loadedGames, [loadedGames]);

  useEffect(() => {
    // Préchargement des images des jeux
    if (games.length > 0) {
      const largestImage = games[0].background_image; // On prend par défaut la première image
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
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Fonction pour déterminer la classe en fonction du score Metacritic
  const getMetacriticClass = (score: number) => {
    if (score >= 80) return "metacritic-green"; // Bon score : vert
    if (score >= 60) return "metacritic-yellow"; // Score moyen : jaune
    return "metacritic-red"; // Mauvais score : rouge
  };

  return (
    <div className="games-container">
      {displayedGames.map((game) => (
        <div
          key={game.id}
          className={`game-card ${
            newGames.includes(game) ? "loading-more" : ""
          }`}
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
