import type { NextPage } from "next";
import Head from "next/head";
import { withIronSessionSsr } from "iron-session/next";

import styles from "../styles/Login.module.css";

import { sessionOptions } from "../prisma/utils";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent) => {
    setValue(e.target.value);
  };
  return [value, onChange] as [string, typeof onChange];
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

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
        <Button className={styles.button}>Log into</Button>
        <Button className={styles.back_button}>Back</Button>
      </div>
    </>
  );
};

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useInput("");
  const [username, setUsername] = useInput("");
  const [password, setPass] = useInput("");
  const [passwordConf, setPassConf] = useInput("");

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
        <Button className={styles.button}>Register</Button>
        <Button className={styles.back_button}>Back</Button>
      </div>
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
  );
};

const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const user = req.session.user;
  if (!user) {
    return { props: {} };
  }

  return {
    props: {},
    redirect: { destination: "/", statusCode: 303, permanent: false },
  };
}, sessionOptions);

export { getServerSideProps };
export default Login;
