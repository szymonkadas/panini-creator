import { useState } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import SelectElement from "./formSection/elements/SelectElement";

export default function SelectSection(props: FormSectionProps) {
  const [areRemovalsActive, setAreRemovalsActive] = useState(props.removable);
  // future idea.
  // const [usedOptions, setUsedOptions] = useState(new Set<number>());
  // const availableOptions = useMemo(() => {
  //   return props.options.map((option, index) => {
  //     if (!usedOptions.has(index)) {
  //       return [option, index];
  //     }
  //   });
  // }, [usedOptions]);
  const handleActiveToggle = () => {
    setAreRemovalsActive((prev) => !prev);
  };
  // temporary for development purposes
  const showElements = props.removable ? areRemovalsActive : true;
  // logic is yet to be implemented
  return (
    <FormSectionTemplate title={props.title}>
      {props.removable && <Removals isActive={areRemovalsActive} toggleActive={handleActiveToggle} />}
      <div className={styles.optionsWrapper}>
        {showElements && <SelectElement name={`${props.name}1`} options={props.options} usedOption={0} />}
        {showElements && <SelectElement name={`${props.name}2`} options={props.options} usedOption={1} />}
      </div>
    </FormSectionTemplate>
  );
}
