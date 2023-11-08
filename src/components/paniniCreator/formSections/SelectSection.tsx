import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { isActiveToggle } from "../../../utils/form-helpers";
import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import SelectElement from "./formSection/elements/SelectElement";

export default function SelectSection(props: SelectSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: props.name,
  });
  const handleIsActiveToggle = () => isActiveToggle(fields, append, props.options[0], remove);
  const content = useMemo(() => {
    return fields.map((val, index) => {
      return (
        <SelectElement
          key={`${props.name}${index}${val}selectkey`}
          name={props.name}
          options={props.options}
          index={index}
          onUpdate={update}
          val={val}
        />
      );
    });
  }, [fields, props.options, props.name]);

  return (
    <FormSectionTemplate title={props.title}>
      <Removals
        isActive={fields.length > 0}
        toggleActive={handleIsActiveToggle}
        onAppend={append}
        onRemove={remove}
        fieldsCurrentLength={fields.length}
        defaultVal={props.options[0]}
        maxElements={props.maxElements}
      />
      <div className={styles.optionsWrapper}>{content}</div>
    </FormSectionTemplate>
  );
}
