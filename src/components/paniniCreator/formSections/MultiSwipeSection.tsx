import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { isActiveToggle } from "../../../utils/form-helpers";
import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import MultiSwipe from "./formSection/elements/MultiSwipe";

export default function MultiSwipeSection(props: MultiSwipeSectionProps) {
  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: props.name,
  });
  const content = useMemo(() => {
    return fields.map((field, index, array) => {
      const swipe = (
        <MultiSwipe key={`${field.id}`} name={props.name} update={() => update} index={index} options={props.options}>
          {props?.children}
        </MultiSwipe>
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
        append={append}
        remove={remove}
        maxElements={props.maxElements}
      />
      <div className={styles.optionsWrapper}>{...content}</div>
    </FormSectionTemplate>
  );
}
