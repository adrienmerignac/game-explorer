import { useState, useEffect } from "react";
import { fetchGames, Game, GamesResponse } from "../services/GameService";

export const useGames = (page: number, searchQuery: string) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    const getGames = async () => {
      setLoading(true);
      try {
        const data: GamesResponse = await fetchGames(
          page,
          pageSize,
          searchQuery
        );
        setGames(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (error) {
        console.error("Error fetching games:", error);
        setGames([]); // Avoid breaking UI on errors
      }
      setLoading(false);
    };

    getGames();
  }, [page, searchQuery]); // Fetch games whenever `page` or `searchQuery` changes

  return { games, loading, totalPages };
};
