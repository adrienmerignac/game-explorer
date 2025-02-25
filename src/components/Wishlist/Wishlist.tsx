import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

import "../../styles/wishlist.css";

const Wishlist: React.FC = () => {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="wishlist-container">
      <button className="wishlist-toggle" onClick={() => navigate("/wishlist")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span className="wishlist-toggle-text">Wishlist</span> (
        {wishlist.length})
      </button>
    </div>
  );
};

export default Wishlist;
