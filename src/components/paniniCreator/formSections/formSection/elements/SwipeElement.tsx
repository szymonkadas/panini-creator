import { useController, useFormContext } from "react-hook-form";
import styles from "./SwipeElement.module.css";

export default function SwipeElement(props: SwipeElementProps) {
  const { control } = useFormContext();
  const { field } = useController({ name: props.name, control: control });
  return (
    <div className={styles.swipeElement}>
      <button
        type="button"
        className={styles.swipeOptionLeftButton}
        onClick={props.handleOptionDecrease}
        data-testid={`${props.name}${props?.index !== undefined ? props.index : ""}-swipeLeftButton`}
      >
        left
      </button>
      <label className={styles.label}>
        {props.children}
        {props?.value || field.value}
        <input
          className={styles.swipeOption}
          type="text"
          readOnly
          value={props?.value || field.value}
          // 0 is falsy so.
          data-testid={`${props.name}${props?.index !== undefined ? props.index : ""}-swipeInputElement`}
        />
      </label>
      <button
        type="button"
        className={styles.swipeOptionRightButton}
        onClick={props.handleOptionIncrease}
        data-testid={`${props.name}${props?.index !== undefined ? props.index : ""}-swipeRightButton`}
      >
        right
      </button>
    </div>
  );
}
