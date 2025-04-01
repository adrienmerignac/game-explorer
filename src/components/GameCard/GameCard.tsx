import React from "react";
import { Link } from "react-router-dom";
import fallbackImage from "../../assets/images/fallback-image.webp";
import "./GameCard.css";

interface GameCardProps {
  game: {
    added?: number;
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
  showWishlistButton?: boolean;
  size?: "sm" | "md" | "lg";
  loading?: "lazy" | "eager";
  className?: string;
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
  className = "",
}) => {
  const imageUrl = game.background_image
    ? game.background_image.replace("/media/", "/media/resize/640/-/")
    : fallbackImage;

  return (
    <div className={`game-card game-card--${size} ${className}`}>
      <Link to={`/games/${game.id}`} className="game-card-link">
        {showImage && (
          <div className="game-image">
            <img
              src={imageUrl}
              alt={`Cover of ${game.name}`}
              className="game-card-image"
              loading={loading}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}

        <div className="game-info">
          <h2 className="game-title-link">{game.name}</h2>

          {className.includes("trending-custom") && game.added && (
            <p className="game-added">
              🧍 <strong>{game.added.toLocaleString("fr-FR")}</strong> joueurs
            </p>
          )}

          {showReleaseDate && game.released && (
            <p className="game-release">
              📅 <strong>Release:</strong> {formatDate(game.released)}
            </p>
          )}

          {showRating && typeof game.rating === "number" && (
            <p className="game-rating">
              ⭐ <strong>User Rating:</strong> {game.rating.toFixed(1)}
            </p>
          )}

          {showMetacritic && typeof game.metacritic === "number" && (
            <>
              <p
                className={`game-metacritic ${getMetacriticClass(
                  game.metacritic
                )}`}
                aria-label="Metacritic score"
              >
                🎯<strong>Metacritic:</strong> {game.metacritic} / 100
              </p>
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
