import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import styles from "./CheckboxOption.module.css";

// 3 possible values are kinda problematic, kinda weird schema ehu.
export default function CheckboxOption(props: NamedOptionProps) {
  const { getValues, setValue, control } = useFormContext();
  const currentValue = getValues(props.name);

  const [isChecked, setIsChecked] = useState(() => {
    return typeof currentValue === "boolean"
      ? (currentValue as boolean)
      : Array.isArray(currentValue)
      ? currentValue.includes(props.option)
      : currentValue === props.option;
  });

  useEffect(() => {
    if (typeof currentValue === "boolean") {
      currentValue !== isChecked && setIsChecked(currentValue);
    } else if (Array.isArray(currentValue)) {
      const newCheckState = currentValue.includes(props.option);
      newCheckState !== isChecked && setIsChecked(newCheckState);
    } else {
      if (currentValue === props.option) {
        if (!isChecked) setIsChecked(true);
      } else if (isChecked) setIsChecked(false);
    }
  }, [props.name, props.option, currentValue]);

  const { field } = useController({
    name: props.name,
    control,
    defaultValue: [],
  });

  const handleUserCheckToggle = () => {
    if (typeof currentValue === "boolean") {
      setValue(props.name, !currentValue);
    } else if (Array.isArray(currentValue)) {
      const filtered = currentValue.filter((val) => val !== props.option);
      setValue(props.name, isChecked ? filtered : [...currentValue, props.option]);
    } else {
      setValue(props.name, isChecked ? null : props.option);
    }
  };

  return (
    <label key={`checkboxLabel${props.option}${props.index}`} className={styles.checkboxLabel}>
      {props.option}
      <button
        type="button"
        key={`checkboxInputButton${props.option}${props.index}`}
        className={`${styles.checkboxButton} ${isChecked ? styles.checked : ""}`}
        onClick={handleUserCheckToggle}
        data-testid={`${props.name}${props.index}-checkboxInteractionButton`}
        value={props.option.toLowerCase()}
      ></button>
      <input
        key={`checkboxInput${props.option}${props.index}`}
        className={styles.checkboxOption}
        type="checkbox"
        {...field}
        data-testid={`${props.name}${props.index}-checkboxInputElement`}
        data-testoption={props.option}
      />
    </label>
  );
}
