import styles from "./FormSection.module.css";
import FormSectionTemplate, { FormSectionRecordTemplate, FormSectionTitleTemplate } from "./FormSectionTemplates";
import SpecialOptions from "./formSection/SpecialOptions";

export default function CheckboxButtonSection(props: CheckboxSectionProps) {
  return (
    <FormSectionTemplate>
      <FormSectionRecordTemplate>
        <FormSectionTitleTemplate classes={styles.centerTopText}>{props.title}</FormSectionTitleTemplate>
        <div className={`${styles.optionsWrapper} ${styles.checkboxButtonsWrapper}`}>
          <SpecialOptions type="checkboxButton" options={props.options} name={props.name} />
        </div>
      </FormSectionRecordTemplate>
    </FormSectionTemplate>
  );
}
