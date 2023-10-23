import styles from "./Circle.module.css";

type CircleProps = {
  columnLayout: boolean;
  shouldTransition: boolean;
  children?: React.ReactNode;
};

export default function Circle(props: CircleProps) {
  const circleLayout = props.columnLayout ? styles.columnCircle : styles.rowCircle;
  const circleEscapeLayout = props.shouldTransition
    ? props.columnLayout
      ? styles.columnCircleEscape
      : styles.rowCircleEscape
    : "";
  return <div className={`${circleLayout} ${circleEscapeLayout}`}>{props.children}</div>;
}
