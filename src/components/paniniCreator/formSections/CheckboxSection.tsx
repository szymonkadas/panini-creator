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
  // transform 1st word to capitalized;
  const title = `${props.title[0].toUpperCase()}${props.title.slice(1)}`;
  // form handling to be implemented

  return (
    <label className={styles.formSection}>
      <h4 className={styles.formSectionTitle}>{title}</h4>
      <div className={styles.optionsWrapper}>{...options}</div>
    </label>
  );
}
