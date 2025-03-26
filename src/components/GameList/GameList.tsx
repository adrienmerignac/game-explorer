import React from "react";
import { GameListProps } from "./GameList.types";
import GameCard from "../GameCard/GameCard"; // ✅ Nouveau composant unifié

const GameList: React.FC<GameListProps> = ({ games }) => {
  if (games.length === 0) {
    return <p className="no-games">Aucun jeu trouvé.</p>;
  }

  return (
    <div className="game-card-grid">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          showImage
          showReleaseDate
          showRating
          showMetacritic // ✅ Pour afficher aussi le Metacritic si dispo
          size="md"
        />
      ))}
    </div>
  );
};

export default GameList;
