import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import SwipeElement from "./formSection/elements/SwipeElement";

export default function SwipeSection(props: SwipeSectionProps) {
  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SwipeElement name={props.name} options={props.options}>
          {props?.children}
        </SwipeElement>
      </div>
    </FormSectionTemplate>
  );
}
