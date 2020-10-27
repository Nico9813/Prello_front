import { useState } from "react";
import { crear_agregar_transicion_posible, crear_eliminar_transicion_posible } from "../data/acciones";
import styles from "../styles/ListaTransiciones.module.css";
import TransicionModal from "./TransicionModal";
import { useDispatch } from "react-redux";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";

export const ListaTransiciones = (props) => {
  const { Tablero, TransicionesPosibles } = props;
  const { id, estados } = Tablero

  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  const fetchPrelloApi = useFetchPrelloApi()

  const addTransicion = async function(transicion){
    setIsOpen(false)
    transicion = {id_estado_inicial: 7, id_estado_final: 21}
    const transicion_agregada = await fetchPrelloApi(`tableros/${id}/transiciones_posibles`, 'POST', transicion)
    console.log(transicion_agregada)
    dispatch(crear_agregar_transicion_posible(id, transicion_agregada))
  }

  const deleteTransicion = async function(transicion){
    dispatch(crear_eliminar_transicion_posible(id, transicion.id))
    await fetchPrelloApi(`tableros/${id}/transiciones_posibles/${transicion.id}`, 'DELETE', transicion)
  }

  return (
    <>
      {isOpen && <TransicionModal isOpen={isOpen} estados={estados} onClose={addTransicion}/>}
      <div className={styles.titulo}>
        <h4>Transiciones</h4>
        <h4 onClick={() => setIsOpen(true)}>Add</h4>
      </div>
      <div className={styles.container}>
      <div className={styles.transicion}> 
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <h4>Estado inicial</h4>
            </div>
        </div>
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <h4>Estado final</h4>
            </div>
        </div>
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <h4>Tipo accion</h4>
            </div>
        </div>
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <h4>Accion</h4>
            </div>
        </div>
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <h4>Borrar</h4>
            </div>
        </div>
      </div>
      {[...TransicionesPosibles].map( (transicion, index) => 
      <div key={index}>
      <div className={styles.transicion}> 
        <div className={styles.columna}>
            <div className={styles.contenido}>
              <div className={styles.estado}>
                <p>{transicion.estado_inicial.nombre}</p>
              </div>
            </div>
        </div>
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <div className={styles.estado}>
                <p>{transicion.estado_final.nombre}</p>
              </div>
            </div>
        </div>
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <p>-</p>
            </div>
        </div>
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <p>-</p>
            </div>
        </div>
          <div className={styles.columna}>
            <div className={styles.contenido}>
                <button onClick={() => {deleteTransicion(transicion)}}>DELETE</button>
            </div>
        </div>
      </div>
      </div>)}
      </div>
    </>
  );
};
