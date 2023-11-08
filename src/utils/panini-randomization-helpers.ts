export function generateRandomName() {
  const names = [
    "Handy",
    "Quick",
    "Veggie",
    "Random",
    "Fanatic",
    "Grinded",
    "Massive",
    "Horrible",
    "Tasty",
    "Delicious",
    "Freckle",
    "Mocky",
    "Welles",
    "Ascended",
    "Frankly",
    "Mossy",
    "Uranus",
    "Milky",
    "Sweet",
    "Sour",
  ];
  return `${randomElementArray(names)} Panini`;
}

export function randomElementArray(array: readonly string[]) {
  const val = array[Math.floor(Math.random() * array.length)];
  return `${val}` as const;
}

export function randomArrayValues(array: readonly string[], maxLength: number): string[] {
  const randomLength = Math.floor(Math.random() * maxLength);
  const result = [];
  for (let i = 0; i < randomLength; i++) {
    result.push(randomElementArray(array));
  }
  return result;
}

export function randomSetValues(array: readonly string[], maxLength: number): string[] {
  const unusedValuesSet = new Set(array);
  const randomLength = Math.floor(Math.random() * maxLength);
  const result: string[] = [];
  for (let i = 0; i < randomLength; i++) {
    const val = randomElementArray(Array.from(unusedValuesSet));
    unusedValuesSet.delete(val);
    result.push(val);
  }
  return result;
}

export function formatSandwichData(sandwichData: SandwichPayload): {
  data: StrictSandwichPayload | null;
  errorMessage?: string;
} {
  // Validate sandwichName length
  if (sandwichData.sandwichName.length > 35) {
    return { data: null, errorMessage: "Sandwich name exceeds maximum length." };
  }

  // Validate and transform base properties
  let bread: "FULL GRAIN" | "WHEAT";
  let cheese: Array<"MOZZARELLA" | "STRACIATELLA" | "EDAM" | "GOUDA" | "PECORINO">;
  let meat: Array<"SALAMI" | "HAM" | "BACON" | "CHICKEN">;
  let dressing: Array<"OLIVE OIL" | "HONEY MUSTARD" | "RANCH" | "MAYO">;
  let vegetables: Array<
    "SALAD" | "TOMATO" | "OBERGINE" | "BEETROOT" | "PICKLES" | "ONION" | "PEPPER" | "ASPARAGUS" | "CUCUMBER"
  >;

  if (sandwichData.base.bread === "FULL GRAIN" || sandwichData.base.bread === "WHEAT") {
    bread = sandwichData.base.bread;
  } else {
    return { data: null, errorMessage: "Invalid bread type." };
  }

  // Validate and transform cheese, meat, dressing, and vegetables arrays
  cheese = sandwichData.base.cheese.filter((type: string) =>
    ["MOZZARELLA", "STRACIATELLA", "EDAM", "GOUDA", "PECORINO"].includes(type)
  ) as ("MOZZARELLA" | "STRACIATELLA" | "EDAM" | "GOUDA" | "PECORINO")[];
  meat = sandwichData.base.meat.filter((type) => ["SALAMI", "HAM", "BACON", "CHICKEN"].includes(type)) as (
    | "SALAMI"
    | "HAM"
    | "BACON"
    | "CHICKEN"
  )[];

  dressing = sandwichData.base.dressing.filter((type) =>
    ["OLIVE OIL", "HONEY MUSTARD", "RANCH", "MAYO"].includes(type)
  ) as ("OLIVE OIL" | "HONEY MUSTARD" | "RANCH" | "MAYO")[];

  vegetables = sandwichData.base.vegetables.filter((type) =>
    ["SALAD", "TOMATO", "OBERGINE", "BEETROOT", "PICKLES", "ONION", "PEPPER", "ASPARAGUS", "CUCUMBER"].includes(type)
  ) as ("SALAD" | "TOMATO" | "OBERGINE" | "BEETROOT" | "PICKLES" | "ONION" | "PEPPER" | "ASPARAGUS" | "CUCUMBER")[];

  // Validate and transform extras properties
  let egg: Array<"FRIED EGG" | "OMELET" | "SCRAMBLED EGG">;
  let spreads: Array<"BUTTER" | "HUMMUS" | "GUACAMOLE">;
  let serving: "COLD" | "WARM" | "GRILLED";

  egg = sandwichData.extras.egg.filter((type) => ["FRIED EGG", "OMELET", "SCRAMBLED EGG"].includes(type)) as (
    | "FRIED EGG"
    | "OMELET"
    | "SCRAMBLED EGG"
  )[];
  spreads = sandwichData.extras.spreads.filter((type) => ["BUTTER", "HUMMUS", "GUACAMOLE"].includes(type)) as (
    | "BUTTER"
    | "HUMMUS"
    | "GUACAMOLE"
  )[];

  if (
    sandwichData.extras.serving === "COLD" ||
    sandwichData.extras.serving === "WARM" ||
    sandwichData.extras.serving === "GRILLED"
  ) {
    serving = sandwichData.extras.serving;
  } else {
    return { data: null, errorMessage: "Invalid serving type." };
  }

  // Validate and transform topping
  let topping: "SESAME" | null;
  if (sandwichData.extras.topping === "SESAME" || sandwichData.extras.topping === null) {
    topping = sandwichData.extras.topping;
  } else {
    return { data: null, errorMessage: "Invalid topping type." };
  }

  // Create formatted StrictSandwichPayload object
  const formattedData: StrictSandwichPayload = {
    sandwichName: sandwichData.sandwichName,
    cutlery: sandwichData.cutlery,
    napkins: sandwichData.napkins,
    base: {
      bread: bread,
      cheese: cheese,
      meat: meat,
      dressing: dressing,
      vegetables: vegetables,
    },
    extras: {
      egg: egg,
      spreads: spreads,
      serving: serving,
      topping: topping,
    },
  };

  return { data: formattedData };
}
