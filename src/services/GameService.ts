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
        key: API_KEY,
        ordering: "-rating", // Trier par note décroissante
        page: page,
        page_size: pageSize,
      },
    });

    return {
      results: response.data.results,
      count: response.data.count,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux populaires : ", error);
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
    console.error("Erreur lors de la récupération des détails du jeu : ", error);
    throw new Error("Erreur lors du chargement des détails du jeu.");
  }
};
