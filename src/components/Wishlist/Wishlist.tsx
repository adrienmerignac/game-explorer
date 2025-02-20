import React, { useState, useRef, useEffect } from "react";
import { useWishlist } from "../../context/WishlistContext";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import "../../styles/wishlist.css";

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="wishlist-container" ref={dropdownRef}>
      <button className="wishlist-toggle" onClick={() => setIsOpen(!isOpen)}>
        ❤️ Wishlist ({wishlist.length})
      </button>
      {isOpen && (
        <div className="wishlist-dropdown">
          {wishlist.length === 0 ? (
            <p className="empty-message">Your wishlist is empty.</p>
          ) : (
            <ul className="wishlist-list">
              {wishlist.map((game) => (
                <li key={game.id} className="wishlist-item">
                  <OptimizedImage
                    src={game.background_image}
                    alt={game.name}
                    className="wishlist-image"
                  />
                  <span className="wishlist-title">{game.name}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(game.id)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
