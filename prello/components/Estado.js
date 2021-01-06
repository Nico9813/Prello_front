import { useState } from "react";
import { useDrop } from "react-dnd";
import { crear_agregar_tarea, crear_cambiar_estado_tarea, crear_agregar_transicion_realizada } from "../data/acciones";
import styles from "../styles/Estado.module.css";
import Tarea from "./Tarea";
import TareaModal from "./TareaModal";
import { useRef } from "react";
import { usePrelloApi } from "../hooks/usePrelloApi";

export default function Estado(props) {
  const { Estado, Tareas, Tablero } = props;
  const { id : TableroId, roles : Roles, estados: Estados } = Tablero
  const { agregarTarea, transicionTarea } = usePrelloApi()
  const [modalNuevaTareaOpen, setIsOpen] = useState(false)
  const dummy = useRef()

  const [_, drop] = useDrop({
    accept: "tarea",
    drop: async(tarea, _) => {
      transicionTarea(Tablero.id, tarea.id, Estado)
    },
  });


  const onNuevaTarea = async function(nuevaTarea){
    agregarTarea(TableroId, Estado.id, nuevaTarea)
    //dummy.current.scrollIntoView({behavior: 'smooth'}) #FIXME: Elimina la navbar
  }

  return (
    <div ref={drop} className={styles.container}>
      <div className={styles.innerContainer}>
              <div className={styles.titulo}>
          <p>{Estado.nombre}</p>
          <p className={styles.addButton} onClick={()=>setIsOpen(true)}>Add</p>
          {<TareaModal isOpen={modalNuevaTareaOpen} onSubmit={onNuevaTarea} onClose={() => setIsOpen(false)}/>}
        </div>
        {Tareas.map((tarea, index) => (
          <Tarea key={index} Tarea={tarea} Roles={Roles} Estados={Estados}/>
        ))}
      </div>
      <div ref={dummy}/>
    </div>
  );
}
