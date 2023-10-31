import { useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { OptionProps } from "./OptionProps";
import styles from "./RadioOption.module.css";

interface RadioOptionProps extends OptionProps {
  name: string;
  defaultVal: string;
  checkedIndex: number;
  setCheckedRadioIndex: (radioIndex: number) => void;
}

export default function RadioOption(props: RadioOptionProps) {
  // for styling purposes
  const isChecked = useMemo(() => {
    return props.checkedIndex === props.index;
  }, [props.checkedIndex]);
  const { control, setValue } = useFormContext();
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: props.defaultVal,
    rules: { required: true },
  });
  const handleRadioClick = () => {
    props.setCheckedRadioIndex(props.index);
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
