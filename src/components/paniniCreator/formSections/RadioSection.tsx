import { useMemo } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
export default function RadioSection(props: FormSectionProps) {
  const options = useMemo(() => {
    return props.options.map((option, index) => (
      <input key={`radioOption${option}${index}`} className={styles.radioOption} type="radio" value={option}></input>
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
