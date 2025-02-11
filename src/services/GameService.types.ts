export interface Game {
  background_image: string;
  id: number;
  description: string;
  metacritic: number;
  name: string;
  playtime: number;
  platforms: GamePlateform[];
  slug: string;
  rating: number;
  released: string;
}

export interface GamesResponse {
  results: Game[];
  count: number;
}

export interface GamePlateform {
  platform: {
    id: number;
    name: string;
    slug: string;
  },
  released_at: string;
  requirements: {
    minimum: string;
    recommended: string;
  }
}
