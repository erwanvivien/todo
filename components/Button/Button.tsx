import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import styles from "./Button.module.css";

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  let className = styles.button;
  if (props.className) className += " " + props.className;

  return <div {...props} className={className} />;
};

export default Input;
