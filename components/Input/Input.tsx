import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.css";

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  let className = styles.input;
  if (props.className) className += " " + props.className;

  return <input {...props} className={className} />;
};

export default Input;
