import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { isActiveToggle } from "../../../utils/form-helpers";
// import styles from "./FormSection.module.css";
import styles from "./FormSection.module.css";
import Controls from "./formSection/Controls";
import MultiSwipe from "./formSection/elements/MultiSwipe";
import FormSectionTemplate, { FormSectionRecordTemplate, FormSectionTitleTemplate } from "./FormSectionTemplates";

export default function MultiSwipeSection(props: MultiSwipeSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: props.name,
  });

  const handleIsActiveToggle = () => {
    isActiveToggle(fields, append, props.options[0], remove);
  };

  const content = useMemo(() => {
    if (fields.length > 0) {
      return fields.map((field, index, array) => {
        const parting = (
          <div className={styles.swipeOptionPartingWrapper} key={`hrwrap${props.name}${index}${field}key`}>
            <hr key={`hr${props.name}${index}${field}key`} className={styles.swipeOptionParting}></hr>
          </div>
        );
        return (
          <>
            <div className={styles.formSectionRecord} key={`formSectionRecord${field.id}`}>
              <FormSectionTitleTemplate>{index === 0 ? props.title : ""}</FormSectionTitleTemplate>
              <Controls
                isActive={fields.length > 0}
                defaultVal={props.options[0]}
                elementIndex={index}
                currentFieldsLength={array.length}
                maxElements={props.maxElements}
                onAppend={append}
                onRemove={remove}
                toggleActive={handleIsActiveToggle}
              ></Controls>
              <MultiSwipe
                key={`${field.id}`}
                name={props.name}
                onUpdate={update}
                index={index}
                options={props.options}
                optionsIcons={props?.optionsIcons}
              ></MultiSwipe>
            </div>
            {index < array.length - 1 && parting}
          </>
        );
      });
    } else {
      return [
        <FormSectionRecordTemplate key={`formSectionRecord0${props.name}`} title={props.title}>
          <Controls
            isActive={fields.length > 0}
            defaultVal={props.options[0]}
            elementIndex={0}
            currentFieldsLength={0}
            maxElements={props.maxElements}
            onAppend={append}
            onRemove={remove}
            toggleActive={handleIsActiveToggle}
          ></Controls>
        </FormSectionRecordTemplate>,
      ];
    }
  }, [fields.length, props.name, props.options]);
  return <FormSectionTemplate>{...content}</FormSectionTemplate>;
}
