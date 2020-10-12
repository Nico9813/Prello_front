import { useSelector } from "react-redux";
import styles from "../styles/ListasEstados.module.css";
import Estado from "./Estado";

export const ListasEstados = (props) => {
  const { Tareas, Estados, TableroId } = props;

  return (
    <>
      <div className={styles.titulo}>
        <h4>Estados</h4>
        <h4>Add</h4>
      </div>
      <div className={styles.container}>
        {Estados.map((estado, index) => (
          <Estado
            key={index}
            Estado={estado}
            Tareas={Tareas.filter((tarea) => tarea.estado.id == estado.id)}
            TableroId={TableroId}
          />
        ))}
      </div>
    </>
  );
};
