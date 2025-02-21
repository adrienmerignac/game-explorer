import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage/OptimizedImage";
import "../styles/wishlistPage.css";

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="wishlist-page">
      <h2>🎮 Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-message">Your wishlist is empty. Add some games!</p>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((game) => (
            <div key={game.id} className="wishlist-card">
              <OptimizedImage
                src={game.background_image}
                alt={game.name}
                className="wishlist-image"
              />
              <div className="wishlist-info">
                <h3>{game.name}</h3>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(game.id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/" className="back-home-btn">
        🏠 Back to Home
      </Link>
    </div>
  );
};

export default WishlistPage;
