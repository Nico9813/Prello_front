import { useSelector } from "react-redux";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { usePrelloApi } from "../hooks/usePrelloApi";
import { useState } from "react";
import AddTableroModal from "./AddTableroModal";

export const NavBar = () => {
  const tableros = useSelector((state) => state.perfil.tableros);
  const { agregarTablero } = usePrelloApi()
  const [ showAddTableroModal, setShowAddTableroModal] = useState()

  return (
    <div className={styles.container}>
      <ul className={styles.lista}>
        <li className={styles.titulo}>
          <Link href="/perfil">
            <a>
              <h3>Perfil</h3>
            </a>
          </Link>
        </li>
        <li className={styles.titulo}>
          <h3>Tableros</h3>
          <button onClick={() => setShowAddTableroModal(true)}>Add</button>
          {showAddTableroModal && <AddTableroModal isOpen={showAddTableroModal} onClose={() => setShowAddTableroModal(false)} onSubmit={agregarTablero}></AddTableroModal>}
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
