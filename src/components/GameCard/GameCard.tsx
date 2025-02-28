import React from "react";
import { Link } from "react-router-dom";
import { Game } from "../../services/GameService.types";
import "./GameCard.css";

interface GameCardProps {
  game: Game;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("fr-FR");
};

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="game-card">
      <Link to={`/games/${game.id}`} className="game-card-link">
        <img
          src={game.background_image || "/fallback-image.jpg"}
          alt={game.name}
          className="game-card-image"
        />
        <div className="game-card-content">
          <h3>{game.name}</h3>
          <p className="release-date">📅 {formatDate(game.released)}</p>
          <p className="rating">⭐ {game.rating.toFixed(1)}</p>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
