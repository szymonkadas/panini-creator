import { ReactNode, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import SwipeElement from "./formSection/elements/SwipeElement";

type SwipeSectionProps = FormSectionProps & {
  children?: ReactNode;
};

export default function SwipeSection(props: SwipeSectionProps) {
  const { setValue } = useFormContext();
  const [areRemovalsActive, setAreRemovalsActive] = useState(props.removable);
  const [formElementsValues, setFormElementsValues] = useState([props.options[0]]);
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
