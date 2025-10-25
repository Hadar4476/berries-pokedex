import { useEffect, useMemo, useReducer, useRef } from "react";
import useDebounce from "@/hooks/useDebounce";

import { fetchBerryData, initPokedex } from "@/services/pokedex";
import pokedexUtilities from "@/utilities/pokedex";

import {
  pokedexReducer,
  initialPokedexState,
  pokedexActions,
} from "@/reducers/pokedexReducer";

import { type IBerryDataResponse, type IBerryItem } from "@/types";

import styles from "./Pokedex.module.scss";

import AppPaper from "./common/AppPaper/AppPaper";
import BerriesList from "./berries/BerriesList";
import FirmnessMeter from "./firmness-meter/FirmnessMeter";

const Pokedex = () => {
  const [state, dispatch] = useReducer(pokedexReducer, initialPokedexState);
  const debouncedSearchQuery = useDebounce(state.searchQuery, 500);
  const hasInitialized = useRef(false);

  const displayedBerries: IBerryItem[] = useMemo(() => {
    if (!state.pokedex) {
      return [];
    }

    const berriesAtFirmnessLevel = state.pokedex[state.selectedFirmnessLevel];

    if (debouncedSearchQuery.trim() === "") {
      return berriesAtFirmnessLevel;
    }

    const query = debouncedSearchQuery.toLowerCase();

    return berriesAtFirmnessLevel.filter((berry) =>
      berry.name.toLowerCase().includes(query)
    );
  }, [state.selectedFirmnessLevel, state.pokedex, debouncedSearchQuery]);

  useEffect(() => {
    const fetchBerries = async () => {
      try {
        dispatch(pokedexActions.setLoading(true));
        const data = await initPokedex();

        if (data) {
          const berryPromises = data.results.map((berry) =>
            fetchBerryData(berry.url).catch((error) => {
              console.error(`Failed to fetch ${berry.name}:`, error);
              return null;
            })
          );

          const berryDataArray = await Promise.all(berryPromises);

          const successfulBerries: IBerryDataResponse[] = berryDataArray.filter(
            (berry) => berry !== null
          );

          const pokedex = pokedexUtilities.createPokedex(successfulBerries);

          dispatch(pokedexActions.setPokedex(pokedex));
        }
      } catch (error) {
        console.error(error);
        dispatch(pokedexActions.setError("Failed to load berries"));
      }
    };

    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchBerries();
    }
  }, []);

  return (
    <div className={styles.pokedex}>
      <AppPaper className={styles.appPaper}>
        <div className={styles.heading}>
          <h2>Pok'e Berries</h2>
          <span>How tough are you ?</span>
        </div>
        {state.pokedex && (
          <>
            <input
              className={styles.searchBar}
              id="search"
              name="search"
              type="text"
              placeholder="Search by name.."
              value={state.searchQuery}
              onChange={(e) =>
                dispatch(pokedexActions.setSearchQuery(e.target.value))
              }
            />
            <div className={styles.container}>
              <FirmnessMeter
                pokedex={state.pokedex}
                selectedFirmnessLevel={state.selectedFirmnessLevel}
                emitSelectFirmnessLevel={(level) =>
                  dispatch(pokedexActions.setFirmnessLevel(level))
                }
              />

              {state.isLoading && (
                <h3 style={{ margin: "auto" }}>Loading berries...</h3>
              )}
              {state.error && <p className={styles.error}>{state.error}</p>}

              <BerriesList berries={displayedBerries} />
            </div>
          </>
        )}
      </AppPaper>
    </div>
  );
};

export default Pokedex;
