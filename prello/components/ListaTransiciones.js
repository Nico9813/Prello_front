import { useState } from "react";
import { crear_agregar_transicion_posible, crear_eliminar_transicion_posible } from "../data/acciones";
import styles from "../styles/ListaTransiciones.module.css";
import TransicionModal from "./TransicionModal";
import AddTransicionModal from "./AddTransicionModal";
import { useDispatch } from "react-redux";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";

export const ListaTransiciones = (props) => {
  const { Tablero, TransicionesPosibles } = props;
  const [ transicionModal, setTransicionModal] = useState(null)
  const { id, estados } = Tablero

  const [isOpen, setIsOpen] = useState(false)
  const [addTransicionOpen, setAddTransicionOpen] = useState(false)

  const dispatch = useDispatch()
  const fetchPrelloApi = useFetchPrelloApi()

  const addTransicion = async function(id_estado_inicial, id_estado_final){
    setAddTransicionOpen(false)
    const transicion = {id_estado_inicial, id_estado_final}
    const transicion_agregada = await fetchPrelloApi(`tableros/${id}/transiciones_posibles`, 'POST', transicion)
    dispatch(crear_agregar_transicion_posible(id, transicion_agregada))
  }

  const deleteTransicion = async function(transicion){
    dispatch(crear_eliminar_transicion_posible(id, transicion.id))
    await fetchPrelloApi(`tableros/${id}/transiciones_posibles/${transicion.id}`, 'DELETE', transicion)
  }

  return (
    <>
      {isOpen && <TransicionModal isOpen={isOpen} transicion={transicionModal} onClose={() => setIsOpen(false)}/>}
      {addTransicionOpen && <AddTransicionModal isOpen={addTransicionOpen} estados={estados} onClose={addTransicion}/>}
      <div className={styles.titulo}>
        <h4>Transiciones</h4>
        <h4 onClick={() => setAddTransicionOpen(true)}>Add</h4>
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
                <h4>Acciones asociadas</h4>
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
              <button onClick={() => { setTransicionModal(transicion); setIsOpen(true) }}>{transicion.acciones.length} acciones asociadas</button>
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
