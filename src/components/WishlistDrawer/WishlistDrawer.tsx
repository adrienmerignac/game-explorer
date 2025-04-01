import React, { useRef, useState } from "react";
import "./WishlistDrawer.css";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const startYRef = useRef<number | null>(null);
  const [swipeClosing, setSwipeClosing] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current !== null) {
      const deltaY = e.touches[0].clientY - startYRef.current;
      if (deltaY > 80) {
        setSwipeClosing(true);
        setTimeout(() => {
          onClose();
          setSwipeClosing(false);
        }, 100);
      }
    }
  };

  return (
    <>
      {isOpen && <div className="wishlist-backdrop" onClick={onClose} />}
      <div
        className={`wishlist-drawer ${isOpen ? "open" : ""} ${
          swipeClosing ? "closing" : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="wishlist-header">
          <h2>My Wishlist ❤️</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        <p className="drawer-tip">You can swipe down or tap away to close.</p>

        {wishlist.length > 0 && (
          <button className="clear-button" onClick={clearWishlist}>
            🗑️ Clear wishlist
          </button>
        )}

        <div className="wishlist-content">
          {wishlist.length === 0 ? (
            <p className="empty">Your wishlist is empty.</p>
          ) : (
            wishlist.map((game) => (
              <div key={game.id} className="wishlist-item">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="wishlist-thumb"
                />
                <div className="wishlist-info">
                  <p className="wishlist-title">{game.name}</p>
                  <Link to={`/game/${game.id}`} className="wishlist-link">
                    View the game
                  </Link>
                </div>
                <button
                  onClick={() => removeFromWishlist(game.id)}
                  className="remove-btn"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;
