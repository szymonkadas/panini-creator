import userEvent from "@testing-library/user-event";
import {
  areListedValuesEqualOrChanged,
  checkboxButtonsInteraction,
  isValEqualOrChangedToListedValues,
  radioInteraction,
  selectFieldInteraction,
  swipeElementsInteraction,
} from "../utils/test-helpers";
import {
  CheckboxButtonsElementsSetup,
  CheckboxElementsSetup,
  CheckboxesElementsSetup,
  MultiSwipeElementSetup,
  RadioElementSetup,
  SelectElementSetup,
  SwipeElementSetup,
  TextElementSetup,
  setupCheckboxButtonsTest,
  setupCheckboxTest,
  setupCheckboxesTest,
  setupMultiSwipeElementTest,
  setupRadioTest,
  setupSelectTest,
  setupSwipeElementTest,
  setupTextSectionTest,
} from "../utils/test-setup-functions";
// form field tests functions:

export async function testSwipeElement(paniniName: string) {
  const { swipeInputElement, swipeDefaultVal, leftSwipeButton } = setupSwipeElementTest(paniniName);
  // value of bread is indeed default on start
  expect(swipeInputElement.value).toBe(swipeDefaultVal);
  // value of bread is changed after user interaction
  await userEvent.click(leftSwipeButton);
  expect(swipeInputElement.value).not.toBe(swipeDefaultVal);

  return { swipeInputElement, swipeDefaultVal, leftSwipeButton };
}

export async function testMultiSwipeElements(paniniName: string, variants: readonly string[]) {
  const { swipeInputElements, swipeElementsDefaultValues, leftSwipeButtons } = setupMultiSwipeElementTest(
    paniniName,
    variants
  );
  // dressing swipe fields values are indeed default on start
  areListedValuesEqualOrChanged(swipeInputElements, swipeElementsDefaultValues, true);
  // dressing swipe fields values are changed after user interaction"
  const newValues = await swipeElementsInteraction(leftSwipeButtons, variants, swipeElementsDefaultValues);
  areListedValuesEqualOrChanged(swipeInputElements, newValues, true);

  return { swipeInputElements, swipeElementsDefaultValues, leftSwipeButtons };
}

export async function testSelectElements(paniniName: string, variants: readonly string[]) {
  let { selectElements, selectDefaultValues, selectElementsOptions } = setupSelectTest(paniniName, variants);
  // select fields values are indeed default on start
  areListedValuesEqualOrChanged(selectElements, selectDefaultValues, true);
  // user interacting with select fields.
  await selectFieldInteraction(selectElements, selectElementsOptions, variants, selectDefaultValues);
  // checking if values are changed.
  // updating select elements pointers
  selectElements = setupSelectTest(paniniName, variants).selectElements;
  areListedValuesEqualOrChanged(selectElements, selectDefaultValues, false);

  return { selectElements, selectDefaultValues };
}

export async function testCheckboxButtonElements(paniniName: string, variants: readonly string[]) {
  const { checkboxButtonInputElements, checkboxButtonsDefaultValues, checkboxButtonInteractionButtons } =
    setupCheckboxButtonsTest(paniniName, variants);
  //checkbox button fields values are indeed default on start"
  isValEqualOrChangedToListedValues(checkboxButtonsDefaultValues.join(","), checkboxButtonInputElements, true);
  // simulating many interactions
  const expectedValues = await checkboxButtonsInteraction(
    checkboxButtonInteractionButtons,
    variants,
    checkboxButtonsDefaultValues
  );
  // checking are values changed after user interaction
  isValEqualOrChangedToListedValues(`${expectedValues}`, checkboxButtonInputElements, true);

  return { checkboxButtonInputElements, checkboxButtonsDefaultValues, checkboxButtonInteractionButtons };
}

