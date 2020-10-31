import Head from "next/head";
import styles from "../styles/Perfil.module.css";
import { useSelector } from "react-redux";
import { Layout } from "../components/layout/Layout";
import { WithFetchData } from "../components/wrap/WithFetchData";
import { useFetchPrelloApi } from "../hooks/useFetchPrelloApi";

function Perfil() {
  const perfil = useSelector((state) => state.perfil);
  const fetchPrelloApi = useFetchPrelloApi()

  return (
    <>
      <Head>
        <title>Perfil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <h1>
          Perfil <a href="https://nextjs.org">{perfil.nombre}</a>
        </h1>
        <a onClick={async function(){const resopnse = await fetchPrelloApi('tableros/shared/9', 'POST', {}); console.log(resopnse)}}>AgregarTablero</a>
        <p className={styles.description}>{JSON.stringify(perfil, null, 4)}</p>
      </div>
    </>
  );
}

Perfil.layout = Layout;
Perfil.wrap = WithFetchData;

export default Perfil;
