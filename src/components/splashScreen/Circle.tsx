import styles from "./Circle.module.css";

type CircleProps = {
  columnLayout: boolean;
  children?: React.ReactNode;
};

export default function Circle(props: CircleProps) {
  return <div className={props.columnLayout ? styles.columnCircle : styles.rowCircle}>{props.children}</div>;
}
