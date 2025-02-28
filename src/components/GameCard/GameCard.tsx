import React from "react";
import { Link } from "react-router-dom";
import "./GameCard.css";
import fallbackImage from "../../assets/images/fallback-image.webp";

// ✅ Permet d'accepter un Game OU un SimilarGame
interface GameCardProps {
  game: {
    id: number;
    name: string;
    background_image: string | null;
    released?: string;
    rating?: number;
  };
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("fr-FR");
};

const GameCard: React.FC<GameCardProps> = ({
  game,
  width,
  height,
  loading,
}) => {
  return (
    <div className="game-card">
      <Link to={`/games/${game.id}`} className="game-card-link">
        <img
          src={game.background_image || fallbackImage}
          alt={`Cover of ${game.name}`}
          className="game-card-image"
          width={width}
          height={height}
          loading={loading}
        />
        <div className="game-card-content">
          <h3>{game.name}</h3>
          {game.released && (
            <p className="release-date">📅 {formatDate(game.released)}</p>
          )}
          {game.rating !== undefined && (
            <p className="rating">⭐ {game.rating.toFixed(1)}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
