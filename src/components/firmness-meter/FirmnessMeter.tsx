import { useMemo } from "react";
import useResponsive from "@/hooks/useResponsive";

import { FIRMNESS_LEVEL, type BerryPokedex } from "@/types";

import styles from "./FirmnessMeter.module.scss";

interface FirmnessMeterProps {
  pokedex: BerryPokedex;
  selectedFirmnessLevel: FIRMNESS_LEVEL;
  emitSelectFirmnessLevel: (level: FIRMNESS_LEVEL) => void;
}

const FirmnessMeter = ({
  pokedex,
  selectedFirmnessLevel,
  emitSelectFirmnessLevel,
}: FirmnessMeterProps) => {
  const { isMobile } = useResponsive();

  const isSoft =
    selectedFirmnessLevel === FIRMNESS_LEVEL.SOFT ||
    selectedFirmnessLevel === FIRMNESS_LEVEL.VERY_SOFT;
  const isHard = selectedFirmnessLevel === FIRMNESS_LEVEL.HARD;
  const isAboveHard =
    selectedFirmnessLevel === FIRMNESS_LEVEL.VERY_HARD ||
    selectedFirmnessLevel === FIRMNESS_LEVEL.SUPER_HARD;

  const indicatorPosition = useMemo(() => {
    const levels = Object.values(FIRMNESS_LEVEL);
    const selectedIndex = levels.indexOf(selectedFirmnessLevel);
    const totalLevels = levels.length;

    return (selectedIndex / (totalLevels - 1)) * 100;
  }, [selectedFirmnessLevel]);

  const meterSections = Object.values(FIRMNESS_LEVEL).map((level) => {
    return (
      <button
        key={level}
        className={styles.section}
        onClick={() => emitSelectFirmnessLevel(level)}
      ></button>
    );
  });

  const levelElements = Object.entries(pokedex).map((entry, index) => {
    const [key, value] = entry;
    const name = isMobile
      ? key
          .split("-")
          .map((word) => word[0])
          .join("")
      : key.split("-").join(" ");
    const isSelected = selectedFirmnessLevel === key;
    const isLast = Object.entries(pokedex).length - 1 === index;

    const lastStyle = isLast ? styles.lastItem : "";
    let selectedStyle;
    let selectedStyleType;

    if (isSelected) {
      selectedStyle = styles.selectedItem;

      if (isSoft) {
        selectedStyleType = styles.selectedSoft;
      } else if (isHard) {
        selectedStyleType = styles.selectedHard;
      } else if (isAboveHard) {
        selectedStyleType = styles.selectedAboveHard;
      }
    }

    return (
      <button
        key={key}
        className={`${styles.levelItem} ${selectedStyle} ${selectedStyleType} ${lastStyle}`}
        onClick={() => emitSelectFirmnessLevel(key as FIRMNESS_LEVEL)}
      >
        <h3>{name}</h3>
        <span>{value.length}</span>
      </button>
    );
  });

  let indicatorType;

  if (isSoft) {
    indicatorType = styles.indicatorSoft;
  } else if (isHard) {
    indicatorType = styles.indicatorHard;
  } else if (isAboveHard) {
    indicatorType = styles.indicatorAboveHard;
  }

  let offset = 5;
  const isFirstLevel = indicatorPosition === 0;
  const isLastLevel = indicatorPosition === 100;

  if (isFirstLevel) {
    offset = -2;
  } else if (isLastLevel) {
    offset = 12;
  }

  return (
    <div className={styles.firmnessMeter}>
      <div className={styles.container}>
        <div className={styles.meter}>
          <div
            className={`${styles.indicator} ${indicatorType}`}
            style={{
              ...(isMobile
                ? { left: `calc(${indicatorPosition}% - ${offset}%)` }
                : { top: `calc(${indicatorPosition}% - ${offset}%)` }),
            }}
          ></div>
          {meterSections}
        </div>
        <div className={styles.levels}>{levelElements}</div>
      </div>
    </div>
  );
};

export default FirmnessMeter;
