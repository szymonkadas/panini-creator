import styles from "./Circle.module.css";

export default function Circle(props: CircleProps) {
  // const defaultStyle = props.defaultPos ? styles.default : styles.transformed;
  let defaultStyle = "";
  if (props.columnLayout) {
    defaultStyle = props.defaultPos ? styles.columnCircleDefault : styles.columnCircleTransformed;
  } else {
    defaultStyle = props.defaultPos ? styles.rowCircleDefault : styles.rowCircleTransformed;
  }

  // this style is responsible for animation, on appliance it overwrites default styling, so it changes it's layout on display.
  let transitionStyle = "";
  if (props.shouldTransition) {
    if (props.columnLayout) {
      transitionStyle = props.defaultPos ? styles.columnCircleToTransformed : styles.columnCircleToDefault;
    } else {
      transitionStyle = props.defaultPos ? styles.rowCircleToTransformed : styles.rowCircleToDefault;
    }
  }
  return <div className={`${defaultStyle} ${transitionStyle}`}>{props.children}</div>;
}
