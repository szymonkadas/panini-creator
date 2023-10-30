import { ReactNode, useContext, useState } from "react";
import { formContext } from "../../../../../pages/PaniniCreator";
import styles from "./SwipeElement.module.css";

type SwipeSectionProps = {
  options: string[];
  name: string;
  children?: ReactNode;
};

export default function SwipeOption(props: SwipeSectionProps) {
  const { register } = useContext(formContext);
  const [currentOption, setCurrentOption] = useState(0);
  const handleOptionDecrease = () => {
    currentOption > 0 && setCurrentOption((prev) => prev - 1);
  };
  const handleOptionIncrease = () => {
    currentOption < props.options.length - 1 && setCurrentOption((prev) => prev + 1);
  };
  return (
    <div className={styles.swipeElement}>
      <button type="button" className={styles.swipeOptionLeftButton} onClick={handleOptionDecrease}>
        left
      </button>
      <label className={styles.label}>
        {props.children}
        {props.options[currentOption]}
        <input
          type="text"
          className={styles.swipeOption}
          readOnly
          {...register(props.name, { value: props.options[currentOption] })}
        />
      </label>
      <button type="button" className={styles.swipeOptionRightButton} onClick={handleOptionIncrease}>
        right
      </button>
    </div>
  );
}
