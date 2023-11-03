import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

type CheckboxSectionProps = Omit<FormSectionProps, "removable"> & {
  isBoolean: boolean;
};
export default function CheckboxSection(props: CheckboxSectionProps) {
  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SpecialOptions type="checkbox" options={props.options} name={props.name} isBoolean={props.isBoolean} />
      </div>
    </FormSectionTemplate>
  );
}
