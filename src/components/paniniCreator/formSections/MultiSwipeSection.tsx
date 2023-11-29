import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { isActiveToggle } from "../../../utils/form-helpers";
// import styles from "./FormSection.module.css";
import Controls from "./formSection/Controls";
import MultiSwipe from "./formSection/elements/MultiSwipe";
import styles from "./test.module.css";

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
              <h4 className={styles.formSectionRecordTitle} key={`formSectionRecordTitle${field.id}`}>
                {index === 0 ? props.title : ""}
              </h4>
              <Controls
                key={`MultiSwipeControls-${field.id}key`}
                isActive={fields.length > 0}
                defaultVal={props.options[0]}
                elementIndex={index}
                currentFieldLength={array.length}
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
        <div className={styles.formSectionRecord} key={`formSectionRecord0${props.name}`}>
          <h4 className={styles.formSectionRecordTitle} key={`formSectionRecordTitle0${props.name}`}>
            {props.title}
          </h4>
          <Controls
            key={`MultiSwipeControls-${props.name}0key`}
            isActive={fields.length > 0}
            defaultVal={props.options[0]}
            elementIndex={0}
            currentFieldLength={0}
            maxElements={props.maxElements}
            onAppend={append}
            onRemove={remove}
            toggleActive={handleIsActiveToggle}
          ></Controls>
        </div>,
      ];
    }
  }, [fields.length, props.name, props.options]);
  return (
    // <FormSectionTemplate title={props.title}>
    //   <Removals
    //     isActive={fields.length > 0}
    //     toggleActive={handleIsActiveToggle}
    //     defaultVal={props.options[0]}
    //     fieldsCurrentLength={fields.length}
    //     onAppend={append}
    //     onRemove={remove}
    //     maxElements={props.maxElements}
    //   />
    //   <div className={styles.optionsWrapper}>{...content}</div>
    // </FormSectionTemplate>
    <section className={styles.formSection}>{...content}</section>
  );
}
