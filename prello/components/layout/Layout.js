import styles from "../../styles/Layout.module.css";
import { NavBar } from "../Navbar";
import * as Colors from "../../constants/colors";

export const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <NavBar></NavBar>
      </div>
      <div className={styles.rightContainer}>{children}</div>
    </div>
  );
};
