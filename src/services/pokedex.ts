import axios from "axios";
import config from "@/config";

import type {
  IBerryDataResponse,
  ICommonResult,
  IPokedexResponse,
} from "@/types";

export const initPokedex = async (): Promise<IPokedexResponse> => {
  const { data } = await axios.get<IPokedexResponse>(config.pokedexApiUrl);

  return data;
};

export const fetchBerryData = async (
  url: ICommonResult["url"]
): Promise<IBerryDataResponse> => {
  const { data } = await axios.get<IBerryDataResponse>(url);

  return data;
};
