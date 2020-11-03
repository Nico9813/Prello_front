import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { crear_agregar_tarea, crear_cambiar_estado_tarea } from "../data/acciones";
import styles from "../styles/Estado.module.css";
import Tarea from "./Tarea";
import TareaModal from "./TareaModal";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";
import { useRef } from "react";
import { useRealTimeDispatch } from "../hooks/useRealTimeSocket";

export default function Estado(props) {
  const { Estado, Tareas, TableroId } = props;
  const fetchPrelloApi = useFetchPrelloApi()
  const dispatch = useRealTimeDispatch()
  const dummy = useRef()

  const [_, drop] = useDrop({
    accept: "tarea",
    drop: async(tarea, _) => {
      dispatch(crear_cambiar_estado_tarea(TableroId, tarea.id, Estado));
      const response = await fetchPrelloApi(`tableros/${TableroId}/tareas/${tarea.id}`, 'POST', { estado_id : Estado.id })
      console.log(JSON.stringify(response,null,2))
    },
  });

  const [modalNuevaTareaOpen, setIsOpen] = useState(false)

  const agregarTarea = async function(nuevaTarea){
    setIsOpen(false)
    dummy.current.scrollIntoView({behavior: 'smooth'})
    const nueva_tarea = { ...nuevaTarea, estado_id: Estado.id, tablero_id: TableroId}
    const tarea_agregada = await fetchPrelloApi(`tableros/${TableroId}/tareas`, 'POST', nueva_tarea)
    dispatch(crear_agregar_tarea(TableroId, tarea_agregada))
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
      <div ref={dummy}/>
    </div>
  );
}
