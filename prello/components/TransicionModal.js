import styles from "../styles/EstadoModal.module.css";
import Modal from './Modal'
import { useState } from "react";

export default function TransicionModal({isOpen, onClose, estados}) {
  const [transicion, setTransicion] = useState({})

  return (
      <Modal isOpen={isOpen} onClose={() => onClose(transicion)}>
        <div className={styles.container}>
        <div>{JSON.stringify(estados)}</div>
        </div>
      </Modal>
  );
}