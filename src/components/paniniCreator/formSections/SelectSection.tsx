import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import getInitialFormValues from "../../../utils/getInitialFormValues";
import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import SelectElement from "./formSection/elements/SelectElement";

export default function SelectSection(props: FormSectionProps) {
  const { setValue, getValues } = useFormContext();
  const [formElementsValues, setFormElementsValues] = useState(
    getInitialFormValues(getValues, props.name, props.options[0])
  );
  const [areRemovalsActive, setAreRemovalsActive] = useState(formElementsValues.length > 0);
  // control values in form
  useEffect(() => {
    if (props.removable) {
      setValue(props.name, formElementsValues);
    } else {
      setValue(props.name, formElementsValues[0]);
    }
  }, [formElementsValues]);

  const handleActiveToggle = () => {
    areRemovalsActive ? setFormElementsValues([]) : setFormElementsValues([props.options[0]]);
    setAreRemovalsActive((prev) => !prev);
  };

  const content = useMemo(() => {
    return formElementsValues.map((val, index) => {
      return (
        <SelectElement
          key={`${props.name}${index}${val}selectkey`}
          name={props.name}
          options={props.options}
          formElementsValues={formElementsValues}
          setFormElementsValues={setFormElementsValues}
          orderVal={index}
          defaultVal={val}
        />
      );
    });
  }, [formElementsValues, areRemovalsActive, props.options, props.name]);

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
