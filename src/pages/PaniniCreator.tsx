import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";
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
import styles from "./PaniniCreator.module.css";
import { PaniniFormSectionMaxElements, PaniniNames } from "./enums";

export default function PaniniCreator(props: PaniniCreatorProps) {
  const methods = useForm<SandwichPayload>({
    defaultValues: SandwichDefaultVals,
    resolver: zodResolver(SandwichPayload),
  });

  const resetOrderData = () => {
    console.log("reset");
  };

  const handleSave = (formValues: SandwichPayload) => {
    console.log("D:");
    console.log(formValues);
    return;
  };

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
            <SwipeSection removable={false} name={PaniniNames.bread} title="bread" options={breadVariants}>
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
              name={PaniniNames.vegetables}
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
            <CheckboxSection
              name={PaniniNames.spreads}
              title="spread"
              options={spreadVariant}
              isValBoolean={false}
            ></CheckboxSection>
            <RadioSection name={PaniniNames.serving} title="serving" options={servingVariant}></RadioSection>
            <CheckboxSection
              name={PaniniNames.topping}
              title="topping"
              options={toppingVariant}
              isValBoolean={false}
            ></CheckboxSection>
          </div>
        </FormCard>
        <FormCard title="Finalize Order">
          <div className={styles.formSections}>
            <TextSection name={PaniniNames.sandwichName} title="name panini"></TextSection>
            <CheckboxSection
              name={PaniniNames.cutlery}
              title="cutlery"
              options={["Add to order"]}
              isValBoolean={true}
            ></CheckboxSection>
            <CheckboxSection
              name={PaniniNames.napkins}
              title="napkins"
              options={["Add to order"]}
              isValBoolean={true}
            ></CheckboxSection>
          </div>
          <div className={styles.formsSubmitInterfaceWrapper}>
            <NavLink to={props.navTo}>
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

const SandwichPayload = z.object({
  sandwichName: z.string().min(1).max(35),
  cutlery: z.boolean(),
  napkins: z.boolean(),
  base: z.object({
    bread: z.enum([...breadVariants]),
    cheese: z.array(z.enum([...cheeseVariants])),
    meat: z.array(z.enum([...meatVariants])),
    dressing: z.array(z.enum([...dressingVariants])),
    vegetables: z.array(z.enum([...vegetableVariant])),
  }),
  extras: z.object({
    egg: z.array(z.enum([...eggVariants])),
    spreads: z.array(z.enum([...spreadVariant])),
    serving: z.enum([...servingVariant]),
    topping: z.union([z.literal(toppingVariant[0]), z.null()]),
  }),
});

const SandwichDefaultVals: SandwichPayload = {
  sandwichName: "Default Panini",
  cutlery: false,
  napkins: false,
  base: {
    bread: breadVariants[1],
    cheese: [cheeseVariants[4], cheeseVariants[1]],
    meat: [],
    dressing: [dressingVariants[0], dressingVariants[1]],
    vegetables: [vegetableVariant[0], vegetableVariant[8], vegetableVariant[7]],
  },
  extras: {
    egg: [eggVariants[0]],
    spreads: [spreadVariant[0]],
    serving: servingVariant[1],
    topping: null,
  },
};
