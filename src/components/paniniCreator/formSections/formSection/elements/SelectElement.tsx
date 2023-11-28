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
    setIsSelectActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // because Node extends EventTarget this assertion won't cause any problems.
      // this checks whether or not element targetted by user is within select boundaries.
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectActive(false);
      }
    };

    const handleFocusOutside = (event: FocusEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.relatedTarget as Node)) {
        setIsSelectActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("focusout", handleFocusOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("focusout", handleFocusOutside);
    };
  }, []);

  return (
    <label className={styles.selectLabel} ref={selectRef}>
      Select an option:
      <button
        type="button"
        className={styles.select}
        onFocus={handleSelectClick}
        value={value}
        data-testid={`${props.name}${props.index}-selectElement`}
      >
        {value}
      </button>
      <DownArrowIcon active={isSelectActive}></DownArrowIcon>
      <div className={`${styles.dropdown} ${isSelectActive ? "" : styles.inactive}`}>
        <SpecialOptions
          type="select"
          name={props.name}
          options={props.options}
          onInteract={handleOptionChange}
          parentIndex={props.index}
        ></SpecialOptions>
      </div>
    </label>
  );
}