export async function testCheckboxElement(paniniName: string, nullish: boolean) {
  const { checkboxInputElement, checkboxDefaultValue, checkboxInteractionButton } = setupCheckboxTest(paniniName);
  // checkbox values are indeed default on start
  if (nullish) {
    // inputs don't accept null as a value hence null is automatically converted in html/browser to "" which is falsy as null is.
    expect(!!checkboxInputElement.value).toBe(!!checkboxDefaultValue);
  } else {
    // input.value returns string, hence i put the boolean into the string
    expect(checkboxInputElement.value).toBe(`${checkboxDefaultValue}`);
  }
  await userEvent.click(checkboxInteractionButton);
  // checking if checkbox values are changed after user interaction
  expect(checkboxInputElement.value).not.toBe(`${checkboxDefaultValue}`);

  return { checkboxInputElement, checkboxDefaultValue, checkboxInteractionButton };
}

export async function testCheckboxElements(paniniName: string, variants: readonly string[]) {
  const { checkboxDefaultValues, checkboxInputElements, checkboxInteractionButtons, defaultInputElements } =
    setupCheckboxesTest(paniniName, variants);
  // checkbox values are indeed default on start
  areListedValuesEqualOrChanged(defaultInputElements, checkboxDefaultValues, true);
  // simulating interactions
  const spreadExpectedValues = await checkboxButtonsInteraction(
    checkboxInteractionButtons,
    variants,
    checkboxDefaultValues
  );
  // values are changed
  isValEqualOrChangedToListedValues(`${spreadExpectedValues}`, checkboxInputElements, true);

  return { checkboxInputElements, checkboxDefaultValues, checkboxInteractionButtons, defaultInputElements };
}

export async function testRadioElements(paniniName: string, variants: readonly string[]) {
  const { radioInputElements, radioInteractionButtons, radioDefaultValue } = setupRadioTest(paniniName, variants);
  // value of radio section form field is indeed default on start
  isValEqualOrChangedToListedValues(radioDefaultValue, radioInputElements, true);
  // value of radio section form field is changed after user interaction
  await radioInteraction(radioInteractionButtons, radioDefaultValue);
  isValEqualOrChangedToListedValues(radioDefaultValue, radioInputElements, false);

  return { radioInputElements, radioDefaultValue, radioInteractionButtons };
}

export async function testTextSection(paniniName: string) {
  const { textInputElement, textDefaultVal } = setupTextSectionTest(paniniName);
  // value of text section form field is indeed default on start
  expect(textInputElement.value).toBe(textDefaultVal);
  // value of text section form field is changed after user interaction
  const notDefaultVal = "Not default name";
  await userEvent.type(textInputElement, notDefaultVal);
  expect(textInputElement.value).toBe(notDefaultVal);

  return { textInputElement, textDefaultVal };
}

// Check If every field has default values
export function checkFormValuesToBeDefault(
  breadSetup: SwipeElementSetup,
  dressingSetup: MultiSwipeElementSetup,
  cheeseSetup: SelectElementSetup,
  meatSetup: SelectElementSetup,
  eggSetup: SelectElementSetup,
  vegetableSetup: CheckboxButtonsElementsSetup,
  spreadsSetup: CheckboxesElementsSetup,
  toppingSetup: CheckboxElementsSetup,
  cutlerySetup: CheckboxElementsSetup,
  napkinsSetup: CheckboxElementsSetup,
  servingSetup: RadioElementSetup,
  sandwichNameSetup: TextElementSetup
) {
  expect(breadSetup.swipeInputElement.value).toBe(breadSetup.swipeDefaultVal);
  // multi swipe section (dressing)
  areListedValuesEqualOrChanged(dressingSetup.swipeInputElements, dressingSetup.swipeElementsDefaultValues, true);
  // select section (cheese, meat, egg)
  areListedValuesEqualOrChanged(cheeseSetup.selectElements, cheeseSetup.selectDefaultValues, true);
  areListedValuesEqualOrChanged(meatSetup.selectElements, meatSetup.selectDefaultValues, true);
  areListedValuesEqualOrChanged(eggSetup.selectElements, eggSetup.selectDefaultValues, true);
  // checkboxButton section (vegetables)
  isValEqualOrChangedToListedValues(
    vegetableSetup.checkboxButtonsDefaultValues.join(","),
    vegetableSetup.checkboxButtonInputElements,
    true
  );
  // Checkbox section (spreads, topping, cutlery, napkins)
  areListedValuesEqualOrChanged(spreadsSetup.defaultInputElements, spreadsSetup.checkboxDefaultValues, true);
  expect(!!toppingSetup.checkboxInputElement.value).toBe(!!toppingSetup.checkboxDefaultValue);
  expect(cutlerySetup.checkboxInputElement.value).toBe(`${cutlerySetup.checkboxDefaultValue}`);
  expect(napkinsSetup.checkboxInputElement.value).toBe(`${napkinsSetup.checkboxDefaultValue}`);
  // Radio section (serving)
  isValEqualOrChangedToListedValues(servingSetup.radioDefaultValue, servingSetup.radioInputElements, true);
  // Text section (sandwichName field)
  expect(sandwichNameSetup.textInputElement.value).toBe(sandwichNameSetup.textDefaultVal);
}

