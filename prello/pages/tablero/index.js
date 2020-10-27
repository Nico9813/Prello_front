import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../../styles/Tablero.module.css";
import { Workflow } from "../../components/workflow";
import { Loading } from "../../components/Loading";
import { ListasEstados } from "../../components/ListasEstados";
import { Layout } from "../../components/layout/Layout";
import { WithFetchData } from "../../components/wrap/WithFetchData";
import { useState } from "react";
import { ListaTransiciones } from "../../components/ListaTransiciones";

function Tablero(props) {
  const router = useRouter();
  const { tablero_id } = router.query;
  const { dispatchWRT } = props

  const TABS = ['TAREAS', 'TRANSICIONES', 'HISTORIAL']

  const [indiceActual, setIndiceActual] = useState(0)

  const tablero_actual = useSelector((state) =>
    state.perfil.tableros.find((tablero) => tablero.id == tablero_id)
  );

  const render_tab_actual = () => {
    switch(TABS[indiceActual]){
      case 'TAREAS': 
        return(<ListasEstados
              Tareas={tablero_actual.tareas}
              Estados={tablero_actual.estados}
              TableroId={tablero_actual.id}
            />)
      case 'TRANSICIONES':
        return(<ListaTransiciones 
              TransicionesPosibles={tablero_actual.workflow.transiciones_posibles}
              Tablero={tablero_actual}
            />)
      case 'HISTORIAL':
        return(
          <p>HISTORIAL</p>
        )
    }
  }

  return (
    <>
      <Head>
        <title>Tablero </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!tablero_actual ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.titulo}> 
              <h1>{tablero_actual.nombre}</h1>
              <div>
                {TABS.map( (tab, index) => 
                  <b key={index} onClick={(() => setIndiceActual(TABS.indexOf(tab)))} style={{color: TABS[indiceActual] != tab ? 'grey' : 'white'}}>
                    {tab}{index != (TABS.length - 1)  && '/ '}
                  </b>
                )}
              </div>
            </div>
            <Workflow 
              Workflow={tablero_actual.workflow}
            />
            {render_tab_actual()}
          </div>
        </div>
      )}
    </>
  );
}

Tablero.layout = Layout;
Tablero.wrap = WithFetchData;

export default Tablero;
