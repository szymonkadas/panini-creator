import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
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

const apiKey = process.env.VITE_APP_API_KEY;
const apiUrl = process.env.VITE_APP_API_URL;

type PaniniCreatorProps = {
  navTo: string;
};

export default function PaniniCreator(props: PaniniCreatorProps) {
  const methods = useForm<SandwichPayload>({
    defaultValues: SandwichDefaultVals,
    resolver: zodResolver(SandwichPayload),
  });
  const { setOrderData } = useOutletContext() as LayoutContext;
  const resetOrderData = () => {
    setOrderData({});
  };

  const navigate = useNavigate();

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
  const redirect = () => {};
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
              isBoolean={false}
            ></CheckboxSection>
            <RadioSection name={PaniniNames.serving} title="serving" options={servingVariant}></RadioSection>
            <CheckboxSection
              name={PaniniNames.topping}
              title="topping"
              options={toppingVariant}
              isBoolean={false}
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
              isBoolean={true}
            ></CheckboxSection>
            <CheckboxSection
              name={PaniniNames.napkins}
              title="napkins"
              options={["Add to order"]}
              isBoolean={true}
            ></CheckboxSection>
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
            <input type="submit" value={"ehu"} />
          </div>
        </FormCard>
      </form>
    </FormProvider>
  );
}

// possible bugs later on with generating due to HONEY_MUSTARD -> HONEY MUSTARD. Change later on if needed, also added pecorino.
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
  sandwichName: z.string().min(1).max(35),
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

const SandwichDefaultVals: SandwichPayload = {
  sandwichName: "Default Panini",
  cutlery: false,
  napkins: false,
  base: {
    bread: breadVariants[1] as "FULL GRAIN",
    cheese: [cheeseVariants[4] as "PECORINO", cheeseVariants[1] as "MOZZARELLA"],
    meat: [],
    dressing: [dressingVariants[0] as "OLIVE OIL", dressingVariants[1] as "HONEY MUSTARD"],
    vegetables: [vegetableVariant[0] as "SALAD", vegetableVariant[8] as "OBERGINE", vegetableVariant[7] as "BEETROOT"],
  },
  extras: {
    egg: [eggVariants[0] as "FRIED EGG"],
    spreads: [spreadVariant[0] as "BUTTER"],
    serving: servingVariant[1] as "WARM",
    topping: null,
  },
};

enum PaniniNames {
  bread = "base.bread",
  cheese = "base.cheese",
  meat = "base.meat",
  dressing = "base.dressing",
  vegetables = "base.vegetables",
  egg = "extras.egg",
  spreads = "extras.spreads",
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
