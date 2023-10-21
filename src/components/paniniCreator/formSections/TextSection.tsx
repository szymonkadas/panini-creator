import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";

interface TextSectionProps extends Omit<FormSectionProps, "options" | "removable"> {
  removable?: never;
  options?: never;
}
export default function TextSection(props: TextSectionProps) {
  // logic to be implemented

  // transform 1st word to capitalized;
  const title = `${props.title[0].toUpperCase()}${props.title.slice(1)}`;
  return (
    <label className={styles.formSection}>
      <h4 className={styles.formSectionTitle}>{title}</h4>
      <div className={styles.optionsWrapper}>
        <input type="text" value={"Full Grain"} className={styles.textOption} readOnly />
      </div>
    </label>
  );
}
