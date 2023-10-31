import { useState } from "react";
import { useFormContext } from "react-hook-form";
import SpecialOptions from "../SpecialOptions";
import styles from "./SelectElement.module.css";

// options: ((string | number)[] | undefined)[];
type SelectElementProps = {
  name: string;
  options: string[];
  usedOption: number;
};

export default function SelectElement(props: SelectElementProps) {
  const { register } = useFormContext();
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
      <select
        className={styles.selectOptions}
        {...register(props.name, {
          onBlur: handleBlur,
          onChange: handleSelectClick,
        })}
      >
        <SpecialOptions name={props.name} type="select" options={props.options} />
      </select>
      <img
        className={`${styles.selectArrow} ${isSelectActive && styles.selectArrowActive}`}
        src="/src/images/downArrow.svg"
        alt="select arrow"
      ></img>
    </label>
  );
}
