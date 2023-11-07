import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

export default function RadioSection(props: Omit<FormSectionProps, "removable">) {
  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SpecialOptions type="radio" options={props.options} name={props.name} />
      </div>
    </FormSectionTemplate>
  );
}
