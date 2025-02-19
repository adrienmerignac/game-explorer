import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getPopularGames } from "../services/GameService";
import { Game } from "../services/GameService.types";
import { Link } from "react-router-dom";
import fallbackImage from "../assets/images/fallback-image.webp"; // ✅ Placeholder

const HeroBanner: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ Ajout d'un état de chargement

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getPopularGames();
        const gameList = data.results.slice(0, 10);
        setGames(gameList);
        setIsLoading(false); // ✅ Désactive le loader une fois les jeux récupérés

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
    <div className="hero-banner">
      {isLoading ? (
        // ✅ Placeholder visible tant que les jeux ne sont pas chargés
        <div className="hero-placeholder">
          <img
            src={fallbackImage}
            alt="Chargement..."
            className="hero-placeholder__image"
          />
        </div>
      ) : (
        <Slider {...settings}>
          {games.map((game, index) => (
            <div key={game.id} className="hero-slide">
              <Link to={`/games/${game.id}`}>
                <picture>
                  <source srcSet={game.background_image} type="image/webp" />
                  <img
                    src={game.background_image || fallbackImage} // ✅ Utilisation du fallback si besoin
                    alt={game.name}
                    className="hero-slide__image"
                    loading={index === 0 ? "eager" : "lazy"} // ✅ Chargement rapide pour le premier slide
                  />
                </picture>

                <div className="hero-slide__overlay">
                  <h2>{game.name}</h2>
                  <p>
                    ⭐ {game.rating} | 🎮{" "}
                    {game.platforms.map((p) => p.platform.name).join(", ")}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HeroBanner;
