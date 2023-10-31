import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useOutletContext } from "react-router-dom";
import Form from "../components/paniniCreator/Form";
import CheckboxButtonSection from "../components/paniniCreator/formSections/CheckboxButtonSection";
import CheckboxSection from "../components/paniniCreator/formSections/CheckboxSection";
import RadioSection from "../components/paniniCreator/formSections/RadioSection";
import SelectSection from "../components/paniniCreator/formSections/SelectSection";
import SwipeSection from "../components/paniniCreator/formSections/SwipeSection";
import TextSection from "../components/paniniCreator/formSections/TextSection";
import { breadVariants } from "../data/bread";
import { cheeseVariants } from "../data/cheese";
import { dressingVariants } from "../data/dressing";
import { eggVariants } from "../data/egg";
import { meatVariants } from "../data/meat";
import { servingVariant } from "../data/serving";
import { spreadVariant } from "../data/spread";
import { toppingVariant } from "../data/topping";
import { vegetableVariant } from "../data/vegetable";
import { LayoutContext } from "./Layout";
import styles from "./PaniniCreator.module.css";

type PaniniCreatorProps = {
  navTo: string;
};

export default function PaniniCreator(props: PaniniCreatorProps) {
  const methods = useForm();
  const { control, register, handleSubmit, setValue, watch } = methods;
  const { setOrderData } = useOutletContext() as LayoutContext;
  const resetOrderData = () => {
    setOrderData({});
  };
  // for now this will do.
  const setOrderDataToTrue = () => {
    setOrderData({ order: true });
  };

  const handleSave = (formValues: any) => {
    console.log("D:");
    console.log(formValues);
    return;
  };
  return (
    <FormProvider {...methods}>
      <form className={styles.paniniCreator} onSubmit={handleSubmit(handleSave)}>
        <div className={styles.formsInterface}>
          <h2 className={styles.formsLabel}>Panini Creator</h2>
          <button type="button" className={styles.button}>
            <img className={styles.diceIcon} src="/src/images/dices.svg" alt="dices icon"></img>
            Randomize Panini
          </button>
        </div>
        <Form title="Configure Base">
          <div className={styles.formSections}>
            <SwipeSection removable={false} name="bread" title="bread" options={breadVariants}>
              <img src="/src/images/wheat.svg" alt="wheatIcon" className={styles.wheatIcon}></img>
            </SwipeSection>
            <SelectSection removable={true} name="cheese" title="cheese" options={cheeseVariants}></SelectSection>
            <SelectSection removable={true} name="meat" title="meat" options={meatVariants}></SelectSection>
            <SwipeSection removable={true} name="dressing" title="dressing" options={dressingVariants}></SwipeSection>
            <CheckboxButtonSection
              removable={true}
              name="vegetables"
              title="vegetables"
              options={vegetableVariant}
            ></CheckboxButtonSection>
          </div>
        </Form>
        <Form title="Configure Extras">
          <div className={styles.formSections}>
            <SelectSection removable={true} name="egg" title="egg" options={eggVariants}></SelectSection>
            <CheckboxSection removable={false} name="spread" title="spread" options={spreadVariant}></CheckboxSection>
            <RadioSection removable={false} name="serving" title="serving" options={servingVariant}></RadioSection>
            <CheckboxSection
              removable={false}
              name="topping"
              title="topping"
              options={toppingVariant}
            ></CheckboxSection>
          </div>
        </Form>
        <Form title="Finalize Order">
          <div className={styles.formSections}>
            <TextSection name={"name_panini"} title="name panini"></TextSection>
            <CheckboxSection
              removable={false}
              name="cutlery"
              title="cutlery"
              options={["Add to order"]}
            ></CheckboxSection>
            <CheckboxSection
              removable={false}
              name="napkins"
              title="napkins"
              options={["Add to order"]}
            ></CheckboxSection>
          </div>
          <div className={styles.formsSubmitInterfaceWrapper}>
            <NavLink to={props.navTo} onClick={setOrderDataToTrue}>
              <label className={styles.formsSubmitLabel}>
                place order or start again
                <input type="submit" className={styles.formsSubmit} value={"place order"} />
              </label>
            </NavLink>
            <NavLink to="/panini_creator" onClick={resetOrderData} className={styles.formsResetNavLink}>
              <button type="submit" className={styles.formsReset}>
                start again
              </button>
            </NavLink>
            <input type="submit" value={"ehu"} />
          </div>
        </Form>
      </form>
    </FormProvider>
  );
}
