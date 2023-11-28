import styles from "./SelectOption.module.css";
export default function SelectOption(props: SelectOptionProps) {
  return (
    <button
      type="button"
      className={styles.option}
      data-testid={`${props.name}${props.parentIndex}-selectOption${props.index}`}
      onClick={() => props.onInteract(props.option)}
      value={props.option}
    >
      {props.option}
    </button>
  );
}
