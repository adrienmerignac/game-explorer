"use client";

import { useState, useEffect } from "react";
import { fetchRandomGame } from "../../services/GameService";
import "../../styles/roulette.css";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
}

const Roulette = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [MotionDiv, setMotionDiv] = useState<React.ElementType | null>(null);

  // Charger Framer Motion uniquement côté client
  useEffect(() => {
    import("framer-motion").then((mod) => setMotionDiv(() => mod.motion.div));
  }, []);

  const spinRoulette = async () => {
    setIsSpinning(true);
    setSelectedGame(null);

    try {
      const randomGame = await fetchRandomGame();
      if (randomGame) {
        setTimeout(() => {
          setSelectedGame(randomGame);
          setIsSpinning(false);
        }, 2000);
      } else {
        setIsSpinning(false);
      }
    } catch (error) {
      console.error("Error fetching games:", error);
      setIsSpinning(false);
    }
  };

  return (
    <section className="roulette-section">
      <h2 className="section-title">🎲 Try Your Luck!</h2>
      <p className="section-subtitle">
        Spin the roulette to discover a random game
      </p>
      <div className="roulette-container">
        {MotionDiv ? (
          <MotionDiv
            className="roulette-wheel"
            animate={{ rotate: isSpinning ? 1080 : 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            🎲
          </MotionDiv>
        ) : (
          <div className="roulette-wheel">🎲</div>
        )}
        <button
          className="spin-button"
          onClick={spinRoulette}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin the Roulette"}
        </button>
        {selectedGame && (
          <div className="roulette-game-card">
            <img
              className="roulette-game-image"
              src={selectedGame.background_image}
              alt={selectedGame.name}
            />
            <div className="roulette-game-info">
              <h3 className="roulette-game-title">{selectedGame.name}</h3>
              <p className="roulette-game-rating">⭐ {selectedGame.rating}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Roulette;
