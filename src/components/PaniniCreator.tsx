import { breadVariants } from "../data/bread";
import { cheeseVariants } from "../data/cheese";
import { dressingVariants } from "../data/dressing";
import { eggVariants } from "../data/egg";
import { meatVariants } from "../data/meat";
import { servingVariant } from "../data/serving";
import { toppingVariant } from "../data/topping";
import { vegetableVariant } from "../data/vegetable";
import styles from "./PaniniCreator.module.css";
import Form from "./paniniCreator/Form";
import CheckboxButtonSection from "./paniniCreator/formSections/CheckboxButtonSection";
import CheckboxSection from "./paniniCreator/formSections/CheckboxSection";
import RadioSection from "./paniniCreator/formSections/RadioSection";
import SelectSection from "./paniniCreator/formSections/SelectSection";
import SwipeSection from "./paniniCreator/formSections/SwipeSection";
import TextSection from "./paniniCreator/formSections/TextSection";
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
      <Form title="Configure Extras">
        <SelectSection removable={true} title="Egg" options={eggVariants}></SelectSection>
        <CheckboxSection removable={false} title="Egg" options={eggVariants}></CheckboxSection>
        <RadioSection removable={false} title="Serving" options={servingVariant}></RadioSection>
        <CheckboxSection removable={false} title="Topping" options={toppingVariant}></CheckboxSection>
      </Form>
      <Form title="Finalize Order">
        <TextSection title="Name panini"></TextSection>
        <CheckboxSection removable={false} title="Cutlery" options={["Add to order"]}></CheckboxSection>
        <CheckboxSection removable={false} title="Name panini" options={["Add to order"]}></CheckboxSection>
        <input type="submit" className={styles.formsSubmit} value={"place order"} />
        <button className={styles.formsReset}>start again</button>
      </Form>
    </div>
  );
}
