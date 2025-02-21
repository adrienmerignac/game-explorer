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
        ❤️ Wishlist ({wishlist.length})
      </button>
    </div>
  );
};

export default Wishlist;
