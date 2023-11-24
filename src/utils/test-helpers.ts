import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { get as lodashGet } from "lodash";
import { SandwichDefaultVals } from "../pages/PaniniCreator";
import { randomElementArray } from "./panini-randomization-helpers";

// fetching helper functions:
export function getElement<T>(paniniPath: string, elementName: string, index?: number) {
  return screen.getByTestId(`${paniniPath}${index !== undefined ? index : ""}-${elementName}`) as T;
}
export function getElements<T>(paniniPath: string, elementName: string) {
  return screen.getAllByTestId(`${paniniPath}-${elementName}`) as T;
}
export function getIndexedElements<T>(sourceArray: readonly string[], paniniPath: string, elementName: string) {
  return Array.from(sourceArray, (val, index) => {
    return getElement(paniniPath, elementName, index);
  }) as T;
}
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
  const defaultSpreadsInputElements = checkboxInputElements.filter((inputElement) => {
    checkboxDefaultValues.includes(inputElement.getAttribute("data-testoption") || "");
  });
  return { checkboxDefaultValues, checkboxInputElements, checkboxInteractionButtons, defaultSpreadsInputElements };
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
// test helper functions:
export function areListedValuesEqualOrChanged(
  listOne: HTMLInputElement[] | HTMLButtonElement[] | HTMLSelectElement[],
  listTwo: string[],
  checkForEquality: boolean
) {
  listOne.forEach((element, index) => {
    checkForEquality ? expect(element.value).toBe(listTwo[index]) : expect(element.value).not.toBe(listTwo[index]);
  });
}

export function isValEqualOrChangedToListedValues(
  value: string,
  list: HTMLInputElement[] | HTMLButtonElement[] | HTMLSelectElement[],
  checkForEquality: boolean
) {
  list.forEach((listItem) =>
    checkForEquality ? expect(listItem.value).toBe(value) : expect(listItem.value).not.toBe(value)
  );
}

// interaction functions:
export async function swipeElementsInteraction(
  leftSwipeButtons: HTMLButtonElement[],
  variants: readonly string[],
  swipeElementsDefaultValues: readonly string[]
) {
  return await Promise.all(
    leftSwipeButtons.map(async (leftSwipeButton, index) => {
      const defaultValIndex = variants.findIndex((val) => val === swipeElementsDefaultValues[index]);
      await userEvent.click(leftSwipeButton);
      const newIndex = defaultValIndex === 0 ? variants.length - 1 : defaultValIndex - 1;
      return variants[newIndex];
    })
  );
}

export async function selectFieldInteraction(
  selectElements: HTMLSelectElement[],
  data: readonly string[],
  defaultValues: string[]
) {
  for (const [index, selectElement] of selectElements.entries()) {
    const otherOption = randomElementArray(data.filter((val) => val !== defaultValues[index]));
    await userEvent.selectOptions(selectElement, otherOption);
  }
}

export async function checkboxButtonsInteraction(
  checkboxButtons: HTMLButtonElement[] | HTMLInputElement[],
  data: readonly string[],
  defaultValues: string[]
) {
  // simulating many interactions:
  let elementsCountToBeClicked = Math.floor(Math.random() * data.length * 2);
  let expectedValues: string[] = [...defaultValues];
  while (elementsCountToBeClicked > 0) {
    const otherOption = randomElementArray(data);
    const indexOfButtonToBeClicked = checkboxButtons.findIndex((button) => {
      return button.value.toLowerCase() === otherOption.toLowerCase();
    });
    await userEvent.click(checkboxButtons[indexOfButtonToBeClicked]);
    if (expectedValues.includes(otherOption)) {
      expectedValues = expectedValues.filter((val) => val !== otherOption);
    } else {
      expectedValues.push(otherOption);
    }
    elementsCountToBeClicked--;
  }
  return expectedValues;
}

export async function radioInteraction(interactionButtons: HTMLButtonElement[], defaultVal: string) {
  let index = 0;
  while (index < interactionButtons.length) {
    const currentOption = interactionButtons[index].getAttribute("data-testoption");
    if (currentOption !== defaultVal) {
      break;
    }
    index++;
  }
  await userEvent.click(interactionButtons[index]);
  return index;
}
