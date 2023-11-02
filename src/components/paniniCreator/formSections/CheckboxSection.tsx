import { useFormContext } from "react-hook-form";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

export default function CheckboxSection(props: Omit<FormSectionProps, "removable">) {
  // form handling to be implemented
  const { watch } = useFormContext();
  const checkedItems = watch(props.name, []);
  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SpecialOptions type="checkbox" options={props.options} name={props.name} checkedItems={checkedItems} />
      </div>
    </FormSectionTemplate>
  );
}
