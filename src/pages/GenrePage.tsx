import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGamesByGenre } from "../services/GameService";
import { Game } from "../services/GameService.types"; // 🔥 Import du type Game

const GenrePage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>(); // Récupérer le slug du genre
  const [games, setGames] = useState<Game[]>([]); // 🔥 Correction ici

  useEffect(() => {
    const fetchGenreGames = async () => {
      if (!genre) return;
      const response = await getGamesByGenre(genre);
      setGames(response.results);
    };
    fetchGenreGames();
  }, [genre]);

  return (
    <div className="genre-page">
      <h1>🎮 Jeux {genre}</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <img src={game.background_image} alt={game.name} width="100" />
            <h3>{game.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenrePage;
