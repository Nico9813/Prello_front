import styles from "../styles/EstadoModal.module.css";
import Modal from './Modal'
import { useState } from "react";

export default function EstadoModal({isOpen, onClose, onSubmit}) {
  const [nombre, setNombre] = useState()

  return (
      <Modal isOpen={isOpen} onClose={onClose} width="75%" height="11%">
        <div className={styles.container}>
          <p>Nuevo estado</p>
          <div className={styles.innerContainer}>
            <label> Nombre</label>
            <input className={styles.titulo} onChange={evt => setNombre(evt.target.value)}/>
          <button onClick={() => {onSubmit(nombre); onClose()}}>Agregar</button>
          </div>
        </div>
      </Modal>
  );
}