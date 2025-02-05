import React from "react";
import { Game } from "../services/GameService";
import "../assets/css/App.css"; // Import your styles

interface GameListProps {
  games: Game[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
  if (games.length === 0) {
    return <p className="no-games">Aucun jeu trouvé.</p>;
  }

  return (
    <div className="games-container">
      {games.map((game) => (
        <div key={game.id} className="game-card">
          <img src={game.background_image} alt={game.name} className="game-image" />
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
