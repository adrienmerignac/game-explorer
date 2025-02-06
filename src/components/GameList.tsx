import React, { useEffect, useState, useMemo } from "react";
import { Game } from "../services/GameService/GameService.types";

interface GameListProps {
  games: Game[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
  console.log("Rendering GameList", games); // Vérifier le nombre d'affichages

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
            <h2 className="game-title">{game.name}</h2>
            <p className="game-release">{formatDate(game.released)}</p>
            <p className="game-rating">Note : {game.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
