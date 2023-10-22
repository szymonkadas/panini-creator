import styles from "./Removals.module.css";

type RemovalsProps = {
  isActive: boolean;
  toggleActive: () => void;
};

export default function Removals(props: RemovalsProps) {
  return (
    <div className={styles.removalsWrapper}>
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
        {/* adding and removing will be implemented later on, with form logic */}
        {props.isActive && <button type="button" className={styles.addButton}></button>}
      </div>
      <div className={styles.removal}>
        {props.isActive && <button type="button" className={styles.removeButton}></button>}
      </div>
    </div>
  );
}
