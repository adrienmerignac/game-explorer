import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LOCAL_STORAGE_KEY = "viewedGenres";

export const useGameTracking = (gameGenre: string | null) => {
  const location = useLocation();

  useEffect(() => {
    if (gameGenre) {
      let viewedGenres: string[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );

      if (!viewedGenres.includes(gameGenre)) {
        viewedGenres = [...viewedGenres, gameGenre].slice(-5); // Stocke seulement les 5 derniers genres
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(viewedGenres));
      }
    }
  }, [location, gameGenre]); // Se déclenche à chaque changement de page
};
