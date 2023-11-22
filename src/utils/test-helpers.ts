import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

// interaction functions:

export async function SelectFieldInteraction(
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
