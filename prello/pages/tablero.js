import Head from "next/head";
import styles from "../styles/Tablero.module.css";
import { useRouter } from "next/router";
import { Workflow } from "../components/workflow";
import { Loading } from "../components/Loading";
import { ListasEstados } from "../components/ListasEstados";
import { useSelector } from "react-redux";
import { Layout } from "../components/layout/Layout";
import { WithFetchData } from "../components/wrap/WithFetchData";
import { useState } from "react";

function Tablero() {
  const router = useRouter();
  const { tablero_id } = router.query;

  const tablero_actual = useSelector((state) =>
    state.perfil.tableros.find((tablero) => tablero.id == tablero_id)
  );

  const agregarTablero = () => {};

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
            <h1>{tablero_actual.nombre}</h1>
            <Workflow />
            <ListasEstados
              Tareas={tablero_actual.tareas}
              Estados={tablero_actual.estados}
            />
          </div>
        </div>
      )}
    </>
  );
}

Tablero.layout = Layout;
Tablero.wrap = WithFetchData;

export default Tablero;
