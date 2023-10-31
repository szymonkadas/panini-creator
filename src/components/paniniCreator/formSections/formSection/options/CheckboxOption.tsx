import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import styles from "./CheckboxOption.module.css";
import { OptionProps } from "./OptionProps";

export interface CheckboxOptionProps extends OptionProps {
  name: string;
  checkedItems: string[];
}

export default function CheckboxOption(props: CheckboxOptionProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { setValue, control } = useFormContext();
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: [],
  });

  const handleUserCheckToggle = () => {
    setIsChecked((prev) => !prev);
    const updatedItems = isChecked
      ? props.checkedItems.filter((item) => item !== props.option)
      : [...props.checkedItems, props.option];
    setValue(props.name, updatedItems);
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
