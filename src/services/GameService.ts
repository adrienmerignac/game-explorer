import axios from "axios";

const API_URL = "https://api.rawg.io/api/games";
const API_KEY = "29f0afe4dc514feab6344e2d6a947ff4"; // Use your API key here

export interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
  background_image: string;
}

export interface GamesResponse {
  results: Game[];
  count: number;
}

// Fetch games with optional search query, page, and pageSize
export const fetchGames = async (
  page: number = 1,
  pageSize: number = 10,
  searchQuery: string = ""
): Promise<GamesResponse> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        page: page,
        page_size: pageSize,
        search: searchQuery, // Add search query if provided
      },
    });

    return {
      results: response.data.results,
      count: response.data.count,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux : ", error);
    return { results: [], count: 0 };
  }
};
