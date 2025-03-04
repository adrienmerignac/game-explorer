import GameCard from "../GameCard/GameCard";
import fallbackImage from "../../assets/images/fallback-image.webp";
const SimilarGames: React.FC<{
  similarGames: {
    id: number;
    name: string;
    background_image: string | null;
  }[];
}> = ({ similarGames }) => (
  <div className="similar-games">
    <h2>Similar games :</h2>
    <div className="similar-game-list">
      {similarGames.map((game) => (
        <GameCard
          key={game.id}
          game={{
            id: game.id,
            name: game.name,
            background_image: game.background_image || fallbackImage,
          }}
        />
      ))}
    </div>
  </div>
);
export default SimilarGames;
