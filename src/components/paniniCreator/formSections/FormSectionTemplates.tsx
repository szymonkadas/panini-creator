import styles from "./FormSection.module.css";

export default function FormSectionTemplate(props: FormSectionTemplateProps) {
  return <section className={styles.formSection}>{props.children}</section>;
}

export function FormSectionTitleTemplate(props: FormSectionTitleTemplateProps) {
  return <h4 className={`${styles.formSectionRecordTitle} ${props?.classes || ""}`}>{props.children}</h4>;
}

export function FormSectionRecordTemplate(props: FormSectionRecordTemplateProps) {
  return (
    <div className={`${styles.formSectionRecord} ${props?.classes || ""}`}>
      <FormSectionTitleTemplate>{props.title}</FormSectionTitleTemplate>
      {props.children}
    </div>
  );
}
