import type { NextPage } from "next";
import Head from "next/head";
import Lnk from "../components/Lnk";
import styles from "../styles/Home.module.css";

const NotLoggedIn: React.FC = () => (
  <>
    <h1 className={styles.title}>
      Begin to <span className={styles.primary}>Do</span>
    </h1>

    <p className={styles.description}>
      Simple. Fast. Easy.
      <br />
      Create and manage tasks
    </p>

    <Lnk className={styles.highlight} href="/me">
      Create your account and your first todo list
    </Lnk>
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
