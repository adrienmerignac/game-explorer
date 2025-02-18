export interface Game {
  background_image: string;
  background_image_additional: string;
  description: string;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
  genres: [
    {
      id: number;
      name: string;
      slug: string;
    }
  ];
  id: number;
  metacritic: number;
  metacritic_url: string;
  metacritic_platforms: [
    {
      metascore: number;
      platform: {
        platform: number;
        name: string;
        slug: string;
      };
      url: string;
    }
  ];
  name: string;
  parent_platforms: [
    {
      platform: {
        id: number;
        name: string;
        slug: string;
      };
    }
  ];
  platforms: GamePlateform[];
  playtime: number;
  ratings: {
    [key: string]: {
      id: number;
      title: string;
      count: number;
      percent: number;
    };
  };
  rating: number;
  reddit_url: string;
  released: string;
  slug: string;
  twitch_count: number;
  youtube_count: number;
  website: string;
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
