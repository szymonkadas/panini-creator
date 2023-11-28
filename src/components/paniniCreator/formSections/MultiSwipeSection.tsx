import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { isActiveToggle } from "../../../utils/form-helpers";
import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import MultiSwipeElement from "./formSection/elements/MultiSwipeElement";

export default function MultiSwipeSection(props: MultiSwipeSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: props.name,
  });
  const content = useMemo(() => {
    return fields.map((field, index, array) => {
      const swipe = (
        <MultiSwipeElement
          key={`${field.id}`}
          name={props.name}
          onUpdate={update}
          index={index}
          options={props.options}
          optionsIcons={props?.optionsIcons}
        ></MultiSwipeElement>
      );
      return index < array.length - 1 ? (
        <>
          {swipe}
          <div className={styles.swipeOptionPartingWrapper} key={`hrwrap${props.name}${index}${field}key`}>
            <hr key={`hr${props.name}${index}${field}key`} className={styles.swipeOptionParting}></hr>
          </div>
        </>
      ) : (
        swipe
      );
    });
  }, [fields.length, props.name, props.options]);

  const handleIsActiveToggle = () => {
    isActiveToggle(fields, append, props.options[0], remove);
  };

  return (
    <FormSectionTemplate title={props.title}>
      <Removals
        isActive={fields.length > 0}
        toggleActive={handleIsActiveToggle}
        defaultVal={props.options[0]}
        fieldsCurrentLength={fields.length}
        onAppend={append}
        onRemove={remove}
        maxElements={props.maxElements}
        parting={true}
      />
      <div className={styles.optionsWrapper}>{...content}</div>
    </FormSectionTemplate>
  );
}
