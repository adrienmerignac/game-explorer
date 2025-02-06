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
