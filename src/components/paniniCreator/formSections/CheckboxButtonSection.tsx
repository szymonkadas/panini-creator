import { useMemo } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";

export default function CheckboxButtonSection(props: FormSectionProps) {
  const options = useMemo(() => {
    return props.options.map((option, index) => (
      <label key={`checkboxButtonLabel${option}${index}`} className={styles.checkboxButtonLabel}>
        <button key={`checkboxButton${option}${index}`} className={styles.checkboxButton}>
          {option.toUpperCase()}
        </button>
        {/* prolly will be hidden */}
        <input
          key={`checkboxButtonInput${option}${index}`}
          className={styles.checkboxButtonOption}
          type="checkbox"
          value={option}
        ></input>
      </label>
    ));
  }, [props.options]);
  // form handling to be implemented
  return (
    <label className={styles.formSection}>
      <p className={styles.formSectionTitle}>{props.title}</p>
      <div className={styles.optionsWrapper}>{...options}</div>
    </label>
  );
}
