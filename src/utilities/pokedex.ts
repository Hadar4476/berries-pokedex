import {
  FIRMNESS_LEVEL,
  type BerryPokedex,
  type IBerryDataResponse,
  type IBerryItem,
} from "@/types";

const pokedexUtilities = {
  createPokedex: (data: IBerryDataResponse[]) => {
    const pokedex: BerryPokedex = {
      [FIRMNESS_LEVEL.SUPER_HARD]: [],
      [FIRMNESS_LEVEL.VERY_HARD]: [],
      [FIRMNESS_LEVEL.HARD]: [],
      [FIRMNESS_LEVEL.SOFT]: [],
      [FIRMNESS_LEVEL.VERY_SOFT]: [],
    };

    data.forEach((berry) => {
      const firmnessLevel = berry.firmness.name as FIRMNESS_LEVEL;
      const flavors = berry.flavors.map((f) => f.flavor.name);

      const berryItem: IBerryItem = {
        id: berry.id,
        name: berry.name,
        flavors: flavors,
      };

      pokedex[firmnessLevel].push(berryItem);
    });

    return pokedex;
  },
};

export default pokedexUtilities;
