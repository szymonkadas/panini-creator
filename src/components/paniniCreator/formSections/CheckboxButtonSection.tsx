import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

export default function CheckboxButtonSection(props: Omit<FormSectionProps, "removable">) {
  return (
    <FormSectionTemplate title={props.title}>
      <div className={`${styles.optionsWrapper} ${styles.checkboxButtonsWrapper}`}>
        <SpecialOptions type="checkboxButton" options={props.options} name={props.name} />
      </div>
    </FormSectionTemplate>
  );
}
