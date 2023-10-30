import { useContext, useState } from "react";
import { Controller } from "react-hook-form";
import { formContext } from "../../../../../pages/PaniniCreator";
import styles from "./CheckboxButtonOption.module.css";
import { CheckboxOptionProps } from "./CheckboxOption";

export default function CheckboxButtonOption(props: CheckboxOptionProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { setValue, control } = useContext(formContext);
  const handleUserCheckToggle = () => {
    setIsChecked((prev) => !prev);
    const updatedItems = isChecked
      ? props.checkedItems.filter((item) => item !== props.option)
      : [...props.checkedItems, props.option];
    setValue(props.name, updatedItems);
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
      <Controller
        name={props.name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <input
            key={`checkboxButtonInput${props.option}${props.index}`}
            className={styles.checkboxButtonOption}
            type="checkbox"
            {...field}
          />
        )}
      ></Controller>
    </label>
  );
}
