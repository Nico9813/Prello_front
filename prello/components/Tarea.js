import { useDrag, useDrop } from "react-dnd";
import styles from "../styles/Tarea.module.css";
import TareaModal from "./TareaModal";
import { useState } from "react";
import { usePrelloApi } from "../hooks/usePrelloApi";

export default function Tarea(props) {
  const { Tarea, Roles } = props;
  const { BotonTablero } = props //Para redirect en vista perfil
  const { updateTarea, deleteTarea} = usePrelloApi()
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

  return (
    <>
    <div ref={drop}>
      <div
        ref={drag}
        onClick={() => toggleModal()}
        className={styles.container}
      >
        <div className={styles.seccion}>
          {BotonTablero}
          <b>{Tarea.titulo}</b>
        </div>
        <hr></hr>
        <div className={styles.descripcion}>
          <p>{descripcion_acotada}</p>
        </div>
        <div className={styles.roles}>
          {Tarea.roles.map((rol) => (
            <h6 className={styles.rol}>{rol.nombre}</h6>
          ))}
        </div>
      </div>
      <TareaModal tareaInicial={Tarea} rolesPosibles={Roles} isOpen={isOpen} onClose={toggleModal} onSubmit={updateTarea} onDelete={deleteTarea}/>
    </div>
    </>
  );
}
