import Head from "next/head";
import styles from "../styles/Perfil.module.css";
import { useSelector } from "react-redux";
import { Layout } from "../components/layout/Layout";
import { WithFetchData } from "../components/wrap/WithFetchData";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

function Perfil() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  const getUserMetadata = async () => {
    const domain = "dev-jx8fysvq.us.auth0.com";

    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://api-prello/v1`,
      });

      const metadataResponse = await fetch(`http://127.0.0.1:56193/privado`, {
        headers: {
          contentType: "application/json",
          method: "GET",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const respuesta = await metadataResponse.json();
      setUserMetadata(respuesta);
    } catch (e) {
      console.log(e.message);
    }
  };

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

      <div className={styles.container}>
        <h1>
          Perfil <a href="https://nextjs.org">{nombre}</a>
        </h1>
        {isAuthenticated && (
          <>
            <p>{user.name}</p>
            <p>User metadata: {JSON.stringify(userMetadata, null, 2)}</p>
            <button onClick={() => getUserMetadata()}>Get metadata</button>
          </>
        )}
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
