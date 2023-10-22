import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";
export default function RadioSection(props: FormSectionProps) {
  // form handling to be implemented

  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SpecialOptions type="radio" options={props.options} />
      </div>
    </FormSectionTemplate>
  );
}
