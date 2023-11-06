import { zodResolver } from "@hookform/resolvers/zod";
import { get as lodashGet } from "lodash";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import FormCard from "../components/paniniCreator/FormCard";
import CheckboxButtonSection from "../components/paniniCreator/formSections/CheckboxButtonSection";
import CheckboxSection from "../components/paniniCreator/formSections/CheckboxSection";
import MultiSwipeSection from "../components/paniniCreator/formSections/MultiSwipeSection";
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
import { PaniniFormSectionMaxElements, PaniniNames, PaniniNamesSets, formFieldVariantsMap } from "./formMappedData";

const apiKey = process.env.VITE_APP_API_KEY;
const apiUrl = process.env.VITE_APP_API_URL;

export default function PaniniCreator(props: PaniniCreatorProps) {
  const methods = useForm<SandwichPayload>({
    defaultValues: SandwichDefaultVals,
    resolver: zodResolver(SandwichPayload),
  });

  const navigate = useNavigate();

  const resetOrderData = () => {
    console.log("reset");
  };

  const randomizeOrderData = () => {
    function getRandomVal<T>(array: T[]): T {
      return array[Math.floor(Math.random() * array.length)];
    }
    const formValues: SandwichPayload = methods.getValues();

    Object.entries(PaniniNames).forEach(([keyName, stringPath]: [string, PaniniNames]) => {
      const val = lodashGet(formValues, stringPath);
      const possibleValues = formFieldVariantsMap[stringPath];
      const mutablePossibleValues: MutableFormField = [...possibleValues];
      const optionsCap = Math.round(Math.random() * PaniniFormSectionMaxElements[keyName] || possibleValues.length);
      if (Array.isArray(val)) {
        if (PaniniNamesSets.has(stringPath)) {
          const newVal: MutableFormFieldSet = new Set();
          for (let i = 0; i < optionsCap; i++) {
            newVal.add(getRandomVal(mutablePossibleValues));
          }
          // @ts-ignore Nie wiem jak sprawić by w obu przypadkach te ogólne typy były przyjmowane przez tamte literały.
          methods.setValue(stringPath, Array.from(newVal));
        } else {
          const newVal: MutableFormField = [];
          for (let i = 0; i < optionsCap; i++) {
            newVal.push(getRandomVal(mutablePossibleValues));
          }
          // @ts-ignore
          methods.setValue(stringPath, newVal);
        }
      } else {
        const newVal = getRandomVal(mutablePossibleValues);
        methods.setValue(stringPath, newVal);
      }
    });
  };

  const handleSave = (formValues: SandwichPayload) => {
    if (apiUrl && apiKey) {
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })
        .then((response) =>
          response.json().then((data) => {
            redirectUserOnSuccess(data.imageUrl, formValues.sandwichName);
          })
        )
        .catch((error) => console.error("Error:", error));
      return;
    } else {
      console.error("internal communication api error.");
    }
  };

  const redirectUserOnSuccess = (imageUrl: string, fileName: string) => {
    navigate(`${props.navTo}`, { state: { imageUrl, fileName } });
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.paniniCreator}
        onSubmit={(e) => {
          e.preventDefault();
          methods.handleSubmit(handleSave)(e);
        }}
      >
        <div className={styles.formsInterface}>
          <h2 className={styles.formsLabel}>Panini Creator</h2>
          <button type="button" className={styles.button} onClick={randomizeOrderData}>
            <img className={styles.diceIcon} src="/src/images/dices.svg" alt="dices icon"></img>
            Randomize Panini
          </button>
        </div>
        <FormCard title="Configure Base">
          <div className={styles.formSections}>
            <SwipeSection name={PaniniNames.bread} title="bread" options={breadVariants}>
              <img src="/src/images/wheat.svg" alt="wheatIcon" className={styles.wheatIcon}></img>
            </SwipeSection>
            <SelectSection
              name={PaniniNames.cheese}
              title="cheese"
              options={cheeseVariants}
              maxElements={PaniniFormSectionMaxElements.cheese}
            ></SelectSection>
            <SelectSection
              name={PaniniNames.meat}
              title="meat"
              options={meatVariants}
              maxElements={PaniniFormSectionMaxElements.meat}
            ></SelectSection>
            <MultiSwipeSection
              name={PaniniNames.dressing}
              title="dressing"
              options={dressingVariants}
              maxElements={PaniniFormSectionMaxElements.dressing}
            ></MultiSwipeSection>
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
              name={PaniniNames.egg}
              title="egg"
              options={eggVariants}
              maxElements={PaniniFormSectionMaxElements.egg}
            ></SelectSection>
            <CheckboxSection name={PaniniNames.spreads} title="spread" options={spreadVariant}></CheckboxSection>
            <RadioSection name={PaniniNames.serving} title="serving" options={servingVariant}></RadioSection>
            <CheckboxSection name={PaniniNames.topping} title="topping" options={toppingVariant}></CheckboxSection>
          </div>
        </FormCard>
        <FormCard title="Finalize Order">
          <div className={styles.formSections}>
            <TextSection name={PaniniNames.sandwichName} title="name panini"></TextSection>
            <CheckboxSection name={PaniniNames.cutlery} title="cutlery" options={["Add to order"]}></CheckboxSection>
            <CheckboxSection name={PaniniNames.napkins} title="napkins" options={["Add to order"]}></CheckboxSection>
          </div>
          <div className={styles.formsSubmitInterfaceWrapper}>
            {/* <NavLink to={props.navTo} onClick={setOrderDataToTrue}> */}
            <label className={styles.formsSubmitLabel}>
              place order or start again
              <input type="submit" className={styles.formsSubmit} value={"place order"} />
            </label>
            {/* </NavLink> */}
            <NavLink to="/panini_creator" onClick={resetOrderData} className={styles.formsResetNavLink}>
              <button type="submit" className={styles.formsReset}>
                start again
              </button>
            </NavLink>
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
