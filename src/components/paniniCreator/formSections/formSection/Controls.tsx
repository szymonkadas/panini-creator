import styles from "./Controls.module.css";
export default function Controls(props: ControlsProps) {
  const handleAddition = () => {
    if (props.currentFieldsLength < props.maxElements) props.onAppend && props.onAppend(props.defaultVal);
  };

  const handleSubtraction = (indexToDel: number) => {
    props.onRemove && props.onRemove(indexToDel);
  };

  return (
    <div className={styles.controls}>
      {props.elementIndex === 0 && (
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
      )}

      {props.isActive &&
        (props.elementIndex === 0 && props.currentFieldsLength < props.maxElements ? (
          <button type="button" className={styles.addButton} onClick={handleAddition} />
        ) : (
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => handleSubtraction(props.elementIndex)}
          ></button>
        ))}
    </div>
  );
}
