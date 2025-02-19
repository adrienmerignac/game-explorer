import axios from "axios";
import { API_KEY } from "./GameService.const";
import { Game, GamesResponse } from "./GameService.types";

const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const GAME_DETAILS_URL = `https://api.rawg.io/api/games`; // Pour récupérer un jeu spécifique

// Récupérer les jeux populaires (triés par classement et note)
export const getPopularGames = async (
  page: number = 1,
  pageSize: number = 10
): Promise<GamesResponse> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        genres: "role-playing-games-rpg", // ✅ Filtre les RPG
        key: API_KEY,
        ordering: "-rating", // Trier par note décroissante
        page: page,
        page_size: pageSize,
      },
    });

    // 🔥 Exclure les jeux qui contiennent "indie" dans leurs genres
    const filteredResults = response.data.results.filter(
      (game: Game) =>
        game.genres && !game.genres.some((genre) => genre.slug === "simulation")
    );

    return {
      results: filteredResults,
      count: filteredResults.length,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux RPG : ", error);
    return { results: [], count: 0 };
  }
};

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
        ordering: "-metacritic", // Trier par note
        page: page,
        page_size: pageSize,
        search: searchQuery, // Ajout de la recherche
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

// Récupérer les détails d'un jeu spécifique
export const getGameDetails = async (id: string): Promise<Game> => {
  try {
    const response = await axios.get(`${GAME_DETAILS_URL}/${id}`, {
      params: {
        key: API_KEY, // Ajout de la clé API
      },
    });

    return response.data; // Retourne les détails du jeu
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du jeu : ",
      error
    );
    throw new Error("Erreur lors du chargement des détails du jeu.");
  }
};

export const getRecommendedGames = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        genres: "action", // ✅ Filtre les RPG
        key: API_KEY,
        ordering: "-rating", // Trier par note
        page_size: 5, // 6 recommandations
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Erreur lors du chargement des recommandations :", error);
    return [];
  }
};

export const getTrendingGames = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        ordering: "-added", // 🔥 Trie par popularité (nombre d'ajouts)
        page_size: 5,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erreur lors du chargement des jeux tendances :", error);
    return [];
  }
};
