import styles from "../../styles/Layout.module.css";
import { NavBar } from "../Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { usePrelloApi } from "../../hooks/usePrelloApi";

export const Layout = ({ children }) => {
  const { logout } = useAuth0();
  const [show, setShow] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.fixedTopBar}>
        <button onClick={() => setShow(prevState => !prevState)} className={styles.buttonScrollBar}>
          <img height="20px" src='/menu.svg'/>
        </button>
        <p className={styles.texto}>Prello</p>
        <button className={styles.logOutButton} onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.leftContainer} style={{display: show ? "flex" : "none"}}>
          <NavBar></NavBar>
        </div>
        <div className={styles.rightContainer}>{children}</div>
      </div>
    </div>
  );
};
