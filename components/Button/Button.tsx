import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import styles from "./Button.module.css";

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return <div className={styles.button} {...props} />;
};

export default Input;
