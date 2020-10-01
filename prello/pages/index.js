import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.container}>
      <Head>
        <title>Landing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.texto}>Landing</h1>

        <button onClick={() => loginWithRedirect()}>Log in</button>
      </main>
    </div>
  );
}
