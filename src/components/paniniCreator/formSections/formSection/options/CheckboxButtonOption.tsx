import { useEffect, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import styles from "./CheckboxButtonOption.module.css";

export default function CheckboxButtonOption(props: NamedOptionProps) {
  const { getValues } = useFormContext();
  const checkedItems: string[] = getValues(props.name);
  const [isChecked, setIsChecked] = useState(checkedItems.includes(props.option));
  useEffect(() => {
    setIsChecked(checkedItems.includes(props.option));
  }, [checkedItems, props.option]);

  const { setValue, control } = useFormContext();
  const { field } = useController({
    name: props.name,
    control: control,
    defaultValue: [],
  });

  const handleUserCheckToggle = () => {
    const updatedItems = isChecked
      ? checkedItems.filter((item) => item !== props.option)
      : [...checkedItems, props.option];
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
      <input
        key={`checkboxButtonInput${props.option}${props.index}`}
        className={styles.checkboxButtonOption}
        type="checkbox"
        {...field}
      />
    </label>
  );
}
