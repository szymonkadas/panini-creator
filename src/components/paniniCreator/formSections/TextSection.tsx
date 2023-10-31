import { useContext } from "react";
import { formContext } from "../../../pages/PaniniCreator";
import styles from "./FormSection.module.css";
import { FormSectionProps } from "./FormSectionProps";
import FormSectionTemplate from "./FormSectionTemplate";

interface TextSectionProps extends Omit<FormSectionProps, "options" | "removable"> {
  removable?: never;
  options?: never;
}
export default function TextSection(props: TextSectionProps) {
  // logic to be implemented
  const { register } = useContext(formContext);
  return (
    <FormSectionTemplate title={props.title}>
      <div className={`${styles.optionsWrapper} ${styles.textOptionWrapper}`}>
        <input
          type="text"
          placeholder="eg. Club Panini"
          className={styles.textOption}
          required
          {...register(props.name)}
        />
      </div>
    </FormSectionTemplate>
  );
}
