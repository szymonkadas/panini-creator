import { useState } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
export default function SwipeSection(props: FormSectionProps) {
  // form handling to be implemented
  const [currentOption, setCurrentOption] = useState(0);
  const handleOptionDecrease = () => {
    currentOption > 0 && setCurrentOption((prev) => prev - 1);
  };
  const handleOptionIncrease = () => {
    currentOption < props.options.length && setCurrentOption((prev) => prev + 1);
  };
  // transform 1st word to capitalized;
  const title = `${props.title[0].toUpperCase()}${props.title.slice(1)}`;
  return (
    <label className={styles.formSection}>
      <h4 className={styles.formSectionTitle}>{title}</h4>
      <div className={styles.removalsWrapper}>
        <div className={styles.removal}>
          <label className={styles.switch}>
            <input className={styles.switchInput} type="checkbox" />
            <span className={styles.switchSlider}></span>
          </label>
          <button type="button">+</button>
        </div>
        <div className={styles.removal}>
          <label className={styles.switch}>
            <input className={styles.switchInput} type="checkbox" />
            <span className={styles.switchSlider}></span>
          </label>
          <button type="button">-</button>
        </div>
      </div>
      <div className={styles.optionsWrapper}>
        <button type="button" className={styles.swipeOptionLeftButton} onClick={handleOptionDecrease}>
          left
        </button>
        <i className={styles.swipeOptionIcon}></i>
        <input type="text" value={props.options[0]} className={styles.swipeOption} readOnly={true} />
        <button type="button" className={styles.swipeOptionRightButton} onClick={handleOptionIncrease}>
          right
        </button>
      </div>
    </label>
  );
}
