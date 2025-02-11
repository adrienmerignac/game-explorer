import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getPopularGames } from "../services/GameService"; // Ajuste selon ton service
import { Game } from "../services/GameService.types";
import { Link } from "react-router-dom";

const HeroBanner: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getPopularGames();
        setGames(data.results.slice(0, 10)); // Affiche les 5 premiers jeux
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
        {games.map((game) => (
          <div key={game.id} className="hero-slide">
            <Link to={`/game/${game.id}`}>
              <div
                className="hero-slide__background"
                style={{
                  backgroundImage: `url(${game.background_image})`,
                }}
              >
                <div className="hero-slide__overlay">
                  <h2>{game.name}</h2>
                  <p>
                    ⭐ {game.rating} | 🎮{" "}
                    {game.platforms.map((p) => p.platform.name).join(", ")}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroBanner;
