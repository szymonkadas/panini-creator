import { useFormContext } from "react-hook-form";
import styles from "./FormSection.module.css";
import FormSectionTemplate from "./FormSectionTemplate";

export default function TextSection(props: TextSectionProps) {
  const { register, formState } = useFormContext();
  return (
    <FormSectionTemplate title={props.title}>
      <div className={`${styles.optionsWrapper} ${styles.textOptionWrapper}`}>
        <input
          type="text"
          placeholder="eg. Club Panini"
          className={styles.textOption}
          required
          data-testid={`${props.name}-textInput`}
          {...register(props.name)}
        />
        {formState.errors?.sandwichName && (
          <p className={styles.error}>{`${formState.errors?.sandwichName?.message}`}</p>
        )}
      </div>
    </FormSectionTemplate>
  );
}
