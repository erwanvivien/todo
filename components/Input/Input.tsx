import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.css";

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
