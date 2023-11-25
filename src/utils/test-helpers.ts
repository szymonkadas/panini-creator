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
  const searchResult: T[] = [];
  for (let i = 0; i < sourceArray.length; i++) {
    let element: T;
    try {
      element = getElement(paniniPath, elementName, i);
    } catch (e) {
      // if such element is not found then stop searching for more and return already gathered elements;
      break;
    }
    searchResult.push(element);
  }
  return searchResult;
}

// testing helper functions:
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
