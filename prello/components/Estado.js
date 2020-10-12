import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { crear_agregar_tareas, crear_cambiar_estado_tarea } from "../data/acciones";
import styles from "../styles/Estado.module.css";
import Tarea from "./Tarea";
import TareaModal from "./TareaModal";

export default function Estado(props) {
  const { Estado, Tareas, TableroId } = props;

  const dispatch = useDispatch();
  const [_, drop] = useDrop({
    accept: "tarea",
    drop: (item, _) => {
      dispatch(crear_cambiar_estado_tarea(item.id, Estado));
    },
  });

  const [modalNuevaTareaOpen, setIsOpen] = useState(false)

  const agregarTarea = (nuevaTarea) => {
    setIsOpen(false)
    nuevaTarea = {...nuevaTarea, estado: Estado, id: 101, tablero_id: TableroId}
    dispatch(crear_agregar_tareas(TableroId, [nuevaTarea]))
  }

  return (
    <div ref={drop} className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.titulo}>
          <p>{Estado.nombre}</p>
          <p onClick={()=>setIsOpen(true)}>Add</p>
          {<TareaModal isOpen={modalNuevaTareaOpen} onClose={agregarTarea}/>}
        </div>
        {Tareas.map((tarea, index) => (
          <Tarea key={index} Tarea={tarea}/>
        ))}
      </div>
    </div>
  );
}
