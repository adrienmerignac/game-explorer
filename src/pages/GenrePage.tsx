import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesByGenre, getGameGenres } from "../services/GameService";
import { Game } from "../services/GameService.types";
import "../styles/genrePage.css";

const GenrePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [games, setGames] = useState<Game[]>([]);
  const [genreName, setGenreName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenreData = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const allGenres = await getGameGenres();
        const matchedGenre = allGenres.find((g) => g.slug === slug);
        setGenreName(matchedGenre ? matchedGenre.name : "Genre inconnu");

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
    <div className="genre-page">
      <h1>🎮 Game {genreName}</h1>

      {isLoading ? (
        <p>Loading games...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="genre-list">
          {games.map((game) => (
            <li key={game.id} className="genre-item">
              <img src={game.background_image} alt={game.name} />
              <h3>{game.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenrePage;
