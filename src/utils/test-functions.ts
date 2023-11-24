import userEvent from "@testing-library/user-event";
import { SandwichDefaultVals } from "../pages/PaniniCreator";
import {
  areListedValuesEqualOrChanged,
  checkboxButtonsInteraction,
  isValEqualOrChangedToListedValues,
  radioInteraction,
  selectFieldInteraction,
  setupCheckboxButtonsTest,
  setupCheckboxTest,
  setupCheckboxesTest,
  setupMultiSwipeElementTest,
  setupRadioTest,
  setupSelectTest,
  setupSwipeElementTest,
  setupTextSectionTest,
  swipeElementsInteraction,
} from "../utils/test-helpers";

// form field tests functions:
const formDefaultValues: StrictSandwichPayload = SandwichDefaultVals;

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
  const { swipeInputElements, swipeElementsDefaultValues, leftSwipeButtons } = setupMultiSwipeElementTest(paniniName);
  // dressing swipe fields values are indeed default on start
  areListedValuesEqualOrChanged(swipeInputElements, swipeElementsDefaultValues, true);
  // dressing swipe fields values are changed after user interaction"
  const newValues = await swipeElementsInteraction(leftSwipeButtons, variants, swipeElementsDefaultValues);
  areListedValuesEqualOrChanged(swipeInputElements, newValues, true);

  return { swipeInputElements, swipeElementsDefaultValues, leftSwipeButtons };
}

export async function testSelectElements(paniniName: string, variants: readonly string[]) {
  const { selectElements, selectDefaultValues } = setupSelectTest(paniniName);
  // select fields values are indeed default on start
  areListedValuesEqualOrChanged(selectElements, selectDefaultValues, true);
  // user interacting with select fields.
  await selectFieldInteraction(selectElements, variants, selectDefaultValues);
  // checking if values are changed.
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
  const { checkboxDefaultValues, checkboxInputElements, checkboxInteractionButtons, defaultSpreadsInputElements } =
    setupCheckboxesTest(paniniName, variants);
  // checkbox values are indeed default on start
  areListedValuesEqualOrChanged(defaultSpreadsInputElements, checkboxDefaultValues, true);
  // simulating interactions
  const spreadExpectedValues = await checkboxButtonsInteraction(
    checkboxInteractionButtons,
    variants,
    checkboxDefaultValues
  );
  // values are changed
  isValEqualOrChangedToListedValues(`${spreadExpectedValues}`, checkboxInputElements, true);

  return { checkboxInputElements, checkboxDefaultValues, checkboxInteractionButtons };
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
