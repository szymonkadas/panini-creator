import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { isActiveToggle } from "../../../utils/form-helpers";
import styles from "./FormSection.module.css";
import FormSectionTemplate, { FormSectionRecordTemplate, FormSectionTitleTemplate } from "./FormSectionTemplates";
import Controls from "./formSection/Controls";
import SelectElement from "./formSection/elements/SelectElement";

export default function SelectSection(props: SelectSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: props.name,
  });
  const handleIsActiveToggle = () => isActiveToggle(fields, append, props.options[0], remove);
  const content = useMemo(() => {
    if (fields.length > 0) {
      return fields.map((field, index) => {
        return (
          <FormSectionRecordTemplate title={index === 0 ? props.title : undefined} key={`${field.id}-select-record`}>
            <Controls
              isActive={fields.length > 0}
              toggleActive={handleIsActiveToggle}
              onAppend={append}
              onRemove={remove}
              elementIndex={index}
              currentFieldsLength={fields.length}
              defaultVal={props.options[0]}
              maxElements={props.maxElements}
            />
            <SelectElement name={props.name} options={props.options} index={index} onUpdate={update} val={field} />
          </FormSectionRecordTemplate>
        );
      });
    } else {
      return [
        <FormSectionRecordTemplate>
          <FormSectionTitleTemplate classes={`${styles.selectRecord}`}>{props.title}</FormSectionTitleTemplate>
          <Controls
            isActive={fields.length > 0}
            toggleActive={handleIsActiveToggle}
            onAppend={append}
            onRemove={remove}
            elementIndex={0}
            currentFieldsLength={fields.length}
            defaultVal={props.options[0]}
            maxElements={props.maxElements}
          ></Controls>
        </FormSectionRecordTemplate>,
      ];
    }
  }, [fields, props.options, props.name]);

  return <FormSectionTemplate>{...content}</FormSectionTemplate>;
}
