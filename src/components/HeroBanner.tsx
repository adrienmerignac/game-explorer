import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getPopularGames } from "../services/GameService";
import { Game } from "../services/GameService.types";
import { Link } from "react-router-dom";

const HeroBanner: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getPopularGames();
        const gameList = data.results.slice(0, 10);
        setGames(gameList);

        // ✅ Vérifier si une image est bien définie avant de précharger
        if (gameList.length > 0 && gameList[0].background_image) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.href = gameList[0].background_image;
          link.as = "image";
          document.head.appendChild(link);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des jeux populaires", error);
      }
    };

    fetchGames();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <div className="hero-banner">
      <Slider {...settings}>
        {games.map((game, index) => (
          <div key={game.id} className="hero-slide">
            <Link to={`/game/${game.id}`}>
              <picture>
                {/* ✅ Plus de remplacement direct du format d’image */}
                <source srcSet={game.background_image} type="image/webp" />
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="hero-slide__image"
                  loading={index === 0 ? "eager" : "lazy"}
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
    </div>
  );
};

export default HeroBanner;
