import Head from "next/head";
import styles from "../styles/Perfil.module.css";
import { useSelector } from "react-redux";
import { Layout } from "../components/layout/Layout";
import { WithFetchData } from "../components/wrap/WithFetchData";
import { useAuth0 } from "@auth0/auth0-react";

function Perfil() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [tableros, nombre] = useSelector((state) => [
    state.perfil.tableros,
    state.perfil.nombre,
  ]);

  return (
    <>
      <Head>
        <title>Perfil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isAuthenticated && <p>{user.name}</p>}

      <div className={styles.container}>
        <h1>
          Perfil <a href="https://nextjs.org">{nombre}</a>
        </h1>
        <p className={styles.description}>
          {JSON.stringify(tableros[0], null, 4)}
        </p>
      </div>
    </>
  );
}

Perfil.layout = Layout;
Perfil.wrap = WithFetchData;

export default Perfil;
