import styles from "./PaniniCreator.module.css";
import Form from "./paniniCreator/Form";
export default function PaniniCreator() {
  return (
    <div className={styles.paniniCreator}>
      <div className={styles.formInterface}>
        <h2 className={styles.formsLabel}>Panini Creator</h2>
        {/* <NavLink to="/panini_creator:"> */}
        <div className={styles.buttonWrapper}>
          <button className={styles.button}>Randomize Panini</button>
        </div>
        {/* </NavLink> */}
      </div>
      <Form></Form>
    </div>
  );
}
