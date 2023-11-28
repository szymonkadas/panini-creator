import { useEffect, useRef, useState } from "react";
import DownArrowIcon from "../../../../icons/DownArrowIcon";
import SpecialOptions from "../SpecialOptions";
import styles from "./SelectElement.module.css";

export default function SelectElement(props: SelectElementProps) {
  const value = Object.values(props.val).slice(0, -1).join("");
  const [isSelectActive, setIsSelectActive] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [focusedByKey, setIsFocusedByKey] = useState(false);

  const handleMouseClick = () => {
    if (!focusedByKey) {
      setIsSelectActive((prev) => !prev);
    } else {
      setIsFocusedByKey(false);
    }
  };

  // if the event was triggered by keyboard focus use this:
  const handleFocus = () => {
    setIsSelectActive(true);
    setIsFocusedByKey(true);
  };

  const handleOptionChange = (option: string) => {
    props.onUpdate(props.index, option);
    setIsSelectActive(false);
  };

  useEffect(() => {
    const handleInteractionOutside = (event: MouseEvent | FocusEvent) => {
      // because Node extends EventTarget this assertion won't cause any problems.
      // this checks whether or not element targetted by user is within select boundaries.
      if (labelRef.current && !labelRef.current.contains(event.target as Node)) {
        setIsSelectActive(false);
        setIsFocusedByKey(false);
      }
    };
    document.addEventListener("click", handleInteractionOutside);
    document.addEventListener("focusout", handleInteractionOutside);
    return () => {
      document.removeEventListener("click", handleInteractionOutside);
      document.removeEventListener("focusout", handleInteractionOutside);
    };
  }, []);

  return (
    <label className={styles.selectLabel} ref={labelRef}>
      Select an option:
      <button
        type="button"
        className={styles.select}
        onClick={handleMouseClick}
        onFocus={handleFocus}
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
