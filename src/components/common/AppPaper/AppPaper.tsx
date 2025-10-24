import type React from "react";

import styles from "./AppPaper.module.scss";

interface AppPaperProps {
  className?: string;
  children: React.ReactNode;
}

const AppPaper = ({ className, children }: AppPaperProps) => {
  return <div className={`${styles.appPaper} ${className}`}>{children}</div>;
};

export default AppPaper;
