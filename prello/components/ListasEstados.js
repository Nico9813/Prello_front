import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crear_agregar_estado } from "../data/acciones";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";
import styles from "../styles/ListasEstados.module.css";
import Estado from "./Estado";
import EstadoModal from "./EstadoModal";

export const ListasEstados = (props) => {
  const { Tareas, Estados, TableroId } = props;
  const fetchPrelloApi = useFetchPrelloApi()
  const dispatch = useDispatch()

  const [ isOpen, setIsOpen ] = useState(false)

  const agregarEstado = async function(nombre){
    setIsOpen(false)
    const estado = await fetchPrelloApi(`tableros/${TableroId}/estados`,'POST',{nombre: nombre})
    dispatch(crear_agregar_estado(estado))
  }

  return (
    <>
      <div className={styles.titulo}>
        <h4>Estados</h4>
        <h4 onClick={ () => setIsOpen(true)}>Add</h4>
        {isOpen && <EstadoModal isOpen={isOpen} onClose={agregarEstado}/>}
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
