import { Game } from "../../services/GameService.types";

export interface State {
  game: Game | null;
  loading: boolean;
  error: string;
}

export type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: Game }
  | { type: "ERROR"; payload: string };
