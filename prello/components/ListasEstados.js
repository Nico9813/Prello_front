import { useState } from "react";
import styles from "../styles/ListasEstados.module.css";
import Estado from "./Estado";
import EstadoModal from "./EstadoModal";
import { TiDeleteOutline } from 'react-icons/ti';
import { useRealTimeDispatch } from "../hooks/useRealTimeSocket";
import { usePrelloApi } from "../hooks/usePrelloApi";

export const ListasEstados = (props) => {
  const { Tareas, Estados, Tablero } = props;
  const { id } = Tablero
  const { agregarEstado } = usePrelloApi()
  const [filtrosActivos, setFiltrosActivos] = useState([])

  const [ isOpen, setIsOpen ] = useState(false)

  const aplicarFiltro = ([key, expectedValue], tarea) => tarea[key].includes(expectedValue)

  const renderFiltro = ([key, expectedValue]) => <div className={styles.filtroActivo}><div className={styles.filtroContainer}><p className={styles.filtroText}>{key}={expectedValue}</p><TiDeleteOutline/></div></div>

  const parseFiltro = (filtro) => {
    return filtro.split('=')
  }

  const agregarFiltro = (evt) => {
    const filtro = parseFiltro(evt.target.value)
    if (filtro.length  > 1){
      setFiltrosActivos(prevState => [...prevState, filtro])
    }
    evt.target.value=''
  }

  return (
    <>
      <div className={styles.titulo}>
        <h4>Estados</h4>
        <h4 onClick={ () => setIsOpen(true)}>Add</h4>
        {isOpen && <EstadoModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={(nombre) => agregarEstado(id, nombre)}/>}
      </div>
      <input placeholder="Agregar filtro" className={styles.searchBar} onKeyDown={(evt) => {if(evt.key === 'Enter') agregarFiltro(evt)}}/>
      <div className={styles.filtros}>
        {filtrosActivos.map((value, index) => <p onClick={() => setFiltrosActivos(prevState => prevState.filter((_, indexActual) => indexActual != index))}>
          {renderFiltro(value)}
        </p>)}
      </div>
      <div className={styles.container}>
        {Estados.map((estado, index) => (
          <Estado
            key={index}
            Estado={estado}
            Tareas={Tareas.filter((tarea) => tarea.estado.id == estado.id && filtrosActivos.every(filtro => aplicarFiltro(filtro, tarea)))}
            Tablero={Tablero}
          />
        ))}
      </div>
    </>
  );
};
