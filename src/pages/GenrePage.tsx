import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesByGenre, getGameGenres } from "../services/GameService";
import { Game } from "../services/GameService.types";
import GameCard from "../components/GameCard/GameCard";
import Loader from "../components/Loader/Loader";

import { usePreloadLCP } from "../hooks/usePreloadLCP";

import mainImage from "../assets/images/genre-cover.jpg";
import mainImageWebP from "../assets/images/genre-cover.webp";
import mainImageAvif from "../assets/images/genre-cover.avif";

import "../styles/genrePage.css";
import "../styles/pageLayout.css";

const GenrePage: React.FC = () => {
  usePreloadLCP(); // 🔥 Optimisation LCP automatique
  const { slug } = useParams<{ slug: string }>();
  const [games, setGames] = useState<Game[]>([]);
  const [genreName, setGenreName] = useState<string>("Genre"); // Valeur par défaut pour éviter le flicker
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenreData = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const allGenres = await getGameGenres();
        const matchedGenre = allGenres.find((g) => g.slug === slug);
        if (matchedGenre) {
          setGenreName(matchedGenre.name);
        }

        const response = await getGamesByGenre(slug);
        if (response.results.length === 0) {
          setError("Aucun jeu trouvé pour ce genre.");
        }
        setGames(response.results);
      } catch (err) {
        console.error("❌ Erreur lors de la récupération des jeux :", err);
        setError("Impossible de charger les jeux. Réessayez plus tard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreData();
  }, [slug]);

  return (
    <div className="page__wrapper">
      {/* Image de couverture améliorée */}
      <div className="genre-header">
        <picture
          className={`genre-image-container ${imageLoaded ? "loaded" : ""}`}
        >
          <source srcSet={mainImageAvif} type="image/avif" />
          <source srcSet={mainImageWebP} type="image/webp" />
          <img
            src={mainImage}
            alt="Genre Cover"
            className="genre-cover-img"
            onLoad={() => setImageLoaded(true)}
          />
        </picture>

        <div className="genre-overlay">
          <h1 className="genre-title">🎮 {genreName}</h1>
        </div>
      </div>

      <div className="genre-page">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p className="error-message">❌ {error}</p>
        ) : (
          <div className="genre-list">
            {games.map((game) => (
              <GameCard key={game.id} game={game} width={640} height={360} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
