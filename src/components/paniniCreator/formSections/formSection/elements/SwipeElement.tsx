import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import styles from "./SwipeElement.module.css";

export default function SwipeOption(props: SwipeElementProps) {
  const { getValues, control, setValue } = useFormContext();
  const currVal = props.index !== undefined ? getValues(props.name)[props.index] : getValues(props.name);

  const [currentOption, setCurrentOption] = useState(props.options.findIndex((val) => val === currVal));
  useEffect(() => {
    setCurrentOption(props.options.findIndex((val) => val === currVal));
  }, [currVal]);

  const handleOptionDecrease = () => {
    if (currentOption > 0) {
      props?.update
        ? props.update(props?.index, props.options[currentOption - 1])
        : setValue(props.name, props.options[currentOption - 1]);
      setCurrentOption((prev) => prev - 1);
    }
  };

  const handleOptionIncrease = () => {
    if (currentOption < props.options.length - 1) {
      props?.update
        ? props?.update(props.index, props.options[currentOption + 1])
        : setValue(props.name, props.options[currentOption + 1]);
      setCurrentOption((prev) => prev + 1);
    }
  };

  const { field } = useController({ name: props.name, control: control });

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
