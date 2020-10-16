import styles from "../styles/ListaTransiciones.module.css";

export const ListaTransiciones = (props) => {
  const { TransicionesPosibles } = props;

  return (
    <>
      <div className={styles.titulo}>
        <h4>Transiciones</h4>
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
                <h4>Acciones</h4>
            </div>
        </div>
        <div className={styles.columna}>
            <div className={styles.contenido}>
                <h4>Estado inicial</h4>
            </div>
        </div>
      </div>
      {[...TransicionesPosibles].map( transicion => 
      <>
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
      </div>
      </>)}
      </div>
    </>
  );
};
