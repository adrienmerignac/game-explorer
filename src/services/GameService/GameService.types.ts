export interface Game {
  background_image: string;
  id: number;
  metacritic: number;
  name: string;
  rating: number;
  released: string;
}

export interface GamesResponse {
  results: Game[];
  count: number;
}
