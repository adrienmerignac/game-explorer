import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getGameDetails,
  getGameScreenshots,
  getSimilarGames,
} from "../../services/GameService";
import DOMPurify from "dompurify";
import { initialState, reducer } from "./GameDetails.const";
import { useGameTracking } from "../../hooks/useGameTracking";
import { useWishlist } from "../../context/WishlistContext";
import "../../styles/gameDetails.css";

import GameCard from "../GameCard/GameCard";
import Loader from "../Loader/Loader"; // 🔥 Import du Loader

import fallbackImage from "../../assets/images/fallback-image.webp";

// ✅ Import des icônes Wishlist
import heartOutlineIcon from "../../assets/images/icons/heart-outline.svg";
import heartFilledIcon from "../../assets/images/icons/heart.svg";

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [similarGames, setSimilarGames] = useState<
    { id: number; name: string; background_image: string | null }[]
  >([]);

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some((g) => g.id === Number(id));
  const [hovered, setHovered] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const fetchGameDetails = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const data = await getGameDetails(id!);
      dispatch({ type: "SUCCESS", payload: data });

      const screenshotsData = await getGameScreenshots(id!);
      setScreenshots(screenshotsData || []);

      if (data.genres.length) {
        const similarGamesData = await getSimilarGames(
          data.genres.map((g) => g.slug), // Récupère les genres sous forme de slug
          id!
        );
        setSimilarGames(similarGamesData.results || []);
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
        payload: `Impossible de charger les détails du jeu. ${err}`,
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchGameDetails();
    }
  }, [fetchGameDetails, id]);

  const { game } = state;

  useGameTracking(game?.genres?.[0]?.slug || null);

  if (state.loading) return <Loader />;
  if (state.error) return <div>{state.error}</div>;

  return (
    <>
      {game && (
        <div className="game-details-container">
          <div className="game-header">
            <h1 className="game-title">{game.name}</h1>

            {/* ❤️ Bouton Wishlist */}
            <button
              className={`wishlist-btn ${isInWishlist ? "added" : ""}`}
              onClick={() =>
                isInWishlist ? removeFromWishlist(game.id) : addToWishlist(game)
              }
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src={
                  isInWishlist || hovered ? heartFilledIcon : heartOutlineIcon
                }
                alt="Wishlist"
                className="wishlist-icon"
                loading="lazy"
              />
              {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {/* 📝 Infos principales */}
          <div className="game-info">
            <p>
              <strong>Release date :</strong> {formatDate(game.released)}
            </p>
            <p>
              <strong>Average playing time :</strong> {game.playtime || "N/A"}{" "}
              hours
            </p>
            <p>
              <strong>Genres :</strong>{" "}
              {game.genres?.map((g) => g.name).join(", ") || "N/A"}
            </p>
            <p>
              <strong>Developer :</strong>{" "}
              {game.developers?.map((d) => d.name).join(", ") || "N/A"}
            </p>
            <p>
              <strong>Editor :</strong>{" "}
              {game.publishers?.map((p) => p.name).join(", ") || "N/A"}
            </p>
          </div>

          {/* 🔗 Recherche de trailer sur YouTube */}
          <div className="youtube-link">
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                game.name + " trailer"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              🎥 Watch the trailers on YouTube
            </a>
          </div>

          {/* 📸 Galerie d'images */}
          <div className="screenshots-gallery">
            {screenshots.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Screenshot ${index + 1}`}
                className="screenshot-image"
              />
            ))}
          </div>

          {/* 📝 Description */}
          <div
            className="game-description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(game.description),
            }}
          />

          {/* 🎮 Plateformes */}
          <div className="platform-list">
            <h3>Compatible platforms :</h3>
            <ul>
              {game.parent_platforms?.map((platform) => (
                <li key={platform.platform.id}>{platform.platform.name}</li>
              ))}
            </ul>
          </div>

          {/* 🔄 Jeux similaires avec GameCard */}
          {similarGames.length > 0 && (
            <div className="similar-games">
              <h3>Similar games</h3>
              <div className="similar-game-list">
                {similarGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={{
                      id: game.id,
                      name: game.name,
                      background_image: game.background_image || fallbackImage,
                      released: "",
                      rating: undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GameDetails;
