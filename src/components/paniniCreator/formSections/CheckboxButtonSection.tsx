import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

export default function CheckboxButtonSection(props: FormSectionProps) {
  // form handling to be implemented
  return (
    <FormSectionTemplate title={props.title}>
      <div className={`${styles.optionsWrapper} ${styles.checkboxButtonsWrapper}`}>
        <SpecialOptions type="checkboxButton" options={props.options} />
      </div>
    </FormSectionTemplate>
  );
}
