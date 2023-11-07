import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";
import SingleSwipe from "./formSection/elements/SingleSwipe";

export default function SwipeSection(props: SwipeSectionProps) {
  return (
    <FormSectionTemplate title={props.title}>
      <div className={styles.optionsWrapper}>
        <SingleSwipe name={props.name} options={props.options}>
          {props?.children}
        </SingleSwipe>
      </div>
    </FormSectionTemplate>
  );
}
