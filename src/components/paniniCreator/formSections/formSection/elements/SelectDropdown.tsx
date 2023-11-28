import { useMemo } from "react";
import styles from "./SelectDropdown.module.css";
export default function SelectDropdown(props: SelectDropdownProps) {
  const options = useMemo(() => {
    return props.options.map((option) => {
      return (
        <div className={styles.option} onClick={() => props.handleOptionChange(option)}>
          {option}
        </div>
      );
    });
  }, props.options);
  return <div className={`${styles.dropdown} ${props.active ? "" : styles.inactive}`}>{...options}</div>;
}
