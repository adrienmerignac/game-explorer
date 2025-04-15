import React from "react";
import { Game } from "../../services/GameService.types";
import { useWishlist } from "../../context/WishlistContext";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.svg";
import heartFilledIcon from "../../assets/images/icons/heart.svg";
import "./WishlistButton.css";
import { toast } from "react-toastify";

interface WishlistButtonProps {
  game: Game;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ game }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some((g) => g.id === game.id);

  const handleClick = () => {
    if (isInWishlist) {
      removeFromWishlist(game.id);
      toast.info("Removed from wishlist", { toastId: `remove-${game.id}` });
    } else {
      addToWishlist(game);
      toast.success("Added to wishlist", { toastId: `add-${game.id}` });
    }
  };

  return (
    <button
      className={`wishlist-btn ${isInWishlist ? "added" : ""}`}
      onClick={handleClick}
    >
      <img
        src={heartFilledIcon}
        alt="Filled Heart"
        className="wishlist-icon heart-filled"
        loading="lazy"
      />
      <img
        src={heartOutlineIcon}
        alt="Outline Heart"
        className="wishlist-icon heart-outline"
        loading="lazy"
      />
      {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
    </button>
  );
};

export default WishlistButton;
