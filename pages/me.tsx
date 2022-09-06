import type { NextPage } from "next";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Me.module.css";

import { sessionOptions } from "../prisma/utils";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import Lnk from "../components/Lnk";
import useInput from "../hooks/useInput";
import Router from "next/router";
import ERROR_IDS, { ErrorId, ERROR_ICONS } from "./api/errors";
import type { ApiLoginPost } from "./api/login";
import Center from "../components/Center";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const [error, setError] = useState<ErrorId>(ERROR_IDS.NO_ERROR);

  const login = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: ApiLoginPost = await res.json();
    console.log(data);
    if (data.success) Router.push("/");
    if (!data.success) setError(data.errorId);
  };

  const ErrorIcon = ERROR_ICONS[error];

  return (
    <>
      <h2 className={styles.title}>Log into your account</h2>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input
        placeholder="Password"
        value={password}
        onChange={setPassword}
        type="password"
      />
      <div />
      <div style={{ display: "flex", gap: 8 }}>
        <Button className={styles.button} onClick={login}>
          Log into
        </Button>
        <Lnk href="/">
          <Button className={styles.back_button}>Back</Button>
        </Lnk>
      </div>
      {error && error !== ERROR_IDS.NO_ERROR && (
        <Center style={{ color: "var(--red)" }}>
          <ErrorIcon width="24" />
          <span style={{ fontWeight: 600 }}>{error}</span>
        </Center>
      )}
    </>
  );
};

const RegisterForm: React.FC = () => {
  const [error, setError] = useState<ErrorId>(ERROR_IDS.NO_ERROR);

  const [email, setEmail] = useInput("");
  const [username, setUsername] = useInput("");
  const [password, setPass] = useInput("");
  const [passwordConf, setPassConf] = useInput("");

  const register = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: username,
        password,
        passwordConf,
      }),
    });

    const data: ApiLoginPost = await res.json();
    if (data.success) Router.push("/");
    if (!data.success) setError(data.errorId);
  };

  const ErrorIcon = ERROR_ICONS[error];

  return (
    <>
      <h2 className={styles.title}>Register an account</h2>
      <Input placeholder="Email" value={email} onChange={setEmail} />
      <Input placeholder="Username" value={username} onChange={setUsername} />
      <Input
        placeholder="Password"
        value={password}
        onChange={setPass}
        type="password"
      />
      <Input
        placeholder="Password confirmation"
        value={passwordConf}
        onChange={setPassConf}
        type="password"
      />
      <div />
      <div style={{ display: "flex", gap: 8 }}>
        <Button className={styles.button} onClick={register}>
          Register
        </Button>
        <Lnk href="/">
          <Button className={styles.back_button}>Back</Button>
        </Lnk>
      </div>
      {error && error !== ERROR_IDS.NO_ERROR && (
        <Center style={{ color: "var(--red)" }}>
          <ErrorIcon width="24" />
          <span style={{ fontWeight: 600 }}>{error}</span>
        </Center>
      )}
    </>
  );
};

const inactiveStyle = {
  color: "var(--grey)",
};

const Login: NextPage = () => {
  const [login, setLogin] = useState<"login" | "register">("login");
  const LogOrReg = login === "login" ? LoginForm : RegisterForm;

  const styleLogin = login === "login" ? {} : inactiveStyle;
  const styleRegister = login === "register" ? {} : inactiveStyle;

  const setToLogin = () => setLogin("login");
  const setToRegister = () => setLogin("register");

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.log_or_register}>
          <h3 style={styleLogin} onClick={setToLogin}>
            Log In
          </h3>
          <h3 style={styleRegister} onClick={setToRegister}>
            Register
          </h3>
        </div>
        <div className={styles.log_or_register_container}>
          <LogOrReg />
        </div>
      </div>
    </>
  );
};

const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const user = req.session.user;
  if (!user) {
    return { props: {} };
  }

  return {
    props: {},
    redirect: { destination: "/", permanent: false },
  };
}, sessionOptions);

export { getServerSideProps };
export default Login;