export type FormState = {
  bread: SwipeElementSetup;
  dressing: MultiSwipeElementSetup;
  cheese: SelectElementSetup;
  meat: SelectElementSetup;
  egg: SelectElementSetup;
  vegetable: CheckboxButtonsElementsSetup;
  spreads: CheckboxesElementsSetup;
  topping: CheckboxElementsSetup;
  cutlery: CheckboxElementsSetup;
  napkins: CheckboxElementsSetup;
  serving: RadioElementSetup;
  sandwichName: TextElementSetup;
};

type FormStateValues = {
  bread: string;
  dressing: string[];
  cheese: string[];
  meat: string[];
  egg: string[];
  vegetable: string[];
  spreads: string[];
  topping: string;
  cutlery: string;
  napkins: string;
  serving: string;
  sandwichName: string;
};

export function checkFormValuesToNotBeDefault(formState: FormState) {
  const originalFormState: FormStateValues = {
    bread: formState.bread.swipeDefaultVal,
    dressing: formState.dressing.swipeElementsDefaultValues,
    cheese: formState.cheese.selectDefaultValues,
    meat: formState.meat.selectDefaultValues,
    egg: formState.egg.selectDefaultValues,
    vegetable: formState.vegetable.checkboxButtonsDefaultValues,
    spreads: formState.spreads.checkboxDefaultValues,
    topping: `${formState.topping.checkboxDefaultValue}`,
    cutlery: `${formState.cutlery.checkboxDefaultValue}`,
    napkins: `${formState.napkins.checkboxDefaultValue}`,
    serving: formState.serving.radioDefaultValue,
    sandwichName: formState.sandwichName.textDefaultVal,
  };

  const changedFormState: FormStateValues = {
    bread: formState.bread.swipeInputElement.value,
    dressing: Array.from(formState.dressing.swipeInputElements, (element) => element.value),
    cheese: Array.from(formState.cheese.selectElements, (element) => element.value),
    meat: Array.from(formState.meat.selectElements, (element) => element.value),
    egg: Array.from(formState.egg.selectElements, (element) => element.value),
    vegetable: formState.vegetable.checkboxButtonInputElements[0].value.split(","),
    spreads: formState.spreads.checkboxInputElements[0].value.split(","),
    topping: formState.topping.checkboxInputElement.value,
    cutlery: formState.cutlery.checkboxInputElement.value,
    napkins: formState.napkins.checkboxInputElement.value,
    // every radio button has the checked radio button value
    serving: formState.serving.radioInputElements[0].value,
    sandwichName: formState.sandwichName.textInputElement.value,
  };
  // atleast one field has to differ.
  expect(originalFormState).not.toEqual(changedFormState);
}
