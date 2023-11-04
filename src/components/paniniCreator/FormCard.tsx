import styles from "./Form.module.css";

export default function FormCard(props: FormProps) {
  return (
    <article className={styles.form}>
      <h3 className={styles.formTitle}>{props.title}</h3>
      {props.children}
    </article>
  );
}
