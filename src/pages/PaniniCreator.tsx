import { zodResolver } from "@hookform/resolvers/zod";
import { get as lodashGet } from "lodash";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import postOrderSandwich from "../Api";
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
import {
  formatSandwichData,
  generateRandomName,
  randomArrayValues,
  randomElementArray,
  randomSetValues,
} from "../utils/panini-randomization-helpers";
import styles from "./PaniniCreator.module.css";
import { PaniniFormSectionMaxElements, PaniniNames } from "./PaniniCreatorEnums";
import "/dice1.svg";
import "/dice2.svg";
import "/downArrow.svg";
import "/wheat.svg";

export default function PaniniCreator(props: PaniniCreatorProps) {
  const [formSaveError, setFormSaveError] = useState("");
  const methods = useForm<SandwichPayload>({
    defaultValues: SandwichDefaultVals,
    resolver: zodResolver(SandwichPayload),
  });

  const navigate = useNavigate();

  const resetPanini = () => {
    methods.reset();
  };

  const randomizeOrderData = useCallback(() => {
    const newFormVals = {
      sandwichName: generateRandomName(),
      cutlery: Math.random() < 0.5,
      napkins: Math.random() < 0.5,
      base: {
        bread: randomElementArray(breadVariants),
        cheese: randomArrayValues(cheeseVariants, PaniniFormSectionMaxElements.cheese),
        meat: randomArrayValues(meatVariants, PaniniFormSectionMaxElements.meat),
        dressing: randomArrayValues(dressingVariants, PaniniFormSectionMaxElements.dressing),
        vegetables: randomSetValues(vegetableVariant, vegetableVariant.length),
      },
      extras: {
        egg: randomArrayValues(eggVariants, eggVariants.length),
        spreads: randomSetValues(spreadVariant, spreadVariant.length),
        serving: randomElementArray(servingVariant),
        topping: Math.random() < 0.5 ? "SESAME" : null,
      },
    };
    Object.values(PaniniNames).forEach((stringPath) => {
      const val = lodashGet(newFormVals, stringPath);
      methods.setValue(stringPath, val);
    });
  }, []);

  const redirectUserOnSuccess = (imageUrl: string, fileName: string) => {
    navigate(`${props.navTo}`, { state: { imageUrl, fileName } });
  };

  const handleSave = (formValues: SandwichPayload) => {
    const formatResults = formatSandwichData(formValues);
    formatResults.data !== null
      ? postOrderSandwich(formatResults.data, redirectUserOnSuccess)
      : handleFormSaveError(formatResults.errorMessage || "Form Save Error");
  };
  const handleFormSaveError = (errorMessage: string) => {
    setFormSaveError(errorMessage);
    resetPanini();
  };
  const handleUserErrorAcknowledgment = () => {
    setFormSaveError("");
  };

  return (
    <>
      {formSaveError && (
        <div className={styles.formSaveErrorWrapper}>
          <div className={styles.formSaveError}>
            An error has occured during form save, please fill up the form once again.
            <button className={styles.formSaveErrorButton} onClick={handleUserErrorAcknowledgment}>
              Ok
            </button>
          </div>
        </div>
      )}
      <FormProvider {...methods}>
        <form className={styles.paniniCreator} onSubmit={methods.handleSubmit(handleSave)}>
          <div className={styles.formsInterface}>
            <h2 className={styles.formsLabel}>Panini Creator</h2>
            <button type="button" className={styles.button} onClick={randomizeOrderData}>
              <div className={styles.dicesContainer}>
                <img className={styles.diceIcon} src="/dice1.svg" alt="dice 1 icon"></img>
                <img className={styles.diceIcon} src="/dice2.svg" alt="dice 2 icon"></img>
              </div>
              Randomize Panini
            </button>
          </div>
          <FormCard title="Configure Base">
            <div className={styles.formSections}>
              <SwipeSection name={PaniniNames.bread} title="bread" options={breadVariants}>
                <img src="/wheat.svg" alt="wheatIcon" className={styles.wheatIcon}></img>
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
              <label className={styles.formsSubmitLabel}>
                place order or start again
                <input type="submit" className={styles.formsSubmit} value={"place order"} />
              </label>
              <button type="submit" className={styles.formsReset} onClick={resetPanini}>
                start again
              </button>
            </div>
          </FormCard>
        </form>
      </FormProvider>
    </>
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

const SandwichDefaultVals: StrictSandwichPayload = {
  sandwichName: "",
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
