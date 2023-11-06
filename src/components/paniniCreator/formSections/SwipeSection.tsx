import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getInitialFormValues } from "../../../utils/form-helpers";
import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import SwipeElement from "./formSection/elements/SwipeElement";

export default function SwipeSection(props: SwipeSectionProps) {
  const { setValue, getValues } = useFormContext();
  const [formElementsValues, setFormElementsValues] = useState(
    getInitialFormValues(getValues, props.name, props.options[0])
  );
  const [areRemovalsActive, setAreRemovalsActive] = useState(formElementsValues.length > 0 ? true : false);
  // control values in form
  useEffect(() => {
    if (props.removable) {
      setValue(props.name, formElementsValues);
    } else [setValue(props.name, formElementsValues[0])];
  }, [formElementsValues]);

  const handleActiveToggle = () => {
    areRemovalsActive ? setFormElementsValues([]) : setFormElementsValues([props.options[0]]);
    setAreRemovalsActive((prev) => !prev);
  };

  const content = useMemo(
    () =>
      formElementsValues.map((val, index, array) => {
        const swipe = (
          <SwipeElement
            key={`${props.name}${index}${val}swipekey`}
            name={props.name}
            options={props.options}
            setFormElementsValues={setFormElementsValues}
            orderVal={index}
            defaultVal={val}
          >
            {props.children}
          </SwipeElement>
        );
        // for every element excluding last one add parting element.
        return index < array.length - 1 ? (
          <>
            {swipe}
            <div className={styles.swipeOptionPartingWrapper} key={`hrwrap${props.name}${index}${val}key`}>
              <hr key={`hr${props.name}${index}${val}key`} className={styles.swipeOptionParting}></hr>
            </div>
          </>
        ) : (
          swipe
        );
      }),
    [formElementsValues.length, areRemovalsActive]
  );
  return (
    <FormSectionTemplate title={props.title}>
      {props.removable && (
        <Removals
          isActive={areRemovalsActive}
          toggleActive={handleActiveToggle}
          defaultVal={props.options[0]}
          formElementsValues={formElementsValues}
          setFormElementsValues={setFormElementsValues}
          maxElements={props.maxElements}
        />
      )}
      <div className={styles.optionsWrapper}>{...content}</div>
    </FormSectionTemplate>
  );
}
