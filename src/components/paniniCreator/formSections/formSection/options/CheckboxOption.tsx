import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import styles from "./CheckboxOption.module.css";

export default function CheckboxOption(props: CheckboxOptionProps) {
  const { getValues } = useFormContext();

  const [isChecked, setIsChecked] = useState(() => {
    const currentValue = getValues(props.name);
    return props.isValBoolean
      ? (currentValue as boolean)
      : Array.isArray(currentValue)
      ? currentValue.includes(props.option)
      : false;
  });

  const { setValue, control } = useFormContext();
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: [],
  });

  const handleUserCheckToggle = () => {
    const value = getValues(props.name);
    if (props.isValBoolean) {
      setValue(props.name, !value);
    } else {
      if (Array.isArray(value)) {
        const filtered = value.filter((val) => val !== props.option);
        setValue(props.name, isChecked ? filtered : [...value, props.option]);
      } else {
        setValue(props.name, isChecked ? null : props.option);
      }
    }
    setIsChecked((prev) => !prev);
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
        {...field}
      />
    </label>
  );
}
