import styles from "../styles/TareaModal.module.css";
import ReactModal from "react-modal";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { crear_eliminar_tarea } from "../data/acciones";

export default function TareaModal({isOpen, tareaInicial, onClose, onForceClose={}}) {

  const [tarea, setTarea] = useState(tareaInicial)

  const fetchPrelloApi = useFetchPrelloApi()
  const dispatch = useDispatch()

  const {titulo, descripcion} = tarea ?? {titulo: '',descripcion:''}

  const deleteTarea = () => {
    const {id, tablero_id} = tareaInicial
    fetchPrelloApi(`tableros/${tablero_id}/tareas/${id}`, 'DELETE')
    dispatch(crear_eliminar_tarea(tablero_id, id))
    onForceClose()
  }

  return (
      <ReactModal
        shouldCloseOnEsc={true}
        onRequestClose={() => {
          onClose(tarea);
        }}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.50)",
            backdropFilter: "blur(1px)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            width: "50%",
            height: "50%",
            margin: "auto",
            backgroundColor: "black",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        isOpen={isOpen}
      >
        <div className={styles.modalInnerContainer}>
          <div className={styles.leftContainer}>
            <input className={styles.titulo} value={titulo} onChange={ event => setTarea({...tarea, titulo: event.target.value})}/>
            <textarea className={styles.descripcionModal} value={descripcion} onChange={ event => setTarea({...tarea, descripcion: event.target.value})}/>
          </div>
          <div className={styles.rightContainer}>
            <div>
              <div className={styles.button} style={{backgroundColor: 'red'}} onClick={()=> deleteTarea()}><b>Eliminar tarea</b></div>
            </div>
            <div>
              <div className={styles.button}><b>Prueba</b></div>
              <div className={styles.button}><b>Prueba</b></div>
            </div>
          </div>
        </div>
      </ReactModal>
  );
}
