import { useMemo } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";

interface CheckboxSectionProps extends FormSectionProps {
  removable: false;
}

export default function CheckboxSection(props: CheckboxSectionProps) {
  const options = useMemo(() => {
    return props.options.map((option, index) => (
      <label key={`checkboxLabel${option}${index}`} className={styles.checkboxLabel}>
        {option.toUpperCase()}
        <input
          key={`checkboxOption${option}${index}`}
          className={styles.checkboxOption}
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
