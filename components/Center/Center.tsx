import { DetailedHTMLProps, HTMLAttributes } from "react";
import styles from "./Center.module.css";

type CenterProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Center: React.FC<CenterProps> = (props) => (
  <div {...props} className={styles.center}></div>
);
export default Center;
