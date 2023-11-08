import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import SingleSwipeElement from "./formSection/elements/SingleSwipeElement";

export default function SwipeSection(props: SwipeSectionProps) {
  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SingleSwipeElement name={props.name} options={props.options}>
          {props?.children}
        </SingleSwipeElement>
      </div>
    </FormSectionTemplate>
  );
}
