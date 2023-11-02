import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import SelectElement from "./formSection/elements/SelectElement";

export default function SelectSection(props: FormSectionProps) {
  const { getValues, setValue } = useFormContext();
  const [areRemovalsActive, setAreRemovalsActive] = useState(props.removable);
  const [formElementsValues, setFormElementsValues] = useState([props.options[0]]);
  // control values in form
  useEffect(() => {
    if (props.removable) {
      for (let i = 0; i < props.maxElements; i++) {
        setValue(`${props.name}${i}`, formElementsValues[i] || undefined);
      }
    }
  }, [formElementsValues]);

  const handleActiveToggle = () => {
    areRemovalsActive ? setFormElementsValues([]) : setFormElementsValues([props.options[0]]);
    if (props.removable) {
      for (let i = 0; i < props.maxElements; i++) {
        if (getValues(`${props.name}${i}`)) {
          setValue(`${props.name}${i}`, undefined);
        }
      }
    }
    setAreRemovalsActive((prev) => !prev);
  };

  const content = useMemo(() => {
    return formElementsValues.map((val, index) => {
      return (
        <SelectElement
          key={`${props.name}${index}${val}selectkey`}
          name={`${props.name}${index}`}
          options={props.options}
          setFormElementsValues={setFormElementsValues}
          orderVal={index}
          defaultVal={val}
        />
      );
    });
  }, [formElementsValues.length, areRemovalsActive]);

  return (
    <FormSectionTemplate title={props.title}>
      {props.removable && (
        <Removals
          isActive={areRemovalsActive}
          toggleActive={handleActiveToggle}
          formElementsValues={formElementsValues}
          defaultVal={props.options[0]}
          setFormElementsValues={setFormElementsValues}
          maxElements={props.maxElements}
        />
      )}
      <div className={styles.optionsWrapper}>{content}</div>
    </FormSectionTemplate>
  );
}
