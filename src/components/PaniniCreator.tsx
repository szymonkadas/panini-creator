import { breadVariants } from "../data/bread";
import { cheeseVariants } from "../data/cheese";
import { dressingVariants } from "../data/dressing";
import { eggVariants } from "../data/egg";
import { meatVariants } from "../data/meat";
import { servingVariant } from "../data/serving";
import { spreadVariant } from "../data/spread";
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
    <main className={styles.paniniCreator}>
      <div className={styles.formsInterface}>
        <h2 className={styles.formsLabel}>Panini Creator</h2>
        <button type="button" className={styles.button}>
          <img className={styles.diceIcon} src="/src/images/dices.svg" alt="dices icon"></img>
          Randomize Panini
        </button>
      </div>
      <Form title="Configure Base">
        <article className={styles.formSections}>
          <SwipeSection removable={false} title="bread" options={breadVariants}>
            <img src="/src/images/wheat.svg" alt="wheatIcon" className={styles.wheatIcon}></img>
          </SwipeSection>
          <SelectSection removable={true} title="cheese" options={cheeseVariants}></SelectSection>
          <SelectSection removable={true} title="meat" options={meatVariants}></SelectSection>
          <SwipeSection removable={true} title="dressing" options={dressingVariants}></SwipeSection>
          <CheckboxButtonSection removable={true} title="vegetables" options={vegetableVariant}></CheckboxButtonSection>
        </article>
      </Form>
      <Form title="Configure Extras">
        <article className={styles.formSections}>
          <SelectSection removable={true} title="Egg" options={eggVariants}></SelectSection>
          <CheckboxSection removable={false} title="Egg" options={spreadVariant}></CheckboxSection>
          <RadioSection removable={false} title="Serving" options={servingVariant} name={"serving"}></RadioSection>
          <CheckboxSection removable={false} title="Topping" options={toppingVariant}></CheckboxSection>
        </article>
      </Form>
      <Form title="Finalize Order">
        <article className={styles.formSections}>
          <TextSection title="Name panini"></TextSection>
          <CheckboxSection removable={false} title="Cutlery" options={["Add to order"]}></CheckboxSection>
          <CheckboxSection removable={false} title="Name panini" options={["Add to order"]}></CheckboxSection>
        </article>
        <div className={styles.formsSubmitInterfaceWrapper}>
          <label className={styles.formsSubmitLabel}>
            place order or start again
            <input type="submit" className={styles.formsSubmit} value={"place order"} />
          </label>
          <button className={styles.formsReset}>start again</button>
        </div>
      </Form>
    </main>
  );
}
