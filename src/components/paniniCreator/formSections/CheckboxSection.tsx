import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

export default function CheckboxSection(props: CheckboxSectionProps) {
  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SpecialOptions type="checkbox" options={props.options} name={props.name} />
      </div>
    </FormSectionTemplate>
  );
}
