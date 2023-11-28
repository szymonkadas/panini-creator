import { useEffect, useRef, useState } from "react";
import DownArrowIcon from "../../../../icons/DownArrowIcon";
import SpecialOptions from "../SpecialOptions";
import styles from "./SelectElement.module.css";

export default function SelectElement(props: SelectElementProps) {
  const value = Object.values(props.val).slice(0, -1).join("");
  const [isSelectActive, setIsSelectActive] = useState(false);
  const selectRef = useRef<HTMLLabelElement>(null);

  const handleSelectClick = () => {
    setIsSelectActive((prev) => !prev);
  };

  const handleOptionChange = (option: string) => {
    props.onUpdate(props.index, option);
  };

  const handleBlur = (event: MouseEvent) => {
    // because Node extends EventTarget this assertion won't cause any problems.
    // this checks whether or not element targetted by user is within select boundaries.
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsSelectActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleBlur);
    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  return (
    <label className={styles.selectLabel} ref={selectRef}>
      Select an option:
      <button
        type="button"
        className={styles.select}
        onClick={handleSelectClick}
        value={value}
        data-testid={`${props.name}${props.index}-selectElement`}
      >
        {value}
      </button>
      <DownArrowIcon active={isSelectActive}></DownArrowIcon>
      <div className={`${styles.dropdown} ${isSelectActive ? "" : styles.inactive}`}>
        <SpecialOptions type="select" options={props.options} onInteract={handleOptionChange}></SpecialOptions>
      </div>
    </label>
  );
}
