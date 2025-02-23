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

export const fetchRandomGame = async (): Promise<Game | null> => {
  try {
    // Générer un numéro de page aléatoire (RAWG.io a beaucoup de pages)
    const randomPage = Math.floor(Math.random() * 100) + 1;

    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        page: randomPage, // 🔥 Récupère une page différente à chaque requête
        page_size: 20, // Augmente le nombre de jeux récupérés
        ordering: "-rating", // Tri par date pour varier les jeux récents
      },
    });

    const games = response.data.results;
    if (games.length === 0) return null;

    // 🔥 Choisir un jeu au hasard dans cette page
    return games[Math.floor(Math.random() * games.length)];
  } catch (error) {
    console.error("Erreur lors de la récupération du jeu aléatoire :", error);
    return null;
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
        page_size: 10, // Récupère 10 jeux
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
        page_size: 10, // Récupère 10 jeux
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erreur lors du chargement des jeux tendances :", error);
    return [];
  }
};

export const getUpcomingGames = async () => {
  try {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0]; // Formate en "YYYY-MM-DD"
    const endOfYear = `${today.getFullYear()}-12-31`;

    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        dates: `${formattedToday},${endOfYear}`,
        ordering: "released",
        page_size: 10, // Récupère 10 jeux
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erreur lors du chargement des jeux à venir:", error);
    return [];
  }
};
