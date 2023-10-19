import styles from "./Form.module.css";

export type FormProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Form(props: FormProps) {
  return (
    <form className={styles.mainForm}>
      <h3 className={styles.formTitle}></h3>
      {props.children}
    </form>
  );
}
