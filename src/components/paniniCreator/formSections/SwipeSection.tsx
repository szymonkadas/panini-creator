import { ReactNode, useState } from "react";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";
import Removals from "./formSection/Removals";
import SwipeElement from "./formSection/elements/SwipeElement";

interface SwipeSectionProps extends FormSectionProps {
  children?: ReactNode;
}

export default function SwipeSection(props: SwipeSectionProps) {
  const [areRemovalsActive, setAreRemovalsActive] = useState(props.removable);
  const handleActiveToggle = () => {
    setAreRemovalsActive((prev) => !prev);
  };
  const showElements = props.removable ? areRemovalsActive : true;
  // form handling to be implemented
  return (
    <FormSectionTemplate title={props.title}>
      {props.removable && <Removals isActive={areRemovalsActive} toggleActive={handleActiveToggle} />}
      <div className={styles.optionsWrapper}>
        {showElements && (
          <SwipeElement name={`${props.name}1`} options={props.options}>
            {props.children}
          </SwipeElement>
        )}
        {showElements && (
          <div className={styles.swipeOptionPartingWrapper}>
            <hr className={styles.swipeOptionParting}></hr>
          </div>
        )}
        {showElements && (
          <SwipeElement name={`${props.name}2`} options={props.options}>
            {props.children}
          </SwipeElement>
        )}
      </div>
    </FormSectionTemplate>
  );
}
