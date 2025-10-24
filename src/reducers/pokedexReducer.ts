import { FIRMNESS_LEVEL, type BerryPokedex, type IPokedexState } from "@/types";

export type PokedexAction =
  | { type: "SET_POKEDEX"; payload: BerryPokedex }
  | { type: "SET_FIRMNESS_LEVEL"; payload: FIRMNESS_LEVEL }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_SEARCH" };

export const initialPokedexState: IPokedexState = {
  pokedex: null,
  selectedFirmnessLevel: FIRMNESS_LEVEL.SOFT,
  searchQuery: "",
  isLoading: false,
  error: null,
};

export const pokedexReducer = (
  state: IPokedexState,
  action: PokedexAction
): IPokedexState => {
  switch (action.type) {
    case "SET_POKEDEX":
      return { ...state, pokedex: action.payload, isLoading: false };
    case "SET_FIRMNESS_LEVEL":
      return { ...state, selectedFirmnessLevel: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "RESET_SEARCH":
      return { ...state, searchQuery: "" };
    default:
      return state;
  }
};

export const pokedexActions = {
  setPokedex: (payload: BerryPokedex): PokedexAction => ({
    type: "SET_POKEDEX",
    payload,
  }),
  setFirmnessLevel: (payload: FIRMNESS_LEVEL): PokedexAction => ({
    type: "SET_FIRMNESS_LEVEL",
    payload,
  }),
  setSearchQuery: (payload: string): PokedexAction => ({
    type: "SET_SEARCH_QUERY",
    payload,
  }),
  setLoading: (payload: boolean): PokedexAction => ({
    type: "SET_LOADING",
    payload,
  }),
  setError: (payload: string | null): PokedexAction => ({
    type: "SET_ERROR",
    payload,
  }),
  resetSearch: (): PokedexAction => ({
    type: "RESET_SEARCH",
  }),
};
