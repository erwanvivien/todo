import { withIronSessionSsr } from "iron-session/next";
import type { NextPage } from "next";
import Head from "next/head";
import Button from "../components/Button";
import Lnk from "../components/Lnk";
import { UserInfo } from "../prisma/user/type";
import { sessionOptions } from "../prisma/utils";
import styles from "../styles/Home.module.css";

type HomeProps = {
  user: UserInfo | null;
};

const Home: NextPage<HomeProps> = ({ user }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My todo list</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Begin to <span className={styles.primary}>Do</span>
        </h1>

        <p className={styles.description}>
          Simple. Fast. Easy.
          <br />
          Create and manage tasks
        </p>

        {(!user && (
          <Lnk href="/me">
            <Button className={styles.highlight}>Log in</Button>
          </Lnk>
        )) || (
          <Button
            className={styles.highlight}
            onClick={() => fetch("/api/logout", { method: "POST" })}
          >
            Log out
          </Button>
        )}
      </main>
    </div>
  );
};

const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const user = req.session.user;
  return {
    props: { user: user || null },
  };
}, sessionOptions);

export { getServerSideProps };
export default Home;
