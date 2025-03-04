import { useState } from "react";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.svg";
import heartFilledIcon from "../../assets/images/icons/heart.svg";
import { Game } from "../../services/GameService.types";
const WishlistButton: React.FC<{
  isInWishlist: boolean;
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: number) => void;
  game: Game;
}> = ({ isInWishlist, addToWishlist, removeFromWishlist, game }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={`wishlist-btn ${isInWishlist ? "added" : ""}`}
      onClick={() =>
        isInWishlist ? removeFromWishlist(game.id) : addToWishlist(game)
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={isInWishlist || hovered ? heartFilledIcon : heartOutlineIcon}
        alt="Wishlist"
        className="wishlist-icon"
      />
      {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
    </button>
  );
};
export default WishlistButton;
