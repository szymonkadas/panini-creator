import { useState } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import SpecialOptions from "./formSection/SpecialOptions";

export default function RadioSection(props: Omit<FormSectionProps, "removable">) {
  const [checkedRadioIndex, setCheckedRadioIndex] = useState(0);
  const handleRadioChange = (radioIndex: number) => {
    if (radioIndex >= 0 && radioIndex < props.options.length) {
      setCheckedRadioIndex(radioIndex);
    }
  };
  // form handling to be implemented

  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SpecialOptions
          type="radio"
          options={props.options}
          checkedRadioIndex={checkedRadioIndex}
          setCheckedRadioIndex={handleRadioChange}
          name={props.name}
        />
      </div>
    </FormSectionTemplate>
  );
}
