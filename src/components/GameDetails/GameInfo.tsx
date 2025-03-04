import { Game } from "../../services/GameService.types";

const formatDate = (dateString: string) =>
  dateString ? new Date(dateString).toLocaleDateString("fr-FR") : "N/A";

const GameInfo: React.FC<{ game: Game }> = ({ game }) => (
  <div className="game-info">
    <p>
      <strong>Release date :</strong> {formatDate(game.released)}
    </p>
    <p>
      <strong>Playtime :</strong> {game.playtime ?? "N/A"} hours
    </p>
    <p>
      <strong>Genres :</strong>{" "}
      {game.genres?.map((g) => g.name).join(", ") || "N/A"}
    </p>
    <p>
      <strong>Developer :</strong>{" "}
      {game.developers?.map((d) => d.name).join(", ") || "N/A"}
    </p>
    <p>
      <strong>Publisher :</strong>{" "}
      {game.publishers?.map((p) => p.name).join(", ") || "N/A"}
    </p>
  </div>
);

export default GameInfo;
