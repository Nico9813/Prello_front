import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { crear_cambiar_estado_tarea } from "../data/acciones";
import styles from "../styles/Estado.module.css";
import Tarea from "./Tarea";

export default function Estado(props) {
  const { Estado, Tareas } = props;

  const dispatch = useDispatch();
  const [collectedProps, drop] = useDrop({
    accept: "tarea",
    drop: (item, monitor) => {
      console.log("me llego");
      dispatch(crear_cambiar_estado_tarea(item.id, Estado));
    },
  });

  return (
    <div ref={drop} className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.titulo}>
          <p>{Estado.nombre}</p>
          <p>Add</p>
        </div>
        {Tareas.map((tarea) => (
          <Tarea Tarea={tarea} />
        ))}
      </div>
    </div>
  );
}
