import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useOutletContext } from "react-router-dom";
import FormCard from "../components/paniniCreator/FormCard";
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

  enum PaniniNames {
    cheese = "cheese",
    meat = "meat",
    dressing = "dressing",
    vegetables = "vegetables",
    egg = "egg",
    spread = "spread",
    serving = "serving",
    topping = "topping",
    namePanini = "namePanini",
    cutlery = "cutlery",
    napkins = "napkins",
  }
  enum PaniniFormSectionMaxElements {
    cheese = 3,
    meat = 2,
    dressing = 3,
    egg = 3,
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.paniniCreator} onSubmit={methods.handleSubmit(handleSave)}>
        <div className={styles.formsInterface}>
          <h2 className={styles.formsLabel}>Panini Creator</h2>
          <button type="button" className={styles.button}>
            <img className={styles.diceIcon} src="/src/images/dices.svg" alt="dices icon"></img>
            Randomize Panini
          </button>
        </div>
        <FormCard title="Configure Base">
          <div className={styles.formSections}>
            <SwipeSection removable={false} name="bread" title="bread" options={breadVariants}>
              <img src="/src/images/wheat.svg" alt="wheatIcon" className={styles.wheatIcon}></img>
            </SwipeSection>
            <SelectSection
              removable={PaniniFormSectionMaxElements.cheese ? true : false}
              name={PaniniNames.cheese}
              title="cheese"
              options={cheeseVariants}
              maxElements={PaniniFormSectionMaxElements.cheese}
            ></SelectSection>
            <SelectSection
              removable={true}
              name={PaniniNames.meat}
              title="meat"
              options={meatVariants}
              maxElements={PaniniFormSectionMaxElements.meat}
            ></SelectSection>
            <SwipeSection
              removable={true}
              name={PaniniNames.dressing}
              title="dressing"
              options={dressingVariants}
              maxElements={PaniniFormSectionMaxElements.dressing}
            ></SwipeSection>
            <CheckboxButtonSection
              name="vegetables"
              title="vegetables"
              options={vegetableVariant}
            ></CheckboxButtonSection>
          </div>
        </FormCard>
        <FormCard title="Configure Extras">
          <div className={styles.formSections}>
            <SelectSection
              removable={true}
              name={PaniniNames.egg}
              title="egg"
              options={eggVariants}
              maxElements={PaniniFormSectionMaxElements.egg}
            ></SelectSection>
            <CheckboxSection name="spread" title="spread" options={spreadVariant}></CheckboxSection>
            <RadioSection name="serving" title="serving" options={servingVariant}></RadioSection>
            <CheckboxSection name="topping" title="topping" options={toppingVariant}></CheckboxSection>
          </div>
        </FormCard>
        <FormCard title="Finalize Order">
          <div className={styles.formSections}>
            <TextSection name={"name_panini"} title="name panini"></TextSection>
            <CheckboxSection name="cutlery" title="cutlery" options={["Add to order"]}></CheckboxSection>
            <CheckboxSection name="napkins" title="napkins" options={["Add to order"]}></CheckboxSection>
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
        </FormCard>
      </form>
    </FormProvider>
  );
}
