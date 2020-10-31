import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export const NavBar = () => {
  const tableros = useSelector((state) => state.perfil.tableros);

  return (
    <div className={styles.container}>
      <ul className={styles.lista}>
        <li className={styles.item_lista}>
          <Link href="/perfil">
            <a>
              <h3>Perfil</h3>
            </a>
          </Link>
        </li>
        <li className={styles.item_lista}>
          <h3>Tableros</h3>
        </li>
        <li className={styles.item_lista}>
          <div className={styles.sublista}>
            {tableros.map((tablero, index) => (
              <div className={styles.item_lista} key={index}>
                <Link href={`/tablero/${tablero.id}`}>
                  <a className={styles.texto}>{tablero.nombre}</a>
                </Link>
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};
