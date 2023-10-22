import { OptionProps } from "./OptionProps";
import styles from "./RadioOption.module.css";

export default function RadioOption(props: OptionProps) {
  return (
    <label className={styles.radioOptionLabel}>
      {props.option}
      <input
        key={`radioOption${props.option}${props.index}`}
        className={styles.radioOption}
        type="radio"
        value={props.option}
      />
    </label>
  );
}
