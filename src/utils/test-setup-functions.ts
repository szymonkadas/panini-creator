import { get as lodashGet } from "lodash";
import { SandwichDefaultVals } from "../pages/PaniniCreator";
import { getElement, getElements, getIndexedElements } from "./test-helpers";
// test setup functions:
const formDefaultValues: StrictSandwichPayload = SandwichDefaultVals;
export function setupSwipeElementTest(paniniName: string) {
  const swipeInputElement: HTMLInputElement = getElement(paniniName, "swipeInputElement");
  const swipeDefaultVal: string = lodashGet(formDefaultValues, paniniName);
  const leftSwipeButton: HTMLButtonElement = getElement(paniniName, "swipeLeftButton");
  return { swipeInputElement, swipeDefaultVal, leftSwipeButton };
}

export function setupMultiSwipeElementTest(paniniName: string) {
  const swipeElementsDefaultValues = lodashGet(formDefaultValues, paniniName);
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
  return { swipeElementsDefaultValues, swipeInputElements, leftSwipeButtons };
}

export function setupSelectTest(paniniName: string) {
  const selectDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  const selectElements: HTMLSelectElement[] = getIndexedElements(selectDefaultValues, paniniName, "selectElement");
  return { selectDefaultValues, selectElements };
}

export function setupCheckboxButtonsTest(paniniName: string, variants: readonly string[]) {
  const checkboxButtonsDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  const checkboxButtonInputElements: HTMLInputElement[] = getElements(paniniName, "checkboxButtonInputElement");
  const checkboxButtonInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variants,
    paniniName,
    "checkboxButtonInteractionButton"
  );
  return { checkboxButtonsDefaultValues, checkboxButtonInputElements, checkboxButtonInteractionButtons };
}

export function setupCheckboxTest(paniniName: string) {
  const checkboxDefaultValue = lodashGet(formDefaultValues, paniniName);
  const checkboxInputElement: HTMLInputElement = getElement(paniniName, "checkboxInputElement", 0);
  const checkboxInteractionButton: HTMLButtonElement = getElement(paniniName, "checkboxInteractionButton", 0);
  return { checkboxDefaultValue, checkboxInputElement, checkboxInteractionButton };
}

export function setupCheckboxesTest(paniniName: string, variants: readonly string[]) {
  const checkboxDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  const checkboxInputElements: HTMLInputElement[] = getIndexedElements(variants, paniniName, "checkboxInputElement");
  const checkboxInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variants,
    paniniName,
    "checkboxInteractionButton"
  );
  const defaultInputElements = checkboxInputElements.filter((inputElement) => {
    checkboxDefaultValues.includes(inputElement.getAttribute("data-testoption") || "");
  });
  return { checkboxDefaultValues, checkboxInputElements, checkboxInteractionButtons, defaultInputElements };
}

export function setupRadioTest(paniniName: string, variants: readonly string[]) {
  const radioInputElements: HTMLInputElement[] = getIndexedElements(variants, paniniName, "radioInputElement");
  const radioInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variants,
    paniniName,
    "radioInteractionButton"
  );
  const radioDefaultValue: string = lodashGet(formDefaultValues, paniniName);
  return { radioInputElements, radioInteractionButtons, radioDefaultValue };
}

export function setupTextSectionTest(paniniName: string) {
  const textInputElement: HTMLInputElement = getElement(paniniName, "textInputElement");
  const textDefaultVal: string = lodashGet(formDefaultValues, paniniName);
  return { textInputElement, textDefaultVal };
}
