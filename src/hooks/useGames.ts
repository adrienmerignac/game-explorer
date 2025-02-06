import { useState, useEffect } from "react";
import { fetchGames } from "../services/GameService/GameService";
import { Game, GamesResponse } from "../services/GameService/GameService.types";

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

        // Trier les jeux par note décroissante
        const sortedGames = data.results.sort((a, b) => b.rating - a.rating);

        // Si c'est la première page, on remplace, sinon on ajoute à la liste
        setGames((prevGames) =>
          page === 1 ? sortedGames : [...prevGames, ...sortedGames]
        );

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
