import axios from "axios";
import { API_KEY } from "./GameService.const";
import { Game, GamesResponse } from "./GameService.types";
import { getCache, setCache } from "./GameService.cache";

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
  const key = `popularGames-${page}-${pageSize}`;
  const cached = getCache<GamesResponse>(key);
  if (cached) return cached;

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        ordering: "-rating",
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

    const result = {
      results: filteredResults,
      count: filteredResults.length,
    };
    setCache(key, result);
    return result;
  } catch (error) {
    console.error("Erreur getPopularGames:", error);
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
  const key = `fetchGames-${page}-${pageSize}-${searchQuery}`;
  const cached = getCache<GamesResponse>(key);
  if (cached) return cached;

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        ordering: "-metacritic",
        page,
        page_size: pageSize,
        search: searchQuery,
      },
    });

    const result = {
      results: response.data.results,
      count: response.data.count,
    };
    setCache(key, result);
    return result;
  } catch (error) {
    console.error("Erreur fetchGames:", error);
    return { results: [], count: 0 };
  }
};

/**
 * Récupérer un jeu aléatoire
 */
export const fetchRandomGame = async (): Promise<Game | null> => {
  const key = `randomGame`;
  const cached = getCache<Game>(key);
  if (cached) return cached;

  try {
    const randomPage = Math.floor(Math.random() * 100) + 1;
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        page: randomPage,
        page_size: 20,
        ordering: "-rating",
      },
    });

    const games = response.data.results;
    if (games.length === 0) return null;

    const game = games[Math.floor(Math.random() * games.length)];
    setCache(key, game);
    return game;
  } catch (error) {
    console.error("Erreur fetchRandomGame:", error);
    return null;
  }
};

/**
 * Récupérer les détails d'un jeu spécifique
 */
export const getGameDetails = async (id: string): Promise<Game> => {
  const key = `gameDetails-${id}`;
  const cached = getCache<Game>(key);
  if (cached) return cached;

  try {
    const response = await axios.get(`${GAME_DETAILS_URL}/${id}`, {
      params: { key: API_KEY },
    });
    setCache(key, response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur getGameDetails:", error);
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
  const key = `recommendedGames-${favoriteGenres.join(",")}`;
  const cached = getCache<Game[]>(key);
  if (cached) return cached;

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

    const filteredResults = response.data.results.filter(
      (game: Game) =>
        game.genres &&
        !game.genres.some(
          (genre) => genre.slug === "simulation" || genre.slug === "indie"
        )
    );
    setCache(key, filteredResults);
    return filteredResults;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("Requête annulée :", error.message);
    } else {
      console.error("Erreur getRecommendedGames:", error);
    }
    return [];
  }
};

/**
 * Récupérer les jeux tendances
 */
export const getTrendingGames = async () => {
  const key = `trendingGames`;
  const cached = getCache<Game[]>(key);
  if (cached) return cached;

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        ordering: "-added",
        page_size: 10,
      },
    });
    setCache(key, response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Erreur getTrendingGames:", error);
    return [];
  }
};

/**
 * Récupérer les jeux à venir
 */
export const getUpcomingGames = async () => {
  const key = `upcomingGames`;
  const cached = getCache<Game[]>(key);
  if (cached) return cached;

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
    setCache(key, response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Erreur getUpcomingGames:", error);
    return [];
  }
};

// ✅ Récupérer les captures d'écran d'un jeu
export const getGameScreenshots = async (id: string): Promise<string[]> => {
  const key = `gameScreenshots-${id}`;
  const cached = getCache<string[]>(key);
  if (cached) return cached;

  try {
    const response = await axios.get(`${GAME_DETAILS_URL}/${id}/screenshots`, {
      params: { key: API_KEY },
    });
    const screenshots = response.data.results.map(
      (screenshot: { image: string }) => screenshot.image
    );
    setCache(key, screenshots);
    return screenshots;
  } catch (error) {
    console.error("Erreur getGameScreenshots:", error);
    return [];
  }
};

// ✅ Récupérer des jeux similaires
export const getSimilarGames = async (
  genres: string[],
  currentGameId: string
): Promise<GamesResponse> => {
  const key = `similarGames-${genres.join(",")}-${currentGameId}`;
  const cached = getCache<GamesResponse>(key);
  if (cached) return cached;

  if (!genres.length) return { results: [], count: 0 };

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        genres: genres.join(","),
        ordering: "-rating",
        page_size: 10,
      },
    });

    const similarGames = response.data.results.filter(
      (game: Game) =>
        game.id.toString() !== currentGameId &&
        !game.genres.some((genre) => genre.slug === "indie")
    );

    const result = {
      results: similarGames,
      count: similarGames.length,
    };
    setCache(key, result);
    return result;
  } catch (error) {
    console.error("Erreur getSimilarGames:", error);
    return { results: [], count: 0 };
  }
};

// ✅ Récupérer les développeurs et éditeurs d'un jeu
export const getGameDevelopers = async (
  id: string
): Promise<{ developers: string[]; publishers: string[] }> => {
  const key = `gameDevelopers-${id}`;
  const cached = getCache<{ developers: string[]; publishers: string[] }>(key);
  if (cached) return cached;

  try {
    const response = await axios.get(`${GAME_DETAILS_URL}/${id}`, {
      params: { key: API_KEY },
    });

    const result = {
      developers:
        response.data.developers?.map((dev: { name: string }) => dev.name) ||
        [],
      publishers:
        response.data.publishers?.map((pub: { name: string }) => pub.name) ||
        [],
    };
    setCache(key, result);
    return result;
  } catch (error) {
    console.error("Erreur getGameDevelopers:", error);
    return { developers: [], publishers: [] };
  }
};

/**
 * ✅ Récupérer la liste des genres de jeux depuis RAWG.IO
 */
export const getGameGenres = async (): Promise<
  { id: number; name: string; slug: string }[]
> => {
  const key = `gameGenres`;
  const cached = getCache<{ id: number; name: string; slug: string }[]>(key);
  if (cached) return cached;

  try {
    const response = await axios.get("https://api.rawg.io/api/genres", {
      params: { key: API_KEY },
    });
    setCache(key, response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Erreur getGameGenres:", error);
    return [];
  }
};

/**
 * ✅ Récupérer les jeux selon un genre spécifique (sortis récemment)
 */
export const getGamesByGenre = async (
  genreSlug: string,
  page = 1,
  pageSize = 10
) => {
  const key = `gamesByGenre-${genreSlug}-${page}-${pageSize}`;
  const cached = getCache<GamesResponse>(key);
  if (cached) return cached;

  try {
    // ✅ Définir la plage de dates (dernières 2 ans)
    const today = new Date().toISOString().split("T")[0];
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const twoYearsAgoFormatted = twoYearsAgo.toISOString().split("T")[0];

    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: API_KEY,
        genres: genreSlug,
        ordering: "-rating,-released",
        dates: `${twoYearsAgoFormatted},${today}`,
        page,
        page_size: pageSize,
      },
    });

    const result = {
      results: response.data.results || [],
      count: response.data.count || 0,
    };
    setCache(key, result);
    return result;
  } catch (error) {
    console.error(`Erreur getGamesByGenre (${genreSlug}):`, error);
    return { results: [], count: 0 };
  }
};
