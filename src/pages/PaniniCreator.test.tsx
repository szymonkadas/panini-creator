import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { get as lodashGet } from "lodash";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import vitestFetchMock from "vitest-fetch-mock";
import { cheeseVariants } from "../data/cheese";
import { dressingVariants } from "../data/dressing";
import { eggVariants } from "../data/egg";
import { meatVariants } from "../data/meat";
import { servingVariant } from "../data/serving";
import { spreadVariant } from "../data/spread";
import { vegetableVariant } from "../data/vegetable";
import { randomElementArray } from "../utils/panini-randomization-helpers";
import Layout from "./Layout";
import PaniniCreator, { SandwichDefaultVals } from "./PaniniCreator";
import { PaniniNames } from "./PaniniCreatorEnums";
import SplashScreenLayout from "./SplashScreenLayout";

const formDefaultValues: StrictSandwichPayload = SandwichDefaultVals;

describe("Test form submitting", async () => {
  const mockedImageUrl =
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-SH1xtUjMVrHGqv2FjNQFVumv/user-ZM94ZPHYec9iAazGn7QUF9sX/img-mge9FHmtERBAlXiB8Wj4LJz9.png?st=2023-11-12T09%3A33%3A17Z&se=2023-11-12T11%3A33%3A17Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-12T06%3A01%3A54Z&ske=2023-11-13T06%3A01%3A54Z&sks=b&skv=2021-08-06&sig=CKBv3Pef5nc4wfwCUUgim3boRdJ1bYkbE05SY8iJZIM%3D";
  const successPath = "/success";
  const successTitle = "Panini ordered";
  let renderedApp;
  beforeEach(() => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<PaniniCreator navTo={successPath} />} />
          <Route
            path={successPath}
            element={
              <SplashScreenLayout
                shouldTransition={true}
                defaultPos={false}
                navTo="/panini_creator"
                title={successTitle}
                actionDesc="start again"
              ></SplashScreenLayout>
            }
          />
        </Route>
      )
    );
    renderedApp = <RouterProvider router={router} />;
    render(renderedApp);
  });

  afterEach(() => {
    // Clean up router after each test
    cleanup();
    vi.clearAllMocks();
  });

  test("Being able to change default values of every element before clicking 'Place order' button", async () => {
    //single swipe sandwichName field
    await testSwipeElement(PaniniNames.bread);
    // Multi swipe section (dressing)
    await testMultiSwipeElements(PaniniNames.dressing, dressingVariants);
    // select sections (cheese, meat, egg form fields):
    await testSelectElements(PaniniNames.cheese, cheeseVariants);
    await testSelectElements(PaniniNames.meat, meatVariants);
    await testSelectElements(PaniniNames.egg, eggVariants);

    // CheckboxButton section (vegetables)
    await testCheckboxButtonElements(PaniniNames.vegetables, vegetableVariant);

    // Checkbox section (spreads, topping, cutlery, napkins)
    await testCheckboxElements(PaniniNames.spreads, spreadVariant);
    await testCheckboxElement(PaniniNames.topping, true);
    await testCheckboxElement(PaniniNames.cutlery, false);
    await testCheckboxElement(PaniniNames.napkins, false);

    // Radio section (serving) field
    await testRadioElements(PaniniNames.serving, servingVariant);

    // Text section (sandwichName field)
    await testTextSection(PaniniNames.sandwichName);
  });

  describe("Finalize order test suite: ", async () => {
    let randomizeButton: HTMLButtonElement;
    let placeOrderButton: HTMLButtonElement;
    beforeEach(() => {
      const fetchMock = vitestFetchMock(vi);
      fetchMock.enableMocks();
      fetchMock.mockResponse(JSON.stringify({ imageUrl: mockedImageUrl }));
      placeOrderButton = screen.getByTestId("PlaceOrderButton");
      // so the values are changed properly and validation will succeed for the next steps to occur.
      randomizeButton = screen.getByTestId("PaniniRandomizeButton");
      fireEvent.click(randomizeButton);
      fireEvent.click(placeOrderButton);
    });
    afterEach(() => {
      fetchMock.mockClear();
    });
    test("It returns imageUrl mock of form payload when 'Place order' button is clicked and form validation passes.", async () => {
      await waitFor(() => {
        const response = fetchMock.mock.results[0];
        expect(response.value.status).toBe(200);
        expect(JSON.parse(response.value.body.toString())).toEqual({ imageUrl: `${mockedImageUrl}` });
      });
    });
    test("It redirects to Success screen when Place order button is clicked", async () => {
      await waitFor(() => {
        expect(window.location.pathname).toBe(successPath);
      });
    });
  });
});
// fetching helper functions:
function getElement<T>(paniniPath: string, elementName: string, index?: number) {
  return screen.getByTestId(`${paniniPath}${index !== undefined ? index : ""}-${elementName}`) as T;
}
function getElements<T>(paniniPath: string, elementName: string) {
  return screen.getAllByTestId(`${paniniPath}-${elementName}`) as T;
}
function getIndexedElements<T>(sourceArray: readonly string[], paniniPath: string, elementName: string) {
  return Array.from(sourceArray, (val, index) => {
    return getElement(paniniPath, elementName, index);
  }) as T;
}

// interaction functions:
async function SelectFieldInteraction(
  selectElements: HTMLSelectElement[],
  data: readonly string[],
  defaultValues: string[]
) {
  for (const [index, selectElement] of selectElements.entries()) {
    const otherOption = randomElementArray(data.filter((val) => val !== defaultValues[index]));
    await userEvent.selectOptions(selectElement, otherOption);
  }
}

async function checkboxButtonsInteraction(
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

async function radioInteraction(interactionButtons: HTMLButtonElement[], defaultVal: string) {
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

// form field tests functions:
async function testSwipeElement(paniniName: string) {
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

async function testMultiSwipeElements(paniniName: string, variants: readonly string[]) {
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

async function testSelectElements(paniniName: string, variants: readonly string[]) {
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

async function testCheckboxButtonElements(paniniName: string, variants: readonly string[]) {
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

async function testCheckboxElement(paniniName: string, nullish: boolean) {
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

async function testCheckboxElements(paniniName: string, variants: readonly string[]) {
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

async function testRadioElements(paniniName: string, variant: readonly string[]) {
  const radioInputElements: HTMLInputElement[] = getIndexedElements(variant, paniniName, "radioInputElement");
  const radioInteractionButtons: HTMLButtonElement[] = getIndexedElements(
    variant,
    paniniName,
    "radioInteractionButton"
  );
  const radioDefaultValue: string = lodashGet(formDefaultValues, PaniniNames.serving);

  // value of radio section form field is indeed default on start
  radioInputElements.forEach((inputElement) => {
    expect(inputElement.value).toBe(radioDefaultValue);
  });

  // value of radio section form field is changed after user interaction
  await radioInteraction(radioInteractionButtons, radioDefaultValue);
  radioInputElements.forEach((input) => expect(input.value).not.toBe(radioDefaultValue));

  return { radioInputElements, radioDefaultValue, radioInteractionButtons };
}

async function testTextSection(paniniName: string) {
  const textInputElement: HTMLInputElement = getElement(paniniName, "textInputElement");
  const textDefaultVal: string = lodashGet(formDefaultValues, paniniName);

  // value of text section form field is indeed default on start
  expect(textInputElement.value).toBe(textDefaultVal);

  // value of text section form field is changed after user interaction
  const notDefaultVal = "Not default name";
  await userEvent.type(textInputElement, notDefaultVal);
  expect(textInputElement.value).toBe(notDefaultVal);
}
