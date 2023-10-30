import { useContext } from "react";
import { formContext } from "../../../pages/PaniniCreator";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

export default function CheckboxButtonSection(props: FormSectionProps) {
  const { watch } = useContext(formContext);
  const checkedItems = watch(props.name, []);
  return (
    <FormSectionTemplate title={props.title}>
      <div className={`${styles.optionsWrapper} ${styles.checkboxButtonsWrapper}`}>
        <SpecialOptions type="checkboxButton" options={props.options} name={props.name} checkedItems={checkedItems} />
      </div>
    </FormSectionTemplate>
  );
}
