import { get as lodashGet } from "lodash";
import { SandwichDefaultVals } from "../pages/PaniniCreator";
import { getElement, getElements, getIndexedElements, getNestedElements } from "./test-helpers";
// test setup functions:
const formDefaultValues: StrictSandwichPayload = SandwichDefaultVals;

export type SwipeElementSetup = {
  swipeInputElement: HTMLInputElement;
  swipeDefaultVal: string;
  leftSwipeButton: HTMLButtonElement;
};

export function setupSwipeElementTest(paniniName: string): SwipeElementSetup {
  const swipeInputElement: HTMLInputElement = getElement(paniniName, "swipeInputElement");
  const swipeDefaultVal: string = lodashGet(formDefaultValues, paniniName);
  const leftSwipeButton: HTMLButtonElement = getElement(paniniName, "swipeLeftButton");
  return { swipeInputElement, swipeDefaultVal, leftSwipeButton };
}

export type MultiSwipeElementSetup = {
  swipeElementsDefaultValues: string[];
  swipeInputElements: HTMLInputElement[];
  leftSwipeButtons: HTMLButtonElement[];
};

export function setupMultiSwipeElementTest(paniniName: string, variants: readonly string[]): MultiSwipeElementSetup {
  const swipeElementsDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  const swipeInputElements: HTMLInputElement[] = getIndexedElements(variants, paniniName, "swipeInputElement");
  const leftSwipeButtons: HTMLButtonElement[] = getIndexedElements(variants, paniniName, "swipeLeftButton");
  return { swipeElementsDefaultValues, swipeInputElements, leftSwipeButtons };
}
export type SelectElementSetup = {
  selectDefaultValues: string[];
  selectElements: HTMLButtonElement[];
  selectElementsOptions: HTMLButtonElement[][];
};

export function setupSelectTest(paniniName: string, variants: readonly string[]): SelectElementSetup {
  const selectDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  const selectElements: HTMLButtonElement[] = getIndexedElements(selectDefaultValues, paniniName, "selectElement");
  const selectElementsOptions: HTMLButtonElement[][] = getNestedElements(
    paniniName,
    "selectOption",
    selectElements.length,
    variants.length
  );
  return { selectDefaultValues, selectElements, selectElementsOptions };
}

export type CheckboxButtonsElementsSetup = {
  checkboxButtonsDefaultValues: string[];
  checkboxButtonInputElements: HTMLInputElement[];
  checkboxButtonInteractionButtons: HTMLButtonElement[];
};

export function setupCheckboxButtonsTest(
  paniniName: string,
  variants: readonly string[]
): CheckboxButtonsElementsSetup {
  const checkboxButtonsDefaultValues: string[] = lodashGet(formDefaultValues, paniniName);
  const checkboxButtonInputElements: HTMLInputElement[] = getElements(paniniName, "checkboxButtonInputElement");
  const checkboxButtonInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variants,
    paniniName,
    "checkboxButtonInteractionButton"
  );
  return { checkboxButtonsDefaultValues, checkboxButtonInputElements, checkboxButtonInteractionButtons };
}

export type CheckboxElementsSetup = {
  checkboxDefaultValue: string[];
  checkboxInputElement: HTMLInputElement;
  checkboxInteractionButton: HTMLButtonElement;
};

export function setupCheckboxTest(paniniName: string): CheckboxElementsSetup {
  const checkboxDefaultValue: string[] = lodashGet(formDefaultValues, paniniName);
  const checkboxInputElement: HTMLInputElement = getElement(paniniName, "checkboxInputElement", 0);
  const checkboxInteractionButton: HTMLButtonElement = getElement(paniniName, "checkboxInteractionButton", 0);
  return { checkboxDefaultValue, checkboxInputElement, checkboxInteractionButton };
}

export type CheckboxesElementsSetup = {
  checkboxDefaultValues: string[];
  checkboxInputElements: HTMLInputElement[];
  checkboxInteractionButtons: HTMLButtonElement[];
  defaultInputElements: HTMLInputElement[];
};

export function setupCheckboxesTest(paniniName: string, variants: readonly string[]): CheckboxesElementsSetup {
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

export type RadioElementSetup = {
  radioInputElements: HTMLInputElement[];
  radioInteractionButtons: HTMLButtonElement[];
  radioDefaultValue: string;
};

export function setupRadioTest(paniniName: string, variants: readonly string[]): RadioElementSetup {
  const radioInputElements: HTMLInputElement[] = getIndexedElements(variants, paniniName, "radioInputElement");
  const radioInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variants,
    paniniName,
    "radioInteractionButton"
  );
  const radioDefaultValue: string = lodashGet(formDefaultValues, paniniName);
  return { radioInputElements, radioInteractionButtons, radioDefaultValue };
}

export type TextElementSetup = {
  textInputElement: HTMLInputElement;
  textDefaultVal: string;
};

export function setupTextSectionTest(paniniName: string): TextElementSetup {
  const textInputElement: HTMLInputElement = getElement(paniniName, "textInputElement");
  const textDefaultVal: string = lodashGet(formDefaultValues, paniniName);
  return { textInputElement, textDefaultVal };
}
