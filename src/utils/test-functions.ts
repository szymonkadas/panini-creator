import userEvent from "@testing-library/user-event";
import { get as lodashGet } from "lodash";
import { SandwichDefaultVals } from "../pages/PaniniCreator";
import {
  SelectFieldInteraction,
  checkboxButtonsInteraction,
  getElement,
  getElements,
  getIndexedElements,
  radioInteraction,
} from "../utils/test-helpers";
// form field tests functions:

const formDefaultValues: StrictSandwichPayload = SandwichDefaultVals;

export async function testSwipeElement(paniniName: string) {
  const swipeInputElement: HTMLInputElement = getElement(paniniName, "swipeInputElement");
  const swipeDefaultVal: string = lodashGet(formDefaultValues, paniniName);
  const leftSwipeButton: HTMLButtonElement = getElement(paniniName, "swipeLeftButton");
  // value of bread is indeed default on start
  expect(swipeInputElement.value).toBe(swipeDefaultVal);
  // value of bread is changed after user interaction
  await userEvent.click(leftSwipeButton);
  expect(swipeInputElement.value).not.toBe(swipeDefaultVal);
  return { swipeInputElement, swipeDefaultVal, leftSwipeButton };
}

export async function testMultiSwipeElements(paniniName: string, variants: readonly string[]) {
  const swipeElementsDefaultValues = lodashGet(formDefaultValues, paniniName);
  // remove elements values so the form field value would be blank, then add every panini max element, change their values and compare them with their default values.
  const swipeInputElements: HTMLInputElement[] = getIndexedElements(
    swipeElementsDefaultValues,
    paniniName,
    "swipeInputElement"
  );
  const leftSwipeButtons: HTMLButtonElement[] = getIndexedElements(
    swipeElementsDefaultValues,
    paniniName,
    "swipeLeftButton"
  );
  // dressing swipe fields values are indeed default on start
  swipeInputElements.forEach((swipeInputElement, index) => {
    expect(swipeInputElement.value).toBe(swipeElementsDefaultValues[index]);
  });
  // dressing swipe fields values are changed after user interaction"
  await Promise.all(
    swipeInputElements.map(async (swipeInputElement, index) => {
      const defaultValIndex = variants.findIndex((val) => val === swipeElementsDefaultValues[index]);
      await userEvent.click(leftSwipeButtons[index]);
      expect(swipeInputElement.value).not.toBe(variants[defaultValIndex]);
    })
  );
  return { swipeInputElements, swipeElementsDefaultValues, leftSwipeButtons };
}

export async function testSelectElements(paniniName: string, variants: readonly string[]) {
  const selectDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  const selectElements: HTMLSelectElement[] = getIndexedElements(selectDefaultValues, paniniName, "selectElement");
  // select fields values are indeed default on start
  selectElements.forEach((selectElement, index) => {
    expect(selectElement.value).toBe(selectDefaultValues[index]);
  });
  // user interacting with select fields.
  await SelectFieldInteraction(selectElements, variants, selectDefaultValues);
  // checking if values are changed.
  selectElements.forEach((selectElement, index) => {
    expect(selectElement.value).not.toBe(selectDefaultValues[index]);
  });
  return { selectElements, selectDefaultValues };
}

export async function testCheckboxButtonElements(paniniName: string, variants: readonly string[]) {
  // CheckboxButton section (vegetables)
  const checkboxButtonsDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  // 9 inputs pointing out to the same form field.
  const checkboxButtonInputElements: HTMLInputElement[] = getElements(paniniName, "checkboxButtonInputElement");
  const checkboxInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variants,
    paniniName,
    "checkboxButtonInteractionButton"
  );
  //checkbox button fields values are indeed default on start"
  checkboxButtonInputElements.forEach((checkboxButtonInputElement) => {
    const inputFieldValues = checkboxButtonInputElement.value.split(",");
    checkboxButtonsDefaultValues.forEach((defaultVal, index) => {
      expect(defaultVal).toBe(inputFieldValues[index]);
    });
  });
  // simulating many interactions
  const expectedValues = await checkboxButtonsInteraction(
    checkboxInteractionButtons,
    variants,
    checkboxButtonsDefaultValues
  );

  checkboxButtonInputElements.forEach((checkboxButtonInputElement) => {
    expect(checkboxButtonInputElement.value).toBe(`${expectedValues}`);
  });
  return { checkboxButtonInputElements, checkboxButtonsDefaultValues, checkboxInteractionButtons };
}

