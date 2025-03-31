import React, { useEffect, useState } from "react";
import { getUpcomingGames } from "../../services/GameService";
import { Game } from "../../services/GameService.types";
import GameCard from "../GameCard/GameCard";
import WishlistButton from "../WishlistButton/WishlistButton"; // ✅

import "../../styles/upcomingReleases.css";

const UpcomingReleases: React.FC = () => {
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      const games = await getUpcomingGames();
      setUpcomingGames(games);
      setIsLoading(false);
    };

    fetchUpcomingGames();
  }, []);

  return (
    <section className="upcoming-releases">
      <h2 className="section-title">🚀 Upcoming Releases</h2>
      {isLoading ? (
        <p>Loading upcoming games...</p>
      ) : (
        <div className="upcoming-container">
          {upcomingGames.map((game) => (
            <div key={game.id} className="upcoming-wrapper">
              <GameCard
                game={game}
                showImage
                showReleaseDate
                size="md"
                showRating={false}
                showMetacritic={false}
              />
              <WishlistButton game={game} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingReleases;
