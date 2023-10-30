import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

interface CheckboxSectionProps extends FormSectionProps {
  removable: false;
}

export default function CheckboxSection(props: CheckboxSectionProps) {
  // form handling to be implemented

  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SpecialOptions type="checkbox" options={props.options} name={props.name} />
      </div>
    </FormSectionTemplate>
  );
}
