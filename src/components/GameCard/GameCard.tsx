import React from "react";
import { Link } from "react-router-dom";
import fallbackImage from "../../assets/images/fallback-image.webp";
import "./GameCard.css";

interface GameCardProps {
  game: {
    id: number;
    name: string;
    background_image: string | null;
    released?: string;
    rating?: number;
    metacritic?: number;
  };
  showImage?: boolean;
  showReleaseDate?: boolean;
  showRating?: boolean;
  showMetacritic?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: "lazy" | "eager";
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("fr-FR");
};

const getMetacriticClass = (score: number) => {
  if (score >= 80) return "metacritic-green";
  if (score >= 60) return "metacritic-yellow";
  return "metacritic-red";
};

const GameCard: React.FC<GameCardProps> = ({
  game,
  showImage = true,
  showReleaseDate = true,
  showRating = true,
  showMetacritic = false,
  size = "md",
  loading = "lazy",
}) => {
  const imageUrl = game.background_image
    ? game.background_image.replace("/media/", "/media/resize/640/-/")
    : fallbackImage;

  return (
    <div className={`game-card game-card--${size}`}>
      <Link to={`/games/${game.id}`} className="game-card-link">
        {showImage && (
          <div className="game-image">
            <img
              src={imageUrl}
              alt={`Cover of ${game.name}`}
              className="game-card-image"
              loading={loading}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        <div className="game-info">
          <h2 className="game-title-link">{game.name}</h2>

          {showReleaseDate && game.released && (
            <p className="game-release">
              📅 <strong>Release:</strong> {formatDate(game.released)}
            </p>
          )}

          {showRating && typeof game.rating === "number" && (
            <p className="game-rating">
              ⭐ <strong>User Rating: </strong> {game.rating.toFixed(1)} / 5
            </p>
          )}

          {showMetacritic && typeof game.metacritic === "number" && (
            <p
              className={`game-metacritic ${getMetacriticClass(
                game.metacritic
              )}`}
            >
              <strong>🎯 Metacritic: </strong>
              <span>{game.metacritic} / 100</span>
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
