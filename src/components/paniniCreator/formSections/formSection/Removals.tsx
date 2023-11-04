import { useEffect, useMemo, useState } from "react";
import styles from "./Removals.module.css";

export default function Removals(props: RemovalsProps) {
  const [isAdditionPossible, setIsAdditionPossible] = useState(true);
  useEffect(() => {
    setIsAdditionPossible(props.isActive);
  }, [props.isActive]);

  const subtractButtons = useMemo(() => {
    const result = [];
    // skip first val cuz it can only be removed when there is no add button
    for (let i = 1; i < props.formElementsValues.length; i++) {
      result.push(
        <div className={styles.removal} key={`subtractRemoval${i}`}>
          <button
            key={`subtractRemovalbutton${i}`}
            type="button"
            className={styles.removeButton}
            onClick={() => handleSubtraction(i)}
          ></button>
        </div>
      );
    }
    return result;
  }, [props.formElementsValues]);

  const handleAddition = () => {
    if (props.formElementsValues.length < props.maxElements) {
      isAdditionPossible === false && setIsAdditionPossible(true);
      props.setFormElementsValues((prev) => [...prev, props.defaultVal]);
    }
    // if it's last possible addition:
    if (props.formElementsValues.length === props.maxElements - 1) setIsAdditionPossible(false);
  };

  const handleSubtraction = (indexToDel: number) => {
    props.setFormElementsValues((prev) => prev.filter((val, index) => index !== indexToDel));
    if (!isAdditionPossible) setIsAdditionPossible(true);
  };

  return (
    <div
      className={`${styles.removalsWrapper} ${
        props.isActive ? styles.removalsWrapperActive : styles.removalsWrapperInactive
      }`}
    >
      <div className={styles.removal}>
        <label className={styles.switch}>
          switch addons
          <input
            className={styles.switchInput}
            type="checkbox"
            onChange={props.toggleActive}
            checked={props.isActive}
          />
          <span className={styles.switchSlider}></span>
        </label>
        {props.isActive &&
          (isAdditionPossible ? (
            <button type="button" className={styles.addButton} onClick={handleAddition} />
          ) : (
            <button type="button" className={styles.removeButton} onClick={() => handleSubtraction(0)}></button>
          ))}
      </div>
      {subtractButtons.length > 0 && props.isActive && <>{...subtractButtons}</>}
    </div>
  );
}
