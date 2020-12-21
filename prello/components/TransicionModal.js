import styles from "../styles/TransicionModal.module.css";
import AddAccionModal from "./AddAccionModal";
import Modal from './Modal'
import { useState } from "react";

export default function TransicionModal({isOpen, onClose, transicion, agregarAccion, eliminarAccion}) {

  //Solo webhooks como acciones

  const { id, estado_inicial, estado_final, acciones } = transicion

  const [crearAccionOpen, setCrearAccionOpen] = useState(false)

  const agregarNuevaAccion = (type, url, method, header, body) => {
    setCrearAccionOpen(false)
    agregarAccion(id, type, url, method, header, body)
  }

  return (
      <Modal isOpen={isOpen} onClose={onClose} height={acciones.length * 5 + 50 +"%"}>
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
          { crearAccionOpen && <AddAccionModal isOpen={crearAccionOpen} onClose={() => setCrearAccionOpen(false)} agregarAccion={agregarNuevaAccion}></AddAccionModal>}
          {acciones.map( (accion, index) => 
            <div className={styles.contenido} key={"accion " + index}>
              <p>Tipo: {accion.type}</p>
              <p>Tipo: {accion.id}</p>
              <p>Url: {accion.payload.url ?? JSON.parse(accion.payload).url}</p>
              <p>Method: {accion.payload.method ?? JSON.parse(accion.payload).method}</p>
              <p>Header: {accion.payload.header ?? JSON.parse(accion.payload).header?? "vacio"}</p>
              <p>Body: {accion.payload.body ?? JSON.parse(accion.payload).body?? "vacio"}</p>
              <button onClick={() => eliminarAccion(id, accion.id)}>Eliminar</button>
            </div>)
          }
        </div>
      </Modal>
  );
}