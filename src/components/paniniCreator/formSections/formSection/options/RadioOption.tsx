import { useController, useFormContext } from "react-hook-form";
import styles from "./RadioOption.module.css";

export default function RadioOption(props: NamedOptionProps) {
  const { getValues } = useFormContext();
  // for styling purposes
  const value = getValues(props.name);
  const isChecked = value === props.option;
  const { control, setValue } = useFormContext();
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: value,
    rules: { required: true },
  });
  const handleRadioClick = () => {
    setValue(props.name, props.option);
  };
  return (
    <label className={styles.radioOptionLabel}>
      {props.option}
      <button
        type="button"
        className={`${styles.radioButton} ${isChecked && styles.checked}`}
        onClick={handleRadioClick}
        data-testid={`${props.name}${props.index}-radioInteractionButton`}
      ></button>
      <input
        className={styles.radioOption}
        type="radio"
        {...field}
        data-testid={`${props.name}${props.index}-radioInputElement`}
      />
    </label>
  );
}
