import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { updateValueAtIndex } from "../../../../../utils/form-helpers";
import styles from "./SwipeElement.module.css";

export default function SwipeOption(props: SwipeElementProps) {
  const { control } = useFormContext();
  const [currentOption, setCurrentOption] = useState(
    props.defaultVal ? props.options.findIndex((val) => val === props.defaultVal) : 0
  );
  const { field } = useController({
    name: props.name,
    control: control,
    defaultValue: props.options[currentOption],
  });

  const handleOptionDecrease = () => {
    if (currentOption > 0) {
      props.setFormElementsValues((prev) => updateValueAtIndex(prev, props.orderVal, props.options[currentOption - 1]));
      setCurrentOption((prev) => prev - 1);
    }
  };

  const handleOptionIncrease = () => {
    if (currentOption < props.options.length - 1) {
      props.setFormElementsValues((prev) => updateValueAtIndex(prev, props.orderVal, props.options[currentOption + 1]));
      setCurrentOption((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.swipeElement}>
      <button type="button" className={styles.swipeOptionLeftButton} onClick={handleOptionDecrease}>
        left
      </button>
      <label className={styles.label}>
        {props.children}
        {props.options[currentOption]}
        <input className={styles.swipeOption} type="text" readOnly {...field} />
      </label>
      <button type="button" className={styles.swipeOptionRightButton} onClick={handleOptionIncrease}>
        right
      </button>
    </div>
  );
}
