import type { IBerryItem } from "@/types";

import styles from "./Berries.module.scss";

import BerryItem from "./BerryItem";

interface BerriesListProps {
  berries: IBerryItem[];
}

const BerriesList = ({ berries }: BerriesListProps) => {
  const berryElements = berries.map((berry) => (
    <BerryItem key={berry.id} {...berry} />
  ));

  return (
    <div className={styles.berriesList}>
      {berries.length > 0 ? (
        berryElements
      ) : (
        <div className={styles.noBerries}>
          <h4>No berries found</h4>
        </div>
      )}
    </div>
  );
};

export default BerriesList;
