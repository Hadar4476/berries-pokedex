import berryImg from "@/assets/images/berry.png";

import type { IBerryItem } from "@/types";

import styles from "./Berries.module.scss";

import AppPaper from "../common/AppPaper/AppPaper";

const BerryItem = ({ name, flavors }: IBerryItem) => {
  const flavorElements = flavors?.map((flavorData) => (
    <span key={flavorData} className={styles.flavor}>
      {flavorData}
    </span>
  ));

  return (
    <AppPaper className={styles.berryItem}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.imageContainer}>
            <img src={berryImg} alt={`${name} berry`} />
          </div>
          <span className={styles.name}>{name}</span>
        </div>
        <div className={styles.flavors}>{flavorElements}</div>
      </div>
    </AppPaper>
  );
};

export default BerryItem;
