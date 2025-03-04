import gameDetailsCoverAVIF from "../../assets/images/game-details-cover.avif";
import gameDetailsCoverWebP from "../../assets/images/game-details-cover.webp";

const GameHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="game-header">
    <picture>
      <source srcSet={gameDetailsCoverAVIF} type="image/avif" />
      <source srcSet={gameDetailsCoverWebP} type="image/webp" />
      <img
        src={gameDetailsCoverWebP}
        alt="Game Details Cover"
        className="game-cover-img"
      />
    </picture>
    <h1 className="game-title">🎮 {title}</h1>
  </div>
);
export default GameHeader;
