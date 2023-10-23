import { useState } from "react";
import styles from "./CheckboxButtonOption.module.css";
import { OptionProps } from "./OptionProps";

export default function CheckboxButtonOption(props: OptionProps) {
  const [isChecked, setIsChecked] = useState(false);
  const handleUserCheckToggle = () => {
    console.log(isChecked);
    setIsChecked((prev) => !prev);
  };
  const handleCheckboxChange = () => {
    // since i don't know the way i'll need to work with forms later on, this function is here solely for removing console.error purpose.
    let o = 2 + 2;
  };
  const textContent =
    props.option.length > 0 ? `${props.option[0].toUpperCase()}${props.option.slice(1).toLowerCase()}` : ``;
  return (
    <label key={`checkboxButtonLabel${props.option}${props.index}`} className={styles.checkboxButtonLabel}>
      option {props.option} checkbox
      <button
        type="button"
        key={`checkboxButton${props.option}${props.index}`}
        className={`${styles.checkboxButton} ${isChecked && styles.checked}`}
        onClick={handleUserCheckToggle}
      >
        {textContent}
      </button>
      <input
        key={`checkboxButtonInput${props.option}${props.index}`}
        className={styles.checkboxButtonOption}
        type="checkbox"
        value={props.option}
        onChange={handleCheckboxChange}
        checked={isChecked}
      />
    </label>
  );
}
