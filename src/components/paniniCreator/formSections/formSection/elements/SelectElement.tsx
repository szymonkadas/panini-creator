import { useState } from "react";
import SpecialOptions from "../SpecialOptions";
import styles from "./SelectElement.module.css";

export default function SelectElement(props: SelectElementProps) {
  const [isSelectActive, setIsSelectActive] = useState(false);
  const value = Object.values(props.val).slice(0, -1).join("");
  const handleSelectClick = () => {
    setIsSelectActive((prev) => !prev);
  };

  const handleBlur = () => {
    setIsSelectActive(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.update(props.index, event.target.value);
  };

  return (
    <label className={styles.selectLabel}>
      Select an option:
      <select
        className={styles.selectOptions}
        onBlur={handleBlur}
        onClick={handleSelectClick}
        onChange={handleChange}
        value={value}
      >
        <SpecialOptions type="select" options={props.options} />
      </select>
      <img
        className={`${styles.selectArrow} ${isSelectActive && styles.selectArrowActive}`}
        src="/src/images/downArrow.svg"
        alt="select arrow"
      ></img>
    </label>
  );
}
