import { ReactNode } from "react";
import styles from "./FormSection.module.css";

type FormSectionTemplateProps = {
  title: string;
  children: ReactNode;
};

export default function FormSectionTemplate(props: FormSectionTemplateProps) {
  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionTitleWrapper}>
        <h4 className={styles.formSectionTitle}>{props.title}</h4>
      </div>
      {props.children}
    </div>
  );
}
