import { breadVariants } from "../data/bread";
import { cheeseVariants } from "../data/cheese";
import { dressingVariants } from "../data/dressing";
import { meatVariants } from "../data/meat";
import { vegetableVariant } from "../data/vegetable";
import styles from "./PaniniCreator.module.css";
import Form from "./paniniCreator/Form";
import CheckboxButtonSection from "./paniniCreator/formSections/CheckboxButtonSection";
import SelectSection from "./paniniCreator/formSections/SelectSection";
import SwipeSection from "./paniniCreator/formSections/SwipeSection";
export default function PaniniCreator() {
  return (
    <div className={styles.paniniCreator}>
      <div className={styles.formInterface}>
        <h2 className={styles.formsLabel}>Panini Creator</h2>
        <div className={styles.buttonWrapper}>
          <button type="button" className={styles.button}>
            Randomize Panini
          </button>
        </div>
      </div>
      <Form title="Configure Base">
        <SwipeSection removable={false} title="bread" options={breadVariants}></SwipeSection>
        <SelectSection removable={true} title="cheese" options={cheeseVariants}></SelectSection>
        <SelectSection removable={true} title="meat" options={meatVariants}></SelectSection>
        <SelectSection removable={true} title="dressing" options={dressingVariants}></SelectSection>
        <CheckboxButtonSection removable={true} title="vegetables" options={vegetableVariant}></CheckboxButtonSection>
      </Form>
    </div>
  );
}
