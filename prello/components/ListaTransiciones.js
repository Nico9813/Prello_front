import { useState } from "react";
import styles from "../styles/ListaTransiciones.module.css";
import TransicionModal from "./TransicionModal";
import AddTransicionModal from "./AddTransicionModal";
import { usePrelloApi } from "../hooks/usePrelloApi";

export const ListaTransiciones = (props) => {
  const { Tablero, TransicionesPosibles } = props;
  const [ idTransicionModal, setIdTransicionModal] = useState(null)
  const { id, estados } = Tablero
  const [isOpen, setIsOpen] = useState(false)
  const [addTransicionOpen, setAddTransicionOpen] = useState(false)

  const { agregarTransicionPosible, eliminarTransicion, agregarAccion, eliminarAccion } = usePrelloApi()

  return (
    <>
      {isOpen && 
        <TransicionModal 
          isOpen={isOpen} 
          transicion={TransicionesPosibles.find(transicion => transicion.id == idTransicionModal)} 
          onClose={() => setIsOpen(false)} 
          agregarAccion={(transicion_id, tipo, url, method, header, body) => agregarAccion(id, transicion_id, { type: tipo, payload: { url, method, header, body }})} 
          eliminarAccion={(transicion_id, accion_id) => eliminarAccion(id, transicion_id, accion_id)}
        />}
      {addTransicionOpen && 
        <AddTransicionModal 
          isOpen={addTransicionOpen} 
          estados={estados} 
          onClose={() => setAddTransicionOpen(false)} 
          onSubmit={(estado_inicial, estado_final) => agregarTransicionPosible(id, estado_inicial, estado_final)}
        />}
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
      {TransicionesPosibles.map( (transicion, index) => 
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
              <button onClick={() => { setIdTransicionModal(transicion.id); setIsOpen(true) }}>{transicion.acciones.length} acciones asociadas</button>
            </div>
        </div>
          <div className={styles.columna}>
            <div className={styles.contenido}>
                <button onClick={() => {eliminarTransicion(id, transicion.id)}}>DELETE</button>
            </div>
        </div>
      </div>
      </div>)}
      </div>
    </>
  );
};
