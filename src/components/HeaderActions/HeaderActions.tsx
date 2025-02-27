import React from "react";
import Wishlist from "../Wishlist/Wishlist";
import LoginButton from "../LoginButton/LoginButton";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const HeaderActions: React.FC = () => (
  <>
    <div className="header__item header__wishlist">
      <Wishlist />
    </div>
    <LoginButton />
    <ThemeToggle />
  </>
);

export default HeaderActions;
