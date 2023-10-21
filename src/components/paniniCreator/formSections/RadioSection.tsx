import { useMemo } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
export default function RadioSection(props: FormSectionProps) {
  const options = useMemo(() => {
    return props.options.map((option, index) => (
      <input key={`radioOption${option}${index}`} className={styles.radioOption} type="radio" value={option}></input>
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
