import { useContext, useState } from "react";
import { Controller } from "react-hook-form";
import { formContext } from "../../../../../pages/PaniniCreator";
import styles from "./CheckboxOption.module.css";
import { OptionProps } from "./OptionProps";
export interface CheckboxOptionProps extends OptionProps {
  name: string;
  checkedItems: string[];
}

export default function CheckboxOption(props: CheckboxOptionProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { control, setValue } = useContext(formContext);
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
      <Controller
        name={props.name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <input
            key={`checkboxInput${props.option}${props.index}`}
            className={styles.checkboxOption}
            type="checkbox"
            {...field}
          />
        )}
      ></Controller>
    </label>
  );
}
