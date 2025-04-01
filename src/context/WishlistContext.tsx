import React, { createContext, useContext, useEffect, useState } from "react";
import { Game } from "../services/GameService.types";

interface WishlistContextType {
  wishlist: Game[];
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId: number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<Game[]>(() => {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (game: Game) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.some((g) => g.id === game.id)) {
        return [...prevWishlist, game];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (gameId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((g) => g.id !== gameId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
