import React, { useState, useEffect, useCallback } from "react";
import { getRecommendedGames } from "../../services/GameService";
import { Game } from "../../services/GameService.types";
import { Link } from "react-router-dom";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import fallbackImage from "../../assets/images/fallback-image.webp";
import "../../styles/recommendedGames.css";

const LOCAL_STORAGE_KEY = "viewedGenres";

const useViewedGenres = () => {
  const [viewedGenres, setViewedGenres] = useState<string[]>([]);

  useEffect(() => {
    const storedGenres = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    setViewedGenres(storedGenres);
  }, []);

  return viewedGenres;
};

const RecommendedGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [noRecommendations, setNoRecommendations] = useState<boolean>(false);
  const viewedGenres = useViewedGenres();

  const fetchRecommendations = useCallback(
    async (signal: AbortSignal) => {
      if (viewedGenres.length === 0) {
        setNoRecommendations(true); // ✅ Ajoute un état pour afficher "No recommendations found."
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setNoRecommendations(false);

      try {
        const data = await getRecommendedGames({
          favoriteGenres: viewedGenres,
          signal,
        });
        setGames(data);
        if (data.length === 0) setNoRecommendations(true); // ✅ Vérifie si l'API renvoie une liste vide
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Failed to load recommendations. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [viewedGenres]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchRecommendations(controller.signal);
    return () => controller.abort();
  }, [fetchRecommendations]);

  return (
    <section className="recommended-section">
      <h2>🎯 Recommended for you</h2>

      {loading && <p className="loading-text">Loading recommendations...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && noRecommendations && (
        <p className="no-results-text">No recommendations found.</p>
      )}

      {!loading && !error && games.length > 0 && (
        <div className="recommended-games">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link
    key={game.id}
    className="recommended-game-link"
    to={`/games/${game.id}`}
  >
    <div className="game-card-recommended">
      <OptimizedImage
        src={game.background_image || fallbackImage}
        alt={game.name}
        className="game-card__image"
        loading="lazy"
      />
      <div className="game-card__content">
        <h3 className="game-card-recommended-title">{game.name}</h3>
        <p>⭐ {game.rating > 0 ? game.rating : "Assessment pending"}</p>
      </div>
    </div>
  </Link>
);

export default RecommendedGames;
