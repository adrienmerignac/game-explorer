import React, { useEffect, useState } from "react";
import { Game } from "../services/GameService";
import "../assets/css/App.css"; // Importer tes styles

interface GameListProps {
  games: Game[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
  const [newGames, setNewGames] = useState<Game[]>([]); // Liste des nouveaux jeux à afficher avec l'animation
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true); // Vérifie si c'est le premier chargement
  const [loadedGames, setLoadedGames] = useState<Game[]>([]); // Liste des jeux déjà chargés

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false); // Premier chargement, ne pas appliquer d'animation
      setLoadedGames(games); // Charger les jeux sans animation
    } else {
      // Si ce n'est pas le premier chargement, ajoutons les nouveaux jeux
      const newGamesToAdd = games.slice(loadedGames.length); // Récupère uniquement les nouveaux jeux
      setLoadedGames((prevGames) => [...prevGames, ...newGamesToAdd]); // Ajoute à la liste existante des jeux
      setNewGames(newGamesToAdd); // Ces nouveaux jeux sont ceux à animer
    }
  }, [games]); // Lorsque la liste des jeux change

  if (games.length === 0) {
    return <p className="no-games">Aucun jeu trouvé.</p>;
  }

  return (
    <div className="games-container">
      {loadedGames.map((game) => (
        <div
          key={game.id}
          className={`game-card ${newGames.includes(game) ? "loading-more" : ""}`} // Animation sur les nouveaux jeux seulement
        >
          <img
            src={game.background_image}
            alt={game.name}
            className="game-image"
          />
          <div className="game-info">
            <h2 className="game-title">{game.name}</h2>
            <p className="game-release">{game.released}</p>
            <p className="game-rating">Note : {game.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
