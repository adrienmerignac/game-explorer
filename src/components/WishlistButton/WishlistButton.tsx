import React from "react";
import { Game } from "../../services/GameService.types";
import { useWishlist } from "../../context/WishlistContext";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.svg";
import heartFilledIcon from "../../assets/images/icons/heart.svg";
import "./WishlistButton.css";

interface WishlistButtonProps {
  game: Game;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ game }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some((g) => g.id === game.id);

  return (
    <button
      className={`wishlist-btn ${isInWishlist ? "added" : ""}`}
      onClick={() =>
        isInWishlist ? removeFromWishlist(game.id) : addToWishlist(game)
      }
    >
      {/* ❤️ Cœur rempli */}
      <img
        src={heartFilledIcon}
        alt="Filled Heart"
        className="wishlist-icon heart-filled"
        loading="lazy"
      />
      {/* 🤍 Cœur vide */}
      <img
        src={heartOutlineIcon}
        alt="Outline Heart"
        className="wishlist-icon heart-outline"
        loading="lazy"
      />

      {/* Texte */}
      {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
    </button>
  );
};

export default WishlistButton;
