import { ReactNode, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import styles from "./SwipeElement.module.css";

type SwipeSectionProps = {
  options: string[];
  name: string;
  children?: ReactNode;
};

export default function SwipeOption(props: SwipeSectionProps) {
  const { setValue, control } = useFormContext();
  const [currentOption, setCurrentOption] = useState(0);
  const { field } = useController({
    name: props.name,
    control: control,
    defaultValue: props.options[0],
  });

  const handleOptionDecrease = () => {
    if (currentOption > 0) {
      setValue(props.name, props.options[currentOption - 1]);
      setCurrentOption((prev) => prev - 1);
    }
  };

  const handleOptionIncrease = () => {
    if (currentOption < props.options.length - 1) {
      setValue(props.name, props.options[currentOption + 1]);
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
