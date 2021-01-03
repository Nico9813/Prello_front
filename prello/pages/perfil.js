import Head from "next/head";
import styles from "../styles/Perfil.module.css";
import { useSelector } from "react-redux";
import { Layout } from "../components/layout/Layout";
import { WithFetchData } from "../components/wrap/WithFetchData";
import { useAuth0 } from "@auth0/auth0-react";
import Tarea from "../components/Tarea";

function Perfil() {
  const perfil = useSelector((state) => state.perfil);
  const { user, isAuthenticated } = useAuth0()

  const colores_rol = ['#4287f5', '#f5a700', '#8700f5']

  return (
    <>
      <Head>
        <title>Perfil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.topContainer}>
            {perfil.tableros.map((tablero, indexTablero) => tablero.tareas.map((tarea, index) => (
                <Tarea BotonTablero={<a className={styles.botonTablero} style={{backgroundColor:colores_rol[indexTablero % colores_rol.length]}}>{tablero.nombre}</a>} key={index} Tarea={tarea} Roles={tablero.roles}/>
            )))}
          </div>
          <div className={styles.botContainer}>
            <p className={styles.description}>{JSON.stringify(perfil, null, 4)}</p>
          </div>
        </div>
        {isAuthenticated &&
        <div className={styles.rightContainer}>
          <img className={styles.fotoPerfil} src={user.picture}></img>
          <p>Nombre: {user.given_name}</p>
          <p>Usuario: {user.nickname}</p>
          <p>Roles</p>
          {[...perfil.tableros].map((tablero, index) => tablero.roles.map( rol => <p className={styles.rol} style={{backgroundColor:colores_rol[index % colores_rol.length]}}>{rol.nombre}</p>))}
        </div>
        }
      </div>
    </>
  );
}

Perfil.layout = Layout;
Perfil.wrap = WithFetchData;

export default Perfil;
