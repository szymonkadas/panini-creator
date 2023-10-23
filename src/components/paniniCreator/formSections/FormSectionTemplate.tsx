import { ReactNode } from "react";
import styles from "./FormSection.module.css";

type FormSectionTemplateProps = {
  title: string;
  children: ReactNode;
};

export default function FormSectionTemplate(props: FormSectionTemplateProps) {
  // transform 1st word to capitalized;
  const title = `${props.title[0].toUpperCase()}${props.title.slice(1)}`;
  return (
    <div className={styles.formSection}>
      <h4 className={styles.formSectionTitle}>{title}</h4>
      {props.children}
    </div>
  );
}
