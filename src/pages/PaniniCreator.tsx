import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useOutletContext } from "react-router-dom";
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
import { LayoutContext } from "./Layout";
import styles from "./PaniniCreator.module.css";

type PaniniCreatorProps = {
  navTo: string;
};

export default function PaniniCreator(props: PaniniCreatorProps) {
  const methods = useForm({ resolver: zodResolver(SandwichPayload) });
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
  console.log(methods.formState.errors);
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
            <CheckboxSection name={PaniniNames.spread} title="spread" options={spreadVariant}></CheckboxSection>
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

interface SandwichPayload {
  sandwichName: string; // Max. 35 characters
  cutlery: boolean;
  napkins: boolean;
  base: {
    bread: "FULL GRAIN" | "WHEAT";
    cheese: Array<"MOZZARELLA" | "STRACIATELLA" | "EDAM" | "GOUDA" | "PECORINO">;
    meat: Array<"SALAMI" | "HAM" | "BACON" | "CHICKEN">;
    dressing: Array<"OLIVE OIL" | "HONEY MUSTARD" | "RANCH" | "MAYO">;
    vegetables: Array<
      "SALAD" | "TOMATO" | "OBERGINE" | "BEETROOT" | "PICKLES" | "ONION" | "PEPPER" | "ASPARAGUS" | "CUCUMBER"
    >;
  };
  extras: {
    egg: Array<"FRIED EGG" | "OMELET" | "SCRAMBLED EGG">;
    spreads: Array<"BUTTER" | "HUMMUS" | "GUACAMOLE">;
    serving: "COLD" | "WARM" | "GRILLED";
    topping: "SESAME" | null;
  };
}

//for god known reasons ts won't accept this. cuz of some readonly stuff... that's why i'm using as "any".
const literalMapper = function (val: string[]) {
  return val.map((val) => z.literal(val)) as any;
};

const SandwichPayload = z.object({
  sandwichName: z.string().max(35),
  cutlery: z.boolean(),
  napkins: z.boolean(),
  base: z.object({
    bread: z.union(literalMapper(breadVariants)),
    cheese: z.array(z.union(literalMapper(cheeseVariants))),
    meat: z.array(z.union(literalMapper(meatVariants))),
    dressing: z.array(z.union(literalMapper(dressingVariants))),
    vegetables: z.array(z.union(literalMapper(vegetableVariant))),
  }),
  extras: z.object({
    egg: z.array(z.union(literalMapper(eggVariants))),
    spreads: z.array(z.union(literalMapper(spreadVariant))),
    serving: z.union(literalMapper(servingVariant)),
    topping: z.union([z.literal(toppingVariant[0]), z.null()]),
  }),
});

// const SandwichDefaultVals: SandwichPayload = {
//   sandwichName: "Default Panini",
//   cutlery: false,
//   napkins: false,
//   base: {
//     bread: breadVariants[0] as "WHEAT",
//     cheese: [cheeseVariants[0] as "EDAM"],
//     meat: [meatVariants[0] as "SALAMI"],
//     dressing: [dressingVariants[0] as "OLIVE OIL"],
//     vegetables: [],
//   },
//   extras: {
//     egg: [eggVariants[0] as "FRIED EGG"],
//     spreads: [],
//     serving: servingVariant[0] as "GRILLED",
//     topping: null,
//   },
// };

enum PaniniNames {
  bread = "base.bread",
  cheese = "base.cheese",
  meat = "base.meat",
  dressing = "base.dressing",
  vegetables = "base.vegetables",
  egg = "extras.egg",
  spread = "extras.spread",
  serving = "extras.serving",
  topping = "extras.topping",
  sandwichName = "sandwichName",
  cutlery = "cutlery",
  napkins = "napkins",
}
enum PaniniFormSectionMaxElements {
  cheese = 3,
  meat = 2,
  dressing = 3,
  egg = 3,
}
