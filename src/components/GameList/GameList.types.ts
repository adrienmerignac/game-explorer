import { Game } from "../../services/GameService.types";

export interface GameListProps {
  games: Game[];
}

export type State = {
  loadedGames: Game[];
  newGames: Game[];
  isFirstLoad: boolean;
};

export type Action =
  | { type: "INITIAL_LOAD"; payload: Game[] }
  | { type: "ADD_NEW_GAMES"; payload: Game[] };
