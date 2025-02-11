import { Action, State } from "./GameDetails.types";

export const initialState: State = {
  game: null,
  loading: true,
  error: "",
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: "" };
    case "SUCCESS":
      return { ...state, loading: false, game: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
