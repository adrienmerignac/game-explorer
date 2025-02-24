import React, { useEffect, useState } from "react";
import { getPopularGames } from "../services/GameService"; // 🔥 API des jeux
import { Game } from "../services/GameService.types";
import { Link } from "react-router-dom";
import "../styles/heroBanner.css"; // ✅ Assurez-vous que le fichier CSS est bien importé

const HeroBanner: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getPopularGames();
        const gameList = data.results.slice(0, 10); // 🎯 Prend les 5 premiers jeux
        setGames(gameList);
      } catch (error) {
        console.error("Erreur lors du chargement des jeux populaires", error);
      }
    };

    fetchGames();
  }, []);

  // ✅ Fonction pour changer de slide automatiquement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [games]);

  // ✅ Fonctions pour la navigation manuelle
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="hero-banner">
      <h2 className="hero-title-section">🎯 Popular Games</h2>

      {games.length === 0 ? (
        <div className="loading-placeholder">Loading...</div>
      ) : (
        <>
          {/* Slider */}
          <div
            className="slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {games.map((game) => (
              <div key={game.id} className="slide">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="slide-image"
                />
                <div className="slide-overlay">
                  <h3>{game.name}</h3>
                  <p>⭐ {game.rating}</p>
                  <Link to={`/games/${game.id}`} className="btn">
                    View the game
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Boutons Previous / Next */}
          <div className="slider-controls">
            <button className="prev" onClick={handlePrev}>
              ❮
            </button>
            <button className="next" onClick={handleNext}>
              ❯
            </button>
          </div>

          {/* ✅ Dots de navigation */}
          <div className="slider-dots" aria-live="polite">
            {games.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                aria-label={`Slide ${index + 1}`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroBanner;
