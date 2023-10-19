import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";

interface TextSectionProps extends Omit<FormSectionProps, "options" | "removable"> {
  removable?: never;
  options?: never;
}
export default function TextSection(props: TextSectionProps) {
  // logic to be implemented
  return (
    <label className={styles.formSection}>
      <p className={styles.formSectionTitle}>{props.title}</p>
      <div className={styles.optionsWrapper}>
        <input type="text" value={"Full Grain"} className={styles.textOption} readOnly />
      </div>
    </label>
  );
}
