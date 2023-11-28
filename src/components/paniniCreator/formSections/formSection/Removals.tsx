import { useMemo } from "react";
import styles from "./Removals.module.css";

export default function Removals(props: RemovalsProps) {
  const isAdditionPossible = props.fieldsCurrentLength < props.maxElements;
  const subtractButtons = useMemo(() => {
    const result = [];
    // skip first val cuz it can only be removed when there is no add button
    for (let i = 1; i < props.fieldsCurrentLength; i++) {
      if (props?.parting && i % 2 == 1) {
        result.push(<div className={styles.removalParting} key={`subtractRemovalParting${i}`}></div>);
      }
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
      if (props?.parting && i % 2 == 1 && i + 1 < props.fieldsCurrentLength) {
        result.push(<div className={styles.removalParting} key={`subtractRemovalParting${i + 1}`}></div>);
      }
    }
    return result;
  }, [props.fieldsCurrentLength]);

  const handleAddition = () => {
    if (props.fieldsCurrentLength < props.maxElements) {
      props.onAppend(props.defaultVal);
    }
  };

  const handleSubtraction = (indexToDel: number) => {
    props.onRemove(indexToDel);
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
