import React, { useState } from "react";
import LoginButton from "../LoginButton/LoginButton";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useWishlist } from "../../context/WishlistContext";
import WishlistDrawer from "../WishlistDrawer/WishlistDrawer";
import "./HeaderActions.css";

const HeaderActions: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { wishlist } = useWishlist();

  return (
    <>
      <div className="header__item header__wishlist">
        <button
          onClick={() => setOpenDrawer(true)}
          className="wishlist-toggle-btn"
        >
          Wishlist <span className="wishlist-badge">{wishlist.length}</span>
        </button>
        <WishlistDrawer
          isOpen={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />
      </div>
      <LoginButton />
      <ThemeToggle />
    </>
  );
};

export default HeaderActions;
