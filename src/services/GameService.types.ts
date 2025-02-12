export interface Game {
  background_image: string;
  description: string;
  genres: [
    {
      id: number;
      name: string;
      slug: string;
    }
  ];
  id: number;
  metacritic: number;
  name: string;
  platforms: GamePlateform[];
  playtime: number;
  rating: number;
  released: string;
  slug: string;
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
  };
  released_at: string;
  requirements: {
    minimum: string;
    recommended: string;
  };
}
