import { useState } from "react";
import SpecialOptions from "../SpecialOptions";
import styles from "./SelectElement.module.css";

// options: ((string | number)[] | undefined)[];
type SelectElementProps = {
  options: string[];
  usedOption: number;
};

export default function SelectElement(props: SelectElementProps) {
  const [isSelectActive, setIsSelectActive] = useState(false);
  const handleSelectClick = () => {
    setIsSelectActive((prev) => !prev);
  };
  const handleBlur = () => {
    setIsSelectActive(false);
  };
  return (
    <label className={styles.selectLabel}>
      Select an option:
      <select className={styles.selectOptions} onBlur={handleBlur} onClick={handleSelectClick}>
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
