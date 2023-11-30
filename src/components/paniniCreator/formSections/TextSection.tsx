import { useFormContext } from "react-hook-form";
import styles from "./FormSection.module.css";
import FormSectionTemplate, { FormSectionRecordTemplate } from "./FormSectionTemplates";

export default function TextSection(props: TextSectionProps) {
  const { register, formState } = useFormContext();
  return (
    <FormSectionTemplate>
      <FormSectionRecordTemplate title={props.title}>
        <input
          type="text"
          placeholder="eg. Club Panini"
          className={styles.textOption}
          required
          data-testid={`${props.name}-textInputElement`}
          {...register(props.name)}
        />
        {formState.errors?.sandwichName && (
          <p className={styles.error}>{`${formState.errors?.sandwichName?.message}`}</p>
        )}
      </FormSectionRecordTemplate>
    </FormSectionTemplate>
  );
}
