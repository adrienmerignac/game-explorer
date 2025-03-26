import React, { useEffect, useState } from "react";
import { getTrendingGames } from "../../services/GameService";
import { Game } from "../../services/GameService.types";
import GameCard from "../GameCard/GameCard";

import "../../styles/trendingGames.css";

const TrendingGames: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchTrendingGames = async () => {
      const data = await getTrendingGames();
      setGames(data);
    };
    fetchTrendingGames();
  }, []);

  return (
    <section className="trending-section">
      <h2>🔥 MOST PLAYED AT THE MOMENT</h2>
      <div className="trending-games">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            showImage
            showReleaseDate={false}
            showRating={false}
            showMetacritic={false}
            size="sm"
            className="scroll-card trending-custom"
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingGames;
