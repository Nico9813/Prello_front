import styles from "../styles/EstadoModal.module.css";
import Modal from './Modal'
import { useState } from "react";

export default function EstadoModal({isOpen, onClose}) {
  const [nombre, setNombre] = useState()

  return (
      <Modal isOpen={isOpen} onClose={() => onClose(nombre)}>
        <div className={styles.container}>
          <p>Nuevo estado</p>
          <div className={styles.innerContainer}>
            <label> Nombre</label>
            <input className={styles.titulo} onChange={evt => setNombre(evt.target.value)}/>
          </div>
        </div>
      </Modal>
  );
}