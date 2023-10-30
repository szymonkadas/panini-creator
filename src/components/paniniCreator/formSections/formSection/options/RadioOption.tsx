import { useContext, useMemo } from "react";
import { Controller } from "react-hook-form";
import { formContext } from "../../../../../pages/PaniniCreator";
import { OptionProps } from "./OptionProps";
import styles from "./RadioOption.module.css";

interface RadioOptionProps extends OptionProps {
  name: string;
  checkedIndex: number;
  setCheckedRadioIndex: (radioIndex: number) => void;
}

export default function RadioOption(props: RadioOptionProps) {
  const { control, setValue } = useContext(formContext);
  // for styling purposes
  const isChecked = useMemo(() => {
    return props.checkedIndex === props.index;
  }, [props.checkedIndex]);

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
      <Controller
        name={props.name}
        control={control}
        defaultValue=""
        render={({ field }) => <input className={styles.radioOption} type="radio" {...field} />}
      ></Controller>
    </label>
  );
}
