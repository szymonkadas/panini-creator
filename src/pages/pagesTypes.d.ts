// SplashScreenLayout
type SplashScreenLayoutProps = {
  shouldTransition: boolean;
  defaultPos: boolean;
  navTo: string;
  title?: string;
  actionDesc?: string;
};

// PaniniCreator
type PaniniCreatorProps = {
  navTo: string;
};

// possible bugs later on with generating due to HONEY_MUSTARD -> HONEY MUSTARD. Change later on if needed, also added pecorino.
interface StrictSandwichPayload {
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

interface SandwichPayload {
  sandwichName: readonly string; // Max. 35 characters
  cutlery: boolean;
  napkins: boolean;
  base: {
    bread: readonly string;
    cheese: readonly string[];
    meat: readonly string[];
    dressing: readonly string[];
    vegetables: readonly string[];
  };
  extras: {
    egg: readonly string[];
    spreads: readonly string[];
    serving: readonly string;
    topping: "SESAME" | null;
  };
}

type FormField = readonly string[] | Array<boolean | (string | null)>;
type MutableFormField = Array<string | boolean | (string | null)>;
type MutableFormFieldSet = Set<string | boolean | (string | null)>;
