import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
import {
  testCheckboxButtonElements,
  testCheckboxElement,
  testCheckboxElements,
  testMultiSwipeElements,
  testRadioElements,
  testSelectElements,
  testSwipeElement,
  testTextSection,
} from "../utils/test-functions";
import {
  areListedValuesEqualOrChanged,
  checkboxButtonsInteraction,
  isValEqualOrChangedToListedValues,
  radioInteraction,
  selectFieldInteraction,
  swipeElementsInteraction,
} from "../utils/test-helpers";
import {
  setupCheckboxButtonsTest,
  setupCheckboxTest,
  setupCheckboxesTest,
  setupMultiSwipeElementTest,
  setupRadioTest,
  setupSelectTest,
  setupSwipeElementTest,
  setupTextSectionTest,
} from "../utils/test-setup-functions";
import Layout from "./Layout";
import PaniniCreator from "./PaniniCreator";
import { PaniniNames } from "./PaniniCreatorEnums";
import SplashScreenLayout from "./SplashScreenLayout";

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

  test("It should reset all form configuration values when START AGAIN button is clicked", async () => {
    // change values:
    // swipe section (bread)
    const breadSetup = setupSwipeElementTest(PaniniNames.bread);
    await userEvent.click(breadSetup.leftSwipeButton);
    // multi swipe section (dressing)
    const dressingSetup = setupMultiSwipeElementTest(PaniniNames.dressing);
    await swipeElementsInteraction(
      dressingSetup.leftSwipeButtons,
      dressingVariants,
      dressingSetup.swipeElementsDefaultValues
    );
    // select section (cheese, meat, egg)
    const cheeseSetup = setupSelectTest(PaniniNames.cheese);
    await selectFieldInteraction(cheeseSetup.selectElements, cheeseVariants, cheeseSetup.selectDefaultValues);
    const meatSetup = setupSelectTest(PaniniNames.meat);
    await selectFieldInteraction(meatSetup.selectElements, meatVariants, meatSetup.selectDefaultValues);
    const eggSetup = setupSelectTest(PaniniNames.egg);
    await selectFieldInteraction(eggSetup.selectElements, eggVariants, eggSetup.selectDefaultValues);
    // checkboxButton section (vegetables)
    const vegetableSetup = setupCheckboxButtonsTest(PaniniNames.vegetables, vegetableVariant);
    await checkboxButtonsInteraction(
      vegetableSetup.checkboxButtonInteractionButtons,
      vegetableVariant,
      vegetableSetup.checkboxButtonsDefaultValues
    );
    // Checkbox section (spreads, topping, cutlery, napkins)
    const spreadsSetup = setupCheckboxesTest(PaniniNames.spreads, spreadVariant);
    await checkboxButtonsInteraction(
      spreadsSetup.checkboxInteractionButtons,
      spreadVariant,
      spreadsSetup.checkboxDefaultValues
    );
    const toppingSetup = setupCheckboxTest(PaniniNames.topping);
    await userEvent.click(toppingSetup.checkboxInteractionButton);
    const cutlerySetup = setupCheckboxTest(PaniniNames.cutlery);
    await userEvent.click(cutlerySetup.checkboxInteractionButton);
    const napkinsSetup = setupCheckboxTest(PaniniNames.napkins);
    await userEvent.click(napkinsSetup.checkboxInteractionButton);
    // Radio section (serving) field
    const servingSetup = setupRadioTest(PaniniNames.serving, servingVariant);
    await radioInteraction(servingSetup.radioInteractionButtons, servingSetup.radioDefaultValue);
    // Text section (sandwichName field)
    const sandwichNameSetup = setupTextSectionTest(PaniniNames.sandwichName);
    const notDefaultVal = "Not default name";
    await userEvent.type(sandwichNameSetup.textInputElement, notDefaultVal);
    // reset values:
    const resetButton = screen.getByTestId("resetButton");
    await userEvent.click(resetButton);
    // check if values are default:
    expect(breadSetup.swipeInputElement.value).toBe(breadSetup.swipeDefaultVal);
    areListedValuesEqualOrChanged(dressingSetup.swipeInputElements, dressingSetup.swipeElementsDefaultValues, true);
    areListedValuesEqualOrChanged(cheeseSetup.selectElements, cheeseSetup.selectDefaultValues, true);
    areListedValuesEqualOrChanged(meatSetup.selectElements, meatSetup.selectDefaultValues, true);
    areListedValuesEqualOrChanged(eggSetup.selectElements, eggSetup.selectDefaultValues, true);
    isValEqualOrChangedToListedValues(
      vegetableSetup.checkboxButtonsDefaultValues.join(","),
      vegetableSetup.checkboxButtonInputElements,
      true
    );
    areListedValuesEqualOrChanged(spreadsSetup.defaultInputElements, spreadsSetup.checkboxDefaultValues, true);
    expect(!!toppingSetup.checkboxInputElement.value).toBe(!!toppingSetup.checkboxDefaultValue);
    expect(cutlerySetup.checkboxInputElement.value).toBe(`${cutlerySetup.checkboxDefaultValue}`);
    expect(napkinsSetup.checkboxInputElement.value).toBe(`${napkinsSetup.checkboxDefaultValue}`);
    isValEqualOrChangedToListedValues(servingSetup.radioDefaultValue, servingSetup.radioInputElements, true);
    expect(sandwichNameSetup.textInputElement.value).toBe(sandwichNameSetup.textDefaultVal);
  });

  describe("Finalize order test suite: ", async () => {
    let randomizeButton: HTMLButtonElement;
    let placeOrderButton: HTMLButtonElement;
    beforeEach(async () => {
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
    test("It redirects to Success screen when Place order button is clicked", () => {
      expect(window.location.pathname).toBe(successPath);
    });
  });
});
