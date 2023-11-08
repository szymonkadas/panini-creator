import { useController, useFormContext } from "react-hook-form";
import styles from "./SwipeElement.module.css";

export default function SwipeElement(props: SwipeElementProps) {
  const { control, getValues } = useFormContext();
  const { field } = useController({ name: props.name, control: control });
  return (
    <div className={styles.swipeElement}>
      <button type="button" className={styles.swipeOptionLeftButton} onClick={props.handleOptionDecrease}>
        left
      </button>
      <label className={styles.label}>
        {props.children}
        {props?.value || field.value}
        <input className={styles.swipeOption} type="text" readOnly value={props?.value || field.value} />
      </label>
      <button type="button" className={styles.swipeOptionRightButton} onClick={props.handleOptionIncrease}>
        right
      </button>
    </div>
  );
}
