import { useMemo } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";

export default function SelectSection(props: FormSectionProps) {
  // logic to be implemented
  const options = useMemo(() => {
    return props.options.map((option, index) => (
      <option key={`optionSelect${option}${index}`} className={styles.optionSelect} value={option}>
        {option.toUpperCase()}
      </option>
    ));
  }, [props.options]);
  // transform 1st word to capitalized;
  const title = `${props.title[0].toUpperCase()}${props.title.slice(1)}`;
  return (
    <label className={styles.formSection}>
      <h4 className={styles.formSectionTitle}>{title}</h4>
      <div className={styles.removalsWrapper}>
        <div className={styles.removal}>
          <label className={styles.switch}>
            <input className={styles.switchInput} type="checkbox" />
            <span className={styles.switchSlider}></span>
          </label>
          <button type="button">+</button>
        </div>
        <div className={styles.removal}>
          <label className={styles.switch}>
            <input className={styles.switchInput} type="checkbox" />
            <span className={styles.switchSlider}></span>
          </label>
          <button type="button">-</button>
        </div>
      </div>
      <div className={styles.optionsWrapper}>
        <select className={styles.selectOptions}>{...options}</select>
        <select className={styles.selectOptions}>{...options}</select>
      </div>
    </label>
  );
}
