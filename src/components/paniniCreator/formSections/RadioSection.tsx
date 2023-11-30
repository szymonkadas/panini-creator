import styles from "./FormSection.module.css";
import FormSectionTemplate, { FormSectionRecordTemplate } from "./FormSectionTemplates";
import SpecialOptions from "./formSection/SpecialOptions";

export default function RadioSection(props: Omit<FormSectionProps, "removable">) {
  return (
    <FormSectionTemplate>
      <FormSectionRecordTemplate title={props.title}>
        <div className={styles.horizontalOptionsWrapper}>
          <SpecialOptions type="radio" options={props.options} name={props.name} />
        </div>
      </FormSectionRecordTemplate>
    </FormSectionTemplate>
  );
}
