import FormSectionTemplate, { FormSectionRecordTemplate } from "./FormSectionTemplates";
import SingleSwipe from "./formSection/elements/SingleSwipe";

export default function SwipeSection(props: SwipeSectionProps) {
  return (
    <FormSectionTemplate>
      <FormSectionRecordTemplate title={props.title}>
        <SingleSwipe name={props.name} options={props.options} optionsIcons={props.optionsIcons} />
      </FormSectionRecordTemplate>
    </FormSectionTemplate>
  );
}
