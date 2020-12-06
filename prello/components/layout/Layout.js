import styles from "../../styles/Layout.module.css";
import { NavBar } from "../Navbar";
import * as Colors from "../../constants/colors";
import { useState } from "react";

export const Layout = ({ children }) => {
  const [show, setShow] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.fixedTopBar}>
        <button onClick={() => setShow(prevState => !prevState)} className={styles.buttonScrollBar}></button>
        <p className={styles.texto}>Prello</p>
        <p className={styles.texto}>Log out</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.leftContainer} style={{display: show ? "flex" : "none"}}>
          <NavBar></NavBar>
        </div>
        <div className={styles.rightContainer} style={{width: show? '80%' : '90%'}}>{children}</div>
      </div>
    </div>
    
  );
};
