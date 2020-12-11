import styles from "../styles/TransicionModal.module.css";
import AddAccionModal from "./AddAccionModal";
import Modal from './Modal'
import { useState } from "react";

export default function TransicionModal({isOpen, onClose, transicion}) {

  //Solo webhooks como acciones

  const { estado_inicial, estado_final, acciones } = transicion

  const [crearAccionOpen, setCrearAccionOpen] = useState(false)

  return (
      <Modal isOpen={isOpen} onClose={onClose} height={[...acciones, ...acciones, ...acciones].length * 5 + 50 +"%"}>
        <div className={styles.container}>
          <div className={styles.tituloContainer}>
            <p>Transicion</p>
          </div>
          <div className={styles.contenido}>
            <p>{estado_inicial.nombre} - {estado_final.nombre}</p>
          </div>
          <div className={styles.tituloContainer}>
            <p>Acciones</p>
            <button onClick={() => setCrearAccionOpen(true)}>Add</button>
          </div>
          { crearAccionOpen && <AddAccionModal isOpen={crearAccionOpen} onClose={() => setCrearAccionOpen(false)}></AddAccionModal>}
          {[...acciones, ...acciones, ...acciones].map( (accion, index) => 
            <div className={styles.contenido} key={"accion " + index}>
              <p>Tipo: {accion.type}</p>
              <p>Url: {JSON.parse(accion.payload).url}</p>
              <p>Method: {JSON.parse(accion.payload).method}</p>
              <p>Header: {JSON.parse(accion.payload).header?? "vacio"}</p>
              <p>Body: {JSON.parse(accion.payload).body?? "vacio"}</p>
            </div>)
          }
        </div>
      </Modal>
  );
}