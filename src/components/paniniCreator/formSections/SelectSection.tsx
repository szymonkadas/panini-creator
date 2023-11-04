import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import SelectElement from "./formSection/elements/SelectElement";

export default function SelectSection(props: FormSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: props.name,
  });
  // TRZEBA UWAŻAĆ BO NEI ZAWSZE SELECT MA ARRAYA!
  // control values in form
  // useEffect(() => {
  //   if (props.removable) {
  //     setValue(props.name, formElementsValues);
  //   } else {
  //     setValue(props.name, formElementsValues[0]);
  //   }
  // }, [formElementsValues]);

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
          index={index}
        />
      );
    });
  }, [fields.length, props.options, props.name]);

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