export async function testCheckboxElement(paniniName: string, nullish: boolean) {
  const checkboxDefaultValue = lodashGet(formDefaultValues, paniniName);
  const checkboxInputElement: HTMLInputElement = getElement(paniniName, "checkboxInputElement", 0);
  const checkboxInteractionButton: HTMLButtonElement = getElement(paniniName, "checkboxInteractionButton", 0);
  // checkbox values are indeed default on start
  if (nullish) {
    // inputs don't accept null as a value hence null is automatically converted in html/browser to "" which is falsy as null is.
    expect(!!checkboxInputElement.value).toBe(!!checkboxDefaultValue);
  } else {
    // input.value returns string, hence i put the boolean into the string
    expect(checkboxInputElement.value).toBe(`${checkboxDefaultValue}`);
  }
  // these 3 have 2 options so it's enough to click once.
  await userEvent.click(checkboxInteractionButton);
  // checkbox values are changed after user interaction
  expect(checkboxInputElement.value).not.toBe(`${checkboxDefaultValue}`);

  return { checkboxInputElement, checkboxDefaultValue, checkboxInteractionButton };
}

export async function testCheckboxElements(paniniName: string, variants: readonly string[]) {
  const checkboxDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  const checkboxInputElements: HTMLInputElement[] = getIndexedElements(variants, paniniName, "checkboxInputElement");
  const checkboxInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variants,
    paniniName,
    "checkboxInteractionButton"
  );
  const defaultSpreadsInputElements = checkboxInputElements.filter((inputElement) => {
    checkboxDefaultValues.includes(inputElement.getAttribute("data-testoption") || "");
  });
  // checkbox values are indeed default on start
  defaultSpreadsInputElements.forEach((checkboxInputElement, index) => {
    expect(checkboxInputElement.value).toBe(checkboxDefaultValues[index]);
  });
  // simulating interactions
  const spreadExpectedValues = await checkboxButtonsInteraction(
    checkboxInteractionButtons,
    variants,
    checkboxDefaultValues
  );
  // values are changed
  checkboxInputElements.forEach((checkboxInputElement) => {
    expect(`${spreadExpectedValues}`).toBe(checkboxInputElement.value);
  });

  return { checkboxInputElements, checkboxDefaultValues, checkboxInteractionButtons };
}

export async function testRadioElements(paniniName: string, variant: readonly string[]) {
  const radioInputElements: HTMLInputElement[] = getIndexedElements(variant, paniniName, "radioInputElement");
  const radioInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variant,
    paniniName,
    "radioInteractionButton"
  );
  const radioDefaultValue: string = lodashGet(formDefaultValues, paniniName);

  // value of radio section form field is indeed default on start
  radioInputElements.forEach((inputElement) => {
    expect(inputElement.value).toBe(radioDefaultValue);
  });

  // value of radio section form field is changed after user interaction
  await radioInteraction(radioInteractionButtons, radioDefaultValue);
  radioInputElements.forEach((input) => expect(input.value).not.toBe(radioDefaultValue));

  return { radioInputElements, radioDefaultValue, radioInteractionButtons };
}

export async function testTextSection(paniniName: string) {
  const textInputElement: HTMLInputElement = getElement(paniniName, "textInputElement");
  const textDefaultVal: string = lodashGet(formDefaultValues, paniniName);

  // value of text section form field is indeed default on start
  expect(textInputElement.value).toBe(textDefaultVal);

  // value of text section form field is changed after user interaction
  const notDefaultVal = "Not default name";
  await userEvent.type(textInputElement, notDefaultVal);
  expect(textInputElement.value).toBe(notDefaultVal);
}
