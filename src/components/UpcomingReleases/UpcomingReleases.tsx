import React, { useEffect, useState } from "react";
import { getUpcomingGames } from "../../services/GameService";
import { Game } from "../../services/GameService.types";
import { useWishlist } from "../../context/WishlistContext";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import fallbackImage from "../../assets/images/fallback-image.webp";

// ✅ Import des icônes cœur vide et rempli
import heartOutlineIcon from "../../assets/images/icons/heart-outline.svg";
import heartFilledIcon from "../../assets/images/icons/heart.svg";

import "../../styles/upcomingReleases.css";

const UpcomingReleases: React.FC = () => {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // ✅ État pour suivre les survols par ID de jeu
  const [hoveredStates, setHoveredStates] = useState<{
    [key: number]: boolean;
  }>({});

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const getOptimizedImage = (url?: string) => {
    if (!url) return fallbackImage;
    return url.replace("/media/", "/media/resize/640/-/");
  };

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      const games = await getUpcomingGames();
      setUpcomingGames(games);
      setIsLoading(false);
    };

    fetchUpcomingGames();
  }, []);

  return (
    <section className="upcoming-releases">
      <h2 className="section-title">🚀 Upcoming Releases</h2>
      {isLoading ? (
        <p>Loading upcoming games...</p>
      ) : (
        <div className="upcoming-container">
          {upcomingGames.map((game) => {
            const isInWishlist = wishlist.some((g) => g.id === game.id);

            return (
              <div key={game.id} className="upcoming-card">
                <OptimizedImage
                  src={getOptimizedImage(game.background_image)}
                  alt={game.name}
                  className="upcoming-image"
                  loading="lazy"
                />
                <div className="upcoming-info">
                  <h3>{game.name}</h3>
                  <p>Release Date: {formatDate(game.released)}</p>
                  <button
                    className={`wishlist-btn ${isInWishlist ? "added" : ""}`}
                    onClick={() =>
                      isInWishlist
                        ? removeFromWishlist(game.id)
                        : addToWishlist(game)
                    }
                    onMouseEnter={() =>
                      setHoveredStates((prev) => ({ ...prev, [game.id]: true }))
                    }
                    onMouseLeave={() =>
                      setHoveredStates((prev) => ({
                        ...prev,
                        [game.id]: false,
                      }))
                    }
                  >
                    <img
                      src={
                        isInWishlist || hoveredStates[game.id]
                          ? heartFilledIcon
                          : heartOutlineIcon
                      }
                      alt="Wishlist"
                      className="wishlist-icon"
                      loading="lazy"
                    />
                    {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default UpcomingReleases;
