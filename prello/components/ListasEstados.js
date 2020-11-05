import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crear_agregar_estado } from "../data/acciones";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";
import styles from "../styles/ListasEstados.module.css";
import Estado from "./Estado";
import EstadoModal from "./EstadoModal";

export const ListasEstados = (props) => {
  const { Tareas, Estados, Tablero } = props;
  const { id } = Tablero
  const fetchPrelloApi = useFetchPrelloApi()
  const dispatch = useDispatch()
  const [filtrosActivos, setFiltrosActivos] = useState([])

  const [ isOpen, setIsOpen ] = useState(false)

  const agregarEstado = async function(nombre){
    setIsOpen(false)
    const estado = await fetchPrelloApi(`tableros/${id}/estados`,'POST',{nombre: nombre})
    dispatch(crear_agregar_estado(id, estado))
  }

  const aplicarFiltro = ([key, expectedValue], tarea) => tarea[key] == expectedValue

  const parseFiltro = (filtro) => {
    return filtro.split('=')
  }

  const agregarFiltro = (evt) => {
    const filtro = parseFiltro(evt.target.value)
    console.log(filtro)
    if (filtro.length  > 1){
      setFiltrosActivos(prevState => [...prevState, filtro])
    }
  }

  return (
    <>
      <div className={styles.titulo}>
        <h4>Estados</h4>
        <h4 onClick={ () => setIsOpen(true)}>Add</h4>
        {isOpen && <EstadoModal isOpen={isOpen} onClose={agregarEstado}/>}
      </div>
      <input placeholder="Agregar filtro" className={styles.searchBar} onKeyDown={(evt) => {if(evt.key === 'Enter') agregarFiltro(evt)}}/>
      <div>
        {filtrosActivos.map( (value, index) => <p onClick={() => setFiltrosActivos(prevState => prevState.filter((_, indexActual) => indexActual != index))}>{JSON.stringify(value)}</p>)}
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
