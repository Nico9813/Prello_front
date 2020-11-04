import styles from "../styles/Historial.module.css";

export const Historial = (props) => {
  const { Historial} = props

  return (
    <>
      <div className={styles.titulo}>
        <h4>Transiciones</h4>
        <h4 onClick={() => setIsOpen(true)}>Add</h4>
      </div>
      <div className={styles.container}>
      <div className={styles.transicion}> 
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <h4>Id tarea</h4>
            </div>
        </div>
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
                <h4>Deshacer</h4>
            </div>
        </div>
      </div>
      {Historial.reverse().map( (transicion, index) => 
      <div key={index}>
      <div className={styles.transicion}> 
        <div className={styles.columna}>
            <div className={styles.contenido}>
              <div className={styles.estado}>
                <p>{transicion.tarea.id} : {transicion.tarea.titulo}</p>
              </div>
            </div>
        </div>
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
                <button>Deshacer</button>
            </div>
        </div>
      </div>
      </div>)}
      </div>
    </>
  );
};
