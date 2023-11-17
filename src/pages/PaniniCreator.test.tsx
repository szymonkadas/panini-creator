import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
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

describe("Test form submitting", () => {
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

  test("Being able to change default values of every element before clicking 'Place order' button", () => {
    const formDefaultValues: StrictSandwichPayload = SandwichDefaultVals;

    //single swipe sandwichName field
    const breadInputElement: HTMLInputElement = getElement(PaniniNames.bread, "swipeInputElement");
    const breadDefaultVal: string = lodashGet(formDefaultValues, PaniniNames.bread);
    const breadLeftSwipeButton: HTMLButtonElement = getElement(PaniniNames.bread, "swipeLeftButton");

    // value of bread is indeed default on start
    expect(breadInputElement.value).toBe(breadDefaultVal);

    // value of bread is changed after user interaction
    fireEvent.click(breadLeftSwipeButton);
    expect(breadInputElement.value).not.toBe(breadDefaultVal);

    // Multi swipe section (dressing)
    const dressingDefaultValues = lodashGet(formDefaultValues, PaniniNames.dressing);
    // remove elements values so the form field value would be blank, then add every panini max element, change their values and compare them with their default values.
    const dressingSwipeElements: HTMLInputElement[] = getIndexedElements(
      dressingDefaultValues,
      PaniniNames.dressing,
      "swipeInputElement"
    );
    const dressingLeftSwipeButtons: HTMLButtonElement[] = getIndexedElements(
      dressingDefaultValues,
      PaniniNames.dressing,
      "swipeLeftButton"
    );
    // dressing swipe fields values are indeed default on start
    dressingSwipeElements.forEach((swipeElement, index) => {
      expect(swipeElement.value).toBe(dressingDefaultValues[index]);
    });
    // dressing swipe fields values are changed after user interaction"
    dressingSwipeElements.forEach((inputElement, index) => {
      const defaultValIndex = dressingVariants.findIndex((val) => val === dressingDefaultValues[index]);
      fireEvent.click(dressingLeftSwipeButtons[index]);
      expect(inputElement.value).not.toBe(dressingVariants[defaultValIndex]);
    });

    // select sections (cheese, meat, egg form fields):
    const cheeseDefaultValues: string[] = lodashGet(formDefaultValues, PaniniNames.cheese);
    const meatDefaultValues: string[] = lodashGet(formDefaultValues, PaniniNames.meat);
    const eggDefaultValues: string[] = lodashGet(formDefaultValues, PaniniNames.egg);
    const cheeseSelectElements: HTMLSelectElement[] = getIndexedElements(
      cheeseDefaultValues,
      PaniniNames.cheese,
      "selectElement"
    );
    const meatSelectElements: HTMLSelectElement[] = getIndexedElements(
      meatDefaultValues,
      PaniniNames.meat,
      "selectElement"
    );
    const eggSelectElements: HTMLSelectElement[] = getIndexedElements(
      eggDefaultValues,
      PaniniNames.egg,
      "selectElement"
    );

    // select fields values are indeed default on start
    cheeseSelectElements.forEach((selectElement, index) => {
      expect(selectElement.value).toBe(cheeseDefaultValues[index]);
    });

    meatSelectElements.forEach((selectElement, index) => {
      expect(selectElement.value).toBe(meatDefaultValues[index]);
    });

    eggSelectElements.forEach((selectElement, index) => {
      expect(selectElement.value).toBe(eggDefaultValues[index]);
    });

    // select fields values are changed after user interaction
    SelectFieldInteraction(cheeseSelectElements, cheeseVariants, cheeseDefaultValues);
    SelectFieldInteraction(meatSelectElements, meatVariants, meatDefaultValues);
    SelectFieldInteraction(eggSelectElements, eggVariants, eggDefaultValues);

    // checking if values are changed.
    cheeseSelectElements.forEach((selectElement, index) => {
      expect(selectElement.value).not.toBe(cheeseDefaultValues[index]);
    });

    meatSelectElements.forEach((selectElement, index) => {
      expect(selectElement.value).not.toBe(meatDefaultValues[index]);
    });

    eggSelectElements.forEach((selectElement, index) => {
      expect(selectElement.value).not.toBe(eggDefaultValues[index]);
    });

    // CheckboxButton section (vegetables)
    const vegetablesDefaultValues: string[] = lodashGet(formDefaultValues, PaniniNames.vegetables);
    // 9 inputs pointing out to the same form field.
    const vegetablesCheckboxButtonInputElements: HTMLInputElement[] = getElements(
      PaniniNames.vegetables,
      "checkboxButtonInputElement"
    );
    const vegetablesCheckboxButtons: HTMLButtonElement[] = getIndexedElements(
      vegetableVariant,
      PaniniNames.vegetables,
      "checkboxButtonInteractionButton"
    );

    //checkbox button fields values are indeed default on start"
    vegetablesCheckboxButtonInputElements.forEach((checkboxButtonInputElement) => {
      const inputFieldValues = checkboxButtonInputElement.value.split(",");
      vegetablesDefaultValues.forEach((defaultVal, index) => {
        expect(defaultVal).toBe(inputFieldValues[index]);
      });
    });

    // checkbox button values are changed after user interaction
    // simulating many interactions
    const vegetablesExpectedValues = checkboxButtonsInteraction(
      vegetablesCheckboxButtons,
      vegetableVariant,
      vegetablesDefaultValues
    );
    vegetablesCheckboxButtonInputElements.forEach((checkboxButtonInputElement) => {
      expect(checkboxButtonInputElement.value).toBe(`${vegetablesExpectedValues}`);
    });

    // Checkbox section (spreads, topping, cutlery, napkins)
    const napkinsDefaultValue: boolean = lodashGet(formDefaultValues, PaniniNames.napkins);
    const cutleryDefaultValue: boolean = lodashGet(formDefaultValues, PaniniNames.cutlery);
    const toppingDefaultValue: null | string = lodashGet(formDefaultValues, PaniniNames.topping);
    const spreadsDefaultValues: string[] = lodashGet(formDefaultValues, PaniniNames.spreads);
    const checkboxInputName = "checkboxInputElement";
    const napkinsCheckboxInputElement: HTMLInputElement = getElement(PaniniNames.napkins, checkboxInputName, 0);
    const cutleryCheckboxInputElement: HTMLInputElement = getElement(PaniniNames.cutlery, checkboxInputName, 0);
    const toppingCheckboxInputElement: HTMLInputElement = getElement(PaniniNames.topping, checkboxInputName, 0);
    const spreadsCheckboxInputElements: HTMLInputElement[] = getIndexedElements(
      spreadVariant,
      PaniniNames.spreads,
      checkboxInputName
    );
    const checkboxButtonName = "checkboxInteractionButton";
    const napkinsCheckboxInteractionButton: HTMLButtonElement = getElement(PaniniNames.napkins, checkboxButtonName, 0);
    const cutleryCheckboxInteractionButton: HTMLButtonElement = getElement(PaniniNames.cutlery, checkboxButtonName, 0);
    const toppingCheckboxInteractionButton: HTMLButtonElement = getElement(PaniniNames.topping, checkboxButtonName, 0);
    const spreadsCheckboxInteractionButtons: HTMLButtonElement[] = getIndexedElements(
      spreadVariant,
      PaniniNames.spreads,
      checkboxButtonName
    );

    // checkbox values are indeed default on start
    // input.value returns string, hence i put the boolean into the string
    expect(napkinsCheckboxInputElement.value).toBe(`${napkinsDefaultValue}`);
    expect(`${cutleryCheckboxInputElement.value}`).toBe(`${cutleryDefaultValue}`);
    // inputs don't accept null as a value hence null is converted to "" which is falsy as null is.
    expect(!!toppingCheckboxInputElement.value).toBe(!!toppingDefaultValue);
    const defaultSpreadsInputElements = spreadsCheckboxInputElements.filter((inputElement) => {
      spreadsDefaultValues.includes(inputElement.getAttribute("data-testoption") || "");
    });
    defaultSpreadsInputElements.forEach((checkboxInputElement, index) => {
      expect(checkboxInputElement.value).toBe(spreadsDefaultValues[index]);
    });

    // checkbox values are changed after user interaction
    // these 3 have 2 options so it's enough to click once.
    fireEvent.click(napkinsCheckboxInteractionButton);
    fireEvent.click(cutleryCheckboxInteractionButton);
    fireEvent.click(toppingCheckboxInteractionButton);

    expect(napkinsCheckboxInputElement.value).not.toBe(`${napkinsDefaultValue}`);
    expect(cutleryCheckboxInputElement.value).not.toBe(`${cutleryDefaultValue}`);
    expect(toppingCheckboxInputElement.value).not.toBe(toppingDefaultValue);
    // nie działa bo value to array! testoption?
    const spreadExpectedValues = checkboxButtonsInteraction(
      spreadsCheckboxInteractionButtons,
      spreadVariant,
      spreadsDefaultValues
    );
    spreadsCheckboxInputElements.forEach((spreadsCheckboxInputElement) => {
      expect(`${spreadExpectedValues}`).toBe(spreadsCheckboxInputElement.value);
    });

    // Radio section (serving) field
    const servingRadioInputElements: HTMLInputElement[] = getIndexedElements(
      servingVariant,
      PaniniNames.serving,
      "radioInputElement"
    );
    const servingRadioInteractionButtons: HTMLButtonElement[] = getIndexedElements(
      servingVariant,
      PaniniNames.serving,
      "radioInteractionButton"
    );
    const servingDefaultVal: string = lodashGet(formDefaultValues, PaniniNames.serving);

    // value of radio section form field is indeed default on start
    servingRadioInputElements.forEach((inputElement, index) => {
      expect(inputElement.value).toBe(servingDefaultVal);
    });

    // value of radio section form field is changed after user interaction
    radioInteraction(servingRadioInteractionButtons, servingDefaultVal);
    servingRadioInputElements.forEach((input) => expect(input.value).not.toBe(servingDefaultVal));

    // Text section (sandwichName field)
    const inputElement: HTMLInputElement = getElement(PaniniNames.sandwichName, "textInputElement");
    const defaultVal: string = lodashGet(formDefaultValues, PaniniNames.sandwichName);

    // value of text section form field is indeed default on start
    expect(inputElement.value).toBe(defaultVal);

    // value of text section form field is changed after user interaction
    fireEvent.change(inputElement, { target: { value: "Not default name" } });
    expect(inputElement.value).not.toBe(defaultVal);
  });

  describe("Finalize order test suite: ", () => {
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

// sprawdź później czy expect ma rację bytu na blokach w funkcji
function SelectFieldInteraction(selectElements: HTMLSelectElement[], data: readonly string[], defaultValues: string[]) {
  selectElements.forEach((selectElement, index) => {
    const otherOption = randomElementArray(data.filter((val) => val !== defaultValues[index]));
    fireEvent.change(selectElement, { target: { value: otherOption } });
    return otherOption;
  });
}

function checkboxButtonsInteraction(
  checkboxButtons: HTMLButtonElement[] | HTMLInputElement[],
  data: readonly string[],
  defaultValues: string[]
) {
  // simulating many interactions:
  let elementsCountToBeClicked = Math.floor(Math.random() * data.length * 2);
  let expectedValues: string[] = [...defaultValues];
  console.log(checkboxButtons);
  while (elementsCountToBeClicked > 0) {
    const otherOption = randomElementArray(data);
    const indexOfButtonToBeClicked = checkboxButtons.findIndex((button) => {
      return button.value.toLowerCase() === otherOption.toLowerCase();
    });
    fireEvent.click(checkboxButtons[indexOfButtonToBeClicked]);
    if (expectedValues.includes(otherOption)) {
      expectedValues = expectedValues.filter((val) => val !== otherOption);
    } else {
      expectedValues.push(otherOption);
    }
    elementsCountToBeClicked--;
  }
  return expectedValues;
}

function radioInteraction(interactionButtons: HTMLButtonElement[], defaultVal: string) {
  let index = 0;
  while (index < interactionButtons.length) {
    const currentOption = interactionButtons[index].getAttribute("data-testoption");
    if (currentOption !== defaultVal) {
      break;
    }
    index++;
  }
  fireEvent.click(interactionButtons[index]);
  return index;
}

// POTEM ROZDZIEL FUNKCJE NA 2 CZĘŚCI, INTERAKCJA I SPRAWDZANIE. Interakcji użyjemy przy resecie.
// sprawdzanie zrobić z przechwyceniem payloadu, i porównaniem każdego z pól czy się różni od oryginału.
// posortować, najpierw wziąć elementy z ekranu, potem sprawdzić czy są defaultowe, potem interakcja potem payload.
// można to potem wszystko wsadzić do funkcji której się użyje przy resecie?

// Usuń describe byd ziałał userEvent.
// Jak zmockować payload?
