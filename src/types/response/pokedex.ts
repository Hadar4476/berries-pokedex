export interface IBerryDataResponse {
  id: number;
  name: string;
  size: number;
  smoothness: number;
  soil_dryness: number;
  max_harvest: number;
  growth_time: number;
  natural_gift_power: number;
  natural_gift_type: ICommonResult;
  firmness: ICommonResult;
  item: ICommonResult;
  flavors: IFlavorResult[];
}

export interface IPokedexResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: ICommonResult[];
}

export interface ICommonResult {
  name: string;
  url: string;
}

interface IFlavorResult {
  flavor: ICommonResult;
  potency: number;
}
