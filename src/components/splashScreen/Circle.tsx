import styles from "./Circle.module.css";

type CircleProps = {
  columnLayout: boolean;
  transition: boolean;
  children?: React.ReactNode;
};

export default function Circle(props: CircleProps) {
  let circleLayout = styles.columnCircle;
  let circleEscapeLayout = styles.columnCircleEscape;
  if (props.columnLayout === false) {
    circleLayout = styles.rowCircle;
    circleEscapeLayout = styles.rowCircleEscape;
  }
  return <div className={`${circleLayout} ${props.transition && circleEscapeLayout}`}>{props.children}</div>;
}
