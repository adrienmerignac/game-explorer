import axios from "axios";
import { API_KEY } from "./GameService.const";
import { Game, GamesResponse } from "./GameService.types";

// ============================
// ⚡ Configuration de l'API
// ============================
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const GAME_DETAILS_URL = `https://api.rawg.io/api/games`; // Endpoint pour récupérer un jeu spécifique

// ============================
// 🎮 Fonctions de récupération des jeux
// ============================

/**
 * Récupérer les jeux populaires (triés par classement et note)
 */
export const getPopularGames = async (
  page = 1,
  pageSize = 15
): Promise<GamesResponse> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        // genres: "role-playing-games-rpg", // ✅ Filtre les RPG
        key: API_KEY,
        ordering: "-rating", // Trie par note décroissante
        page,
        page_size: pageSize,
      },
    });

    // 🔥 Exclure les jeux qui contiennent "simulation" dans leurs genres
    const filteredResults = response.data.results.filter(
      (game: Game) =>
        game.genres &&
        !game.genres.some(
          (genre) => genre.slug === "simulation" || genre.slug === "indie"
        )
    );

    return {
      results: filteredResults,
      count: filteredResults.length,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux RPG :", error);
    return { results: [], count: 0 };
  }
};

/**
 * Récupérer une liste de jeux avec une option de recherche
 */
export const fetchGames = async (
  page = 1,
  pageSize = 10,
  searchQuery = ""
): Promise<GamesResponse> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        ordering: "-metacritic", // Trier par note
        page,
        page_size: pageSize,
        search: searchQuery, // Ajout de la recherche
      },
    });

    return {
      results: response.data.results,
      count: response.data.count,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux :", error);
    return { results: [], count: 0 };
  }
};

/**
 * Récupérer un jeu aléatoire
 */
export const fetchRandomGame = async (): Promise<Game | null> => {
  try {
    const randomPage = Math.floor(Math.random() * 100) + 1;

    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        page: randomPage,
        page_size: 20, // Augmente le nombre de jeux récupérés
        ordering: "-rating", // Tri par date pour varier les jeux récents
      },
    });

    const games = response.data.results;
    if (games.length === 0) return null;

    return games[Math.floor(Math.random() * games.length)];
  } catch (error) {
    console.error("Erreur lors de la récupération du jeu aléatoire :", error);
    return null;
  }
};

/**
 * Récupérer les détails d'un jeu spécifique
 */
export const getGameDetails = async (id: string): Promise<Game> => {
  try {
    const response = await axios.get(`${GAME_DETAILS_URL}/${id}`, {
      params: { key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du jeu :", error);
    throw new Error("Erreur lors du chargement des détails du jeu.");
  }
};

// ============================
// 🔥 Fonctions de recommandation et tendances
// ============================

/**
 * Récupérer des jeux recommandés selon les genres favoris
 */
export const getRecommendedGames = async ({
  favoriteGenres = [],
  signal,
}: { favoriteGenres?: string[]; signal?: AbortSignal } = {}) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        genres: favoriteGenres.length > 0 ? favoriteGenres.join(",") : "action",
        key: API_KEY,
        ordering: "-rating",
        page_size: 10,
      },
      signal,
    });

    // 🔥 Exclure les jeux qui contiennent "simulation" dans leurs genres
    const filteredResults = response.data.results.filter(
      (game: Game) =>
        game.genres &&
        !game.genres.some(
          (genre) => genre.slug === "simulation" || genre.slug === "indie"
        )
    );

    return filteredResults;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("Requête annulée :", error.message);
    } else {
      console.error("Erreur lors du chargement des recommandations :", error);
    }
    return [];
  }
};

/**
 * Récupérer les jeux tendances
 */
export const getTrendingGames = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        ordering: "-added", // Trie par popularité
        page_size: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erreur lors du chargement des jeux tendances :", error);
    return [];
  }
};

/**
 * Récupérer les jeux à venir
 */
export const getUpcomingGames = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const endOfYear = `${new Date().getFullYear()}-12-31`;

    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        dates: `${today},${endOfYear}`,
        ordering: "released",
        page_size: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erreur lors du chargement des jeux à venir:", error);
    return [];
  }
};

// ✅ Récupérer les captures d'écran d'un jeu
export const getGameScreenshots = async (id: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${GAME_DETAILS_URL}/${id}/screenshots`, {
      params: { key: API_KEY },
    });
    return response.data.results.map(
      (screenshot: { image: string }) => screenshot.image
    );
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des captures d'écran :",
      error
    );
    return [];
  }
};

// ✅ Récupérer des jeux similaires
export const getSimilarGames = async (
  genres: string[],
  currentGameId: string
): Promise<GamesResponse> => {
  if (!genres.length) return { results: [], count: 0 };

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        genres: genres.join(","), // Filtrer par les mêmes genres
        ordering: "-rating", // Trier par popularité
        page_size: 10, // Limiter à 6 jeux similaires
      },
    });

    const similarGames = response.data.results.filter(
      (game: Game) =>
        game.id.toString() !== currentGameId &&
        !game.genres.some((genre) => genre.slug === "indie")
    );

    return {
      results: similarGames,
      count: similarGames.length,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des jeux similaires :",
      error
    );
    return { results: [], count: 0 };
  }
};

// ✅ Récupérer les développeurs et éditeurs d'un jeu
export const getGameDevelopers = async (
  id: string
): Promise<{ developers: string[]; publishers: string[] }> => {
  try {
    const response = await axios.get(`${GAME_DETAILS_URL}/${id}`, {
      params: { key: API_KEY },
    });

    return {
      developers:
        response.data.developers?.map((dev: { name: string }) => dev.name) ||
        [],
      publishers:
        response.data.publishers?.map((pub: { name: string }) => pub.name) ||
        [],
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des développeurs et éditeurs :",
      error
    );
    return { developers: [], publishers: [] };
  }
};

/**
 * ✅ Récupérer la liste des genres de jeux depuis RAWG.IO
 */
export const getGameGenres = async (): Promise<
  { id: number; name: string; slug: string }[]
> => {
  try {
    const response = await axios.get("https://api.rawg.io/api/genres", {
      params: { key: API_KEY },
    });
    return response.data.results;
  } catch (error) {
    console.error("Erreur lors de la récupération des genres :", error);
    return [];
  }
};

/**
 * ✅ Récupérer les jeux selon un genre spécifique
 */
export const getGamesByGenre = async (
  genreSlug: string,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_KEY,
        genres: genreSlug, // Filtre par genre
        ordering: "-rating",
        page,
        page_size: pageSize,
      },
    });

    return {
      results: response.data.results,
      count: response.data.count,
    };
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des jeux du genre "${genreSlug}" :`,
      error
    );
    return { results: [], count: 0 };
  }
};
