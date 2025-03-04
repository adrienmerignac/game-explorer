import React, { useEffect, useReducer, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useGameDetails } from "../../context/GameDetailsContext"; // 🔥 Utilisation du provider Firebase
import {
  getGameDetails,
  getGameScreenshots,
  getSimilarGames,
} from "../../services/GameService";
import DOMPurify from "dompurify";
import { initialState, reducer } from "./GameDetails.const";
import { useGameTracking } from "../../hooks/useGameTracking";
import { usePreloadLCP } from "../../hooks/usePreloadLCP";
import { useWishlist } from "../../context/WishlistContext";
import "../../styles/gameDetails.css";

import GameCard from "../GameCard/GameCard";
import GameReviews from "../GameReviews/GameReviews";
import Loader from "../Loader/Loader"; // 🔥 Loader pour l'attente des données

import fallbackImage from "../../assets/images/fallback-image.webp";
import gameDetailsCoverAVIF from "../../assets/images/game-details-cover.avif";
import gameDetailsCoverWebP from "../../assets/images/game-details-cover.webp";

// ✅ Import des icônes Wishlist
import heartOutlineIcon from "../../assets/images/icons/heart-outline.svg";
import heartFilledIcon from "../../assets/images/icons/heart.svg";

const GameDetails: React.FC = () => {
  usePreloadLCP(); // 🔥 Optimisation LCP automatique
  const { id } = useParams<{ id: string }>();
  const { db } = useGameDetails(); // ✅ Accès à Firebase via le contexte
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
      <div className="game-header">
        <picture>
          <source srcSet={gameDetailsCoverAVIF} type="image/avif" />
          <source srcSet={gameDetailsCoverWebP} type="image/webp" />
          <img
            src={gameDetailsCoverWebP}
            alt="Game Details Cover"
            className="game-cover-img"
          />
        </picture>
        <h1 className="game-title">🎮 {game?.name || "Game Details"}</h1>
      </div>

      {game && (
        <div className="game-details-container">
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
              src={isInWishlist || hovered ? heartFilledIcon : heartOutlineIcon}
              alt="Wishlist"
              className="wishlist-icon"
            />
            {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
          </button>

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

          {/* 📸 Galerie d'images */}
          <div className="screenshots-gallery">
            {screenshots.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Screenshot ${index + 1}`}
                className="screenshot-image"
                width={640}
                height={360}
                loading="lazy"
                fetchPriority="low"
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
            <h2>Compatible platforms :</h2>
            <ul>
              {game.parent_platforms?.map((platform) => (
                <li key={platform.platform.id}>{platform.platform.name}</li>
              ))}
            </ul>
          </div>

          {/* 🔄 Jeux similaires */}
          {similarGames.length > 0 && (
            <div className="similar-games">
              <h2>Similar games :</h2>
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
                    width={300}
                    height={170}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 📝 Avis des utilisateurs (Firebase ne se charge que si `db` est disponible) */}
          {db && <GameReviews gameId={game.id.toString()} />}
        </div>
      )}
    </>
  );
};

export default GameDetails;
