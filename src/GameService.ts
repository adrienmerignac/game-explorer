import axios from "axios";

const API_URL = "https://api.rawg.io/api/games";
const API_KEY = "29f0afe4dc514feab6344e2d6a947ff4";

export interface GamesResponse {
  results: Game[];
  count: number; // Ajout de count pour la pagination
}

// Interface pour représenter la structure d'un jeu
export interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
  background_image: string;
}

// Fonction pour récupérer les jeux
export const fetchGames = async (
  page: number = 1,
  pageSize: number = 10
): Promise<GamesResponse> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        page: page,
        page_size: pageSize,
      },
    });

    // Retourne l'objet complet contenant results et count
    return {
      results: response.data.results,
      count: response.data.count,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux : ", error);
    return { results: [], count: 0 }; // On retourne une réponse vide en cas d'erreur
  }
};
