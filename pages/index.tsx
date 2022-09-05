import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const NotLoggedIn: React.FC = () => (
  <>
    <h1 className={styles.title}>
      Welcome to <span className={styles.primary}>Todo</span>
    </h1>

    <p className={styles.description}>
      Simple. Fast. Easy.
      <br />
      Create and manage tasks
    </p>

    <a className={styles.highlight} href="/me">
      Create your account and your first todo list
    </a>
  </>
);

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My todo list</title>
      </Head>

      <main className={styles.main}>
        <NotLoggedIn />
      </main>
    </div>
  );
};

export default Home;
