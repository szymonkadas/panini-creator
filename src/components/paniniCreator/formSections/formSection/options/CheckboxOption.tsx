import { useContext, useState } from "react";
import { formContext } from "../../../../../pages/PaniniCreator";
import styles from "./CheckboxOption.module.css";
import { OptionProps } from "./OptionProps";

export interface CheckboxOptionProps extends OptionProps {
  name: string;
}

export default function CheckboxOption(props: CheckboxOptionProps) {
  const { register } = useContext(formContext);
  const [isChecked, setIsChecked] = useState(false);
  const handleUserCheckToggle = () => {
    setIsChecked((prev) => !prev);
  };
  const handleCheckboxChange = () => {
    // since i don't know the way i'll need to work with forms later on, this function is here solely for removing console.error purpose.
    let o = 2 + 2;
  };
  return (
    <label key={`checkboxLabel${props.option}${props.index}`} className={styles.checkboxLabel}>
      {props.option}
      <button
        type="button"
        key={`checkboxInputButton${props.option}${props.index}`}
        className={`${styles.checkboxButton} ${isChecked ? styles.checked : ""}`}
        onClick={handleUserCheckToggle}
      ></button>
      <input
        key={`checkboxInput${props.option}${props.index}`}
        className={styles.checkboxOption}
        type="checkbox"
        {...register(props.name, {
          onChange: handleCheckboxChange,
          value: props.option,
        })}
        checked={isChecked}
      />
    </label>
  );
}
