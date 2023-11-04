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