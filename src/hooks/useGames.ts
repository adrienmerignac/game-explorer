import { useState, useEffect } from "react";
import { fetchGames } from "../services/GameService";
import { Game, GamesResponse } from "../services/GameService.types";

export const useGames = (page: number, searchQuery: string) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const pageSize = 9; // On charge 9 jeux par requête

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      try {
        const data: GamesResponse = await fetchGames(
          page,
          pageSize,
          searchQuery
        );

        // 🔥 Trier uniquement les nouveaux jeux avant de les ajouter
        const sortedNewGames = data.results.sort(
          (a, b) => b.metacritic - a.metacritic
        );

        setGames((prevGames) => {
          return page === 1
            ? sortedNewGames
            : [...prevGames, ...sortedNewGames];
        });

        // Vérifier s'il reste des jeux à charger
        setHasMore(data.results.length === pageSize);
      } catch (error) {
        console.error("Erreur lors du chargement des jeux :", error);
      }
      setLoading(false);
    };

    getGames();
  }, [page, searchQuery]); // Se met à jour à chaque changement de page ou recherche

  return { games, loading, hasMore };
};
