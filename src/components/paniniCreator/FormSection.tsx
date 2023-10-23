import styles from "./FormSection.module.css";

export default function () {
  // grid 3 kolumnowy: opis, interfejs, opcje do wyboru */
  return (
    <label className={styles.formSection}>
      <p className={styles.formSectionTitle}>Bread</p>
      <div className={styles.optionsWrapper}>
        <button className={styles.textOptionLeftButton}> </button>
        <i className={styles.textOptionIcon}></i>
        <input type="text" value={"Full Grain"}></input>
        <button className={styles.textOptionRightButton}> </button>
      </div>
    </label>
  );
}
