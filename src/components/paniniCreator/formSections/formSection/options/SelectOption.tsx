import styles from "./SelectOption.module.css";
export default function SelectOption(props: SelectOptionProps) {
  return (
    <div className={styles.option} data-testid={``} onClick={() => props.onInteract(props.option)}>
      {props.option}
    </div>
  );
}
