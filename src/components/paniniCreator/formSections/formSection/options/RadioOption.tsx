import { useMemo } from "react";
import { OptionProps } from "./OptionProps";
import styles from "./RadioOption.module.css";

interface RadioOptionProps extends OptionProps {
  name: string;
  checkedIndex: number;
  setCheckedRadioIndex: (radioIndex: number) => void;
}

export default function RadioOption(props: RadioOptionProps) {
  const isChecked = useMemo(() => {
    return props.checkedIndex === props.index;
  }, [props.checkedIndex]);
  const handleRadioClick = () => {
    props.setCheckedRadioIndex(props.index);
  };
  return (
    <label className={styles.radioOptionLabel}>
      {props.option}
      <button
        type="button"
        className={`${styles.radioButton} ${isChecked && styles.checked}`}
        onClick={handleRadioClick}
      ></button>
      <input className={styles.radioOption} type="radio" value={props.option} defaultChecked={isChecked} />
    </label>
  );
}
