import { useDrag, useDrop } from "react-dnd";
import styles from "../styles/Tarea.module.css";
import TareaModal from "./TareaModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { crear_actualizar_tarea, crear_eliminar_tarea } from "../data/acciones";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";
import { useRealTimeDispatch } from "../hooks/useRealTimeSocket";

export default function Tarea(props) {
  const { Tarea } = props;
  const dispatch = useRealTimeDispatch()
  const fetchPrelloApi = useFetchPrelloApi()
  const roles = [];
  const [isOpen, setIsOpen] = useState(false);

  const MAX_LONG = 50;
  const { descripcion } = Tarea;
  const descripcion_acotada =
    descripcion.length < MAX_LONG
      ? descripcion
      : descripcion.slice(0, MAX_LONG) + "...";

  const [collectedDrag, drag] = useDrag({
    item: { id: Tarea.id, type: "tarea" },
  });

  const [collectedDrop, drop] = useDrop({
    accept: "tarea",
    drop: (item) => {

    }
  })

  const toggleModal = () => setIsOpen((prevState) => !prevState);

  const updateTarea = (tareaFinal) => {
    dispatch(crear_actualizar_tarea(Tarea.tablero_id, Tarea.id, tareaFinal))
    toggleModal()
  }

  const deleteTarea = () => {
    const {id, tablero_id} = Tarea
    dispatch(crear_eliminar_tarea(tablero_id, id))
    fetchPrelloApi(`tableros/${tablero_id}/tareas/${id}`, 'DELETE')
    toggleModal()
  }

  return (
    <>
    <div ref={drop}>
      <div
        ref={drag}
        onClick={() => toggleModal()}
        className={styles.container}
      >
        <div className={styles.seccion}>
          <b>{Tarea.titulo}</b>
        </div>
        <hr></hr>
        <div className={styles.descripcion}>
          <p>{descripcion_acotada}</p>
        </div>
        <div className={styles.roles}>
          {roles.map((rol) => (
            <p className={styles.rol}>{rol}</p>
          ))}
        </div>
      </div>
      <TareaModal tareaInicial={Tarea} isOpen={isOpen} onClose={updateTarea} onDelete={deleteTarea}/>
    </div>
    </>
  );
}
