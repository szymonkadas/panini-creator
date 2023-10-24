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
      <h4 className={styles.formSectionTitle}>{props.title}</h4>
      <div className={styles.optionsWrapper}>
        <input type="text" value={"Full Grain"} className={styles.textOption} readOnly />
      </div>
    </label>
  );
}
