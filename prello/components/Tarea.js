import { DndProvider, useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { crear_cambiar_estado_tarea } from "../data/acciones";
import styles from "../styles/Tarea.module.css";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Tarea(props) {
  const { Tarea } = props;
  const MAX_LONG = 50;
  const roles = ["QA", "DEVELOP", "TESTING"];
  const { descripcion } = Tarea;
  const descripcion_acotada =
    descripcion.length < MAX_LONG
      ? descripcion
      : descripcion.slice(0, MAX_LONG) + "...";

  const [collectedProps, drag] = useDrag({
    item: { id: Tarea.id, type: "tarea" },
  });

  return (
    <div ref={drag} className={styles.container}>
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
  );
}
