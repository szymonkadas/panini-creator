import { useController, useFormContext } from "react-hook-form";
import { OptionProps } from "./OptionProps";
import styles from "./RadioOption.module.css";

interface RadioOptionProps extends OptionProps {
  name: string;
}

export default function RadioOption(props: RadioOptionProps) {
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
      ></button>
      <input className={styles.radioOption} type="radio" {...field} />
    </label>
  );
}
