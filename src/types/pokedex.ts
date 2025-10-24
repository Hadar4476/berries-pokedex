export type BerryPokedex = Record<FIRMNESS_LEVEL, IBerryItem[]>;

export interface IBerryItem {
  id: number;
  name: string;
  flavors: string[];
}

export enum FIRMNESS_LEVEL {
  SUPER_HARD = "super-hard",
  VERY_HARD = "very-hard",
  HARD = "hard",
  SOFT = "soft",
  VERY_SOFT = "very-soft",
}

export interface IPokedexState {
  pokedex: BerryPokedex | null;
  selectedFirmnessLevel: FIRMNESS_LEVEL;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}
