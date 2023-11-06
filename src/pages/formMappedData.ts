import { breadVariants } from "../data/bread";
import { cheeseVariants } from "../data/cheese";
import { dressingVariants } from "../data/dressing";
import { eggVariants } from "../data/egg";
import { meatVariants } from "../data/meat";
import { servingVariant } from "../data/serving";
import { spreadVariant } from "../data/spread";
import { toppingVariant } from "../data/topping";
import { vegetableVariant } from "../data/vegetable";

export enum PaniniNames {
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

export const PaniniNamesSets = new Set([PaniniNames.vegetables, PaniniNames.spreads]);

export const formFieldVariantsMap = {
  [PaniniNames.bread]: breadVariants,
  [PaniniNames.cheese]: cheeseVariants,
  [PaniniNames.meat]: meatVariants,
  [PaniniNames.dressing]: dressingVariants,
  [PaniniNames.vegetables]: vegetableVariant,
  [PaniniNames.egg]: eggVariants,
  [PaniniNames.spreads]: spreadVariant,
  [PaniniNames.serving]: servingVariant,
  [PaniniNames.topping]: [...toppingVariant, null],
  [PaniniNames.sandwichName]: [
    ...breadVariants,
    ...cheeseVariants,
    ...meatVariants,
    ...vegetableVariant,
    ...eggVariants,
    ...spreadVariant,
    ...servingVariant,
    ...toppingVariant,
  ], // No specific variant provided for sandwichName, setting it as null for demonstration
  [PaniniNames.cutlery]: [true, false],
  [PaniniNames.napkins]: [true, false],
};

export const PaniniFormSectionMaxElements: PaniniFormSectionMaxElements = {
  cheese: 3,
  meat: 2,
  dressing: 3,
  egg: 3,
};
