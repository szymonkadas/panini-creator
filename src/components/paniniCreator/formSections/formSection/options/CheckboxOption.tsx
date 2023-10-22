import styles from "./ChecboxOption.module.css";
import { OptionProps } from "./OptionProps";

export default function CheckboxOption(props: OptionProps) {
  return (
    <label key={`checkboxLabel${props.option}${props.index}`} className={styles.checkboxLabel}>
      {props.option.toUpperCase()}
      <input
        key={`checkboxOption${props.option}${props.index}`}
        className={styles.checkboxOption}
        type="checkbox"
        value={props.option}
      />
    </label>
  );
}
