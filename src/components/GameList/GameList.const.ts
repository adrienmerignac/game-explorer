import { Action, State } from "./GameList.types";

export const initialState: State = {
  loadedGames: [],
  newGames: [],
  isFirstLoad: true,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INITIAL_LOAD":
      return { ...state, loadedGames: action.payload, isFirstLoad: false };
    case "ADD_NEW_GAMES":
      return {
        ...state,
        loadedGames: [...state.loadedGames, ...action.payload],
        newGames: action.payload,
      };
    default:
      return state;
  }
};
