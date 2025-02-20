import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getPopularGames } from "../services/GameService";
import { Game } from "../services/GameService.types";
import { Link } from "react-router-dom";
import fallbackImage from "../assets/images/fallback-image.webp"; // ✅ Placeholder

const HeroBanner: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getPopularGames();
        const gameList = data.results.slice(0, 10);
        setGames(gameList);
        setIsLoading(false);

        // ✅ Préchargement de la première image
        if (gameList.length > 0 && gameList[0].background_image) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = gameList[0].background_image;
          link.as = "image";
          document.head.appendChild(link);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des jeux populaires", error);
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <section className="hero-banner-section">
      <h2 className="hero-banner-title">🔥 Featured Games</h2>

      <div className="hero-banner">
        {isLoading ? (
          <div className="hero-placeholder">
            <img
              src={fallbackImage}
              alt="Chargement..."
              className="hero-placeholder__image"
              role="presentation"
            />
          </div>
        ) : (
          <Slider {...settings}>
            {games.map((game, index) => {
              const isHidden = index !== 0; // 🔥 Seul le premier est visible

              return (
                <div
                  key={game.id}
                  className="hero-slide"
                  aria-hidden={isHidden} // ✅ Désactive l'accessibilité des slides cachées
                >
                  <Link
                    to={`/games/${game.id}`}
                    tabIndex={isHidden ? -1 : 0} // ✅ Empêche le focus sur les slides cachées
                    aria-hidden={isHidden}
                  >
                    <picture>
                      <source
                        srcSet={game.background_image}
                        type="image/webp"
                      />
                      <img
                        src={game.background_image || fallbackImage}
                        alt={game.name}
                        className="hero-slide__image"
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "low"}
                        tabIndex={isHidden ? -1 : 0} // ✅ Désactive la sélection des images cachées
                        role="presentation" // ✅ Évite d’être annoncé par les lecteurs d’écran
                      />
                    </picture>

                    <div className="hero-slide__overlay">
                      <h3>{game.name}</h3>
                      <p>
                        ⭐ {game.rating} | 🎮{" "}
                        {game.platforms.map((p) => p.platform.name).join(", ")}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default HeroBanner;
