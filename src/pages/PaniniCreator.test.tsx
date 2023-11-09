import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { get as lodashGet } from "lodash";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { describe, test } from "vitest";
import { cheeseVariants } from "../data/cheese";
import { dressingVariants } from "../data/dressing";
import { eggVariants } from "../data/egg";
import { meatVariants } from "../data/meat";
import { randomElementArray } from "../utils/panini-randomization-helpers";
import Layout from "./Layout";
import PaniniCreator, { SandwichDefaultVals } from "./PaniniCreator";
import { PaniniNames } from "./PaniniCreatorEnums";
import SplashScreenLayout from "./SplashScreenLayout";

describe("Test form submitting", () => {
  let renderedApp;
  beforeEach(() => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<Layout />}>
          <Route index element={<PaniniCreator navTo="/success" />} />
          <Route
            path="/success"
            element={
              <SplashScreenLayout
                shouldTransition={true}
                defaultPos={false}
                navTo="/panini_creator"
                title="Panini ordered"
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
    renderedApp = null;
  });

  describe("Being able to change default values of every element before clicking 'Place order' button", () => {
    let formDefaultValues: StrictSandwichPayload;

    beforeEach(() => {
      formDefaultValues = SandwichDefaultVals;
    });

    describe(`Single swipe element test (${PaniniNames.sandwichName} field), `, () => {
      let inputElement: HTMLInputElement;
      let defaultVal: string;
      let leftSwipeButton: HTMLButtonElement;
      let rightSwipeButton: HTMLButtonElement;

      beforeEach(() => {
        inputElement = screen.getByTestId(`${PaniniNames.bread}-swipeInputElement`);
        leftSwipeButton = screen.getByTestId(`${PaniniNames.bread}-swipeLeftButton`);
        rightSwipeButton = screen.getByTestId(`${PaniniNames.bread}-swipeRightButton`);
        defaultVal = lodashGet(formDefaultValues, PaniniNames.bread);
      });

      test(`value of ${PaniniNames.bread} is indeed default on start`, () => {
        expect(inputElement.value).toBe(defaultVal);
      });

      test(`value of ${PaniniNames.bread} is changed after user interaction`, async () => {
        try {
          userEvent.click(rightSwipeButton);
          await waitFor(() => expect(inputElement.value).not.toBe(defaultVal));
        } catch (e) {
          userEvent.click(leftSwipeButton);
          await waitFor(() => expect(inputElement.value).not.toBe(defaultVal));
        }
      });
    });

    describe(`Multi swipe section test, ${PaniniNames.dressing}`, () => {
      // najpierw usunąć elementy, potem sprawdzić wartość czy jest = [], potem dodać wszystkie (Panini max elements), zmienić wartości z każdego fieldów i sprawdzić z defaultowymi wartościami.
      let dressingSwipeElements: HTMLInputElement[];
      let leftSwipeButtons: HTMLButtonElement[];
      let rightSwipeButtons: HTMLButtonElement[];
      let formFieldDefaultValues: string[];
      beforeEach(() => {
        dressingSwipeElements = Array.from(lodashGet(formDefaultValues, PaniniNames.dressing), (val, index) => {
          return screen.getByTestId(`${PaniniNames.dressing}${index}-swipeInputElement`);
        });
        leftSwipeButtons = Array.from(lodashGet(formDefaultValues, PaniniNames.dressing), (val, index) => {
          return screen.getByTestId(`${PaniniNames.dressing}${index}-swipeLeftButton`);
        });
        rightSwipeButtons = Array.from(lodashGet(formDefaultValues, PaniniNames.dressing), (val, index) => {
          return screen.getByTestId(`${PaniniNames.dressing}${index}-swipeRightButton`);
        });
        formFieldDefaultValues = lodashGet(formDefaultValues, PaniniNames.dressing);
      });
      test.only("swipe fields values are indeed default on start", () => {
        dressingSwipeElements.forEach((swipeElement, index) => {
          expect(swipeElement.value).toBe(formFieldDefaultValues[index]);
        });
      });
      test.only("swipe fields values are changed after user interaction", () => {
        dressingSwipeElements.forEach((swipeElement, index) => {
          const otherOption = randomElementArray(dressingVariants.filter((val) => val !== swipeElement.value));
          try {
            userEvent.click(leftSwipeButtons[index]);
            waitFor(() => {
              expect(swipeElement.value).toBe(otherOption);
              expect(swipeElement.value).not.toBe(formFieldDefaultValues[index]);
            });
          } catch (e) {
            userEvent.click(rightSwipeButtons[index]);
            waitFor(() => {
              expect(swipeElement.value).toBe(otherOption);
              expect(swipeElement.value).not.toBe(formFieldDefaultValues[index]);
            });
          }
        });
      });
    });

    describe(`Select sections test (${PaniniNames.cheese}, ${PaniniNames.meat}, ${PaniniNames.egg} form fields)`, () => {
      let cheeseSelectElements: HTMLSelectElement[];
      let meatSelectElements: HTMLSelectElement[];
      let eggSelectElements: HTMLSelectElement[];
      let cheeseDefaultValues: string[];
      let meatDefaultValues: string[];
      let eggDefaultValues: string[];

      beforeEach(() => {
        cheeseSelectElements = Array.from(lodashGet(formDefaultValues, PaniniNames.cheese), (val, index) => {
          return screen.getByTestId(`${PaniniNames.cheese}${index}-selectElement`);
        });
        meatSelectElements = Array.from(lodashGet(formDefaultValues, PaniniNames.meat), (val, index) => {
          return screen.getByTestId(`${PaniniNames.meat}${index}-selectElement`);
        });
        eggSelectElements = Array.from(lodashGet(formDefaultValues, PaniniNames.egg), (val, index) => {
          return screen.getByTestId(`${PaniniNames.egg}${index}-selectElement`);
        });
        cheeseDefaultValues = lodashGet(formDefaultValues, PaniniNames.cheese);
        meatDefaultValues = lodashGet(formDefaultValues, PaniniNames.meat);
        eggDefaultValues = lodashGet(formDefaultValues, PaniniNames.egg);
      });

      test(`select fields values are indeed default on start`, () => {
        cheeseSelectElements.forEach((selectElement, index) => {
          expect(selectElement.value).toBe(cheeseDefaultValues[index]);
        });
        meatSelectElements.forEach((selectElement, index) => {
          expect(selectElement.value).toBe(meatDefaultValues[index]);
        });
        eggSelectElements.forEach((selectElement, index) => {
          expect(selectElement.value).toBe(eggDefaultValues[index]);
        });
      });

      test(`select fields values are changed after user interaction`, () => {
        cheeseSelectElements.forEach((selectElement, index) => {
          const otherOption = randomElementArray(cheeseVariants.filter((val) => val !== cheeseDefaultValues[index]));
          userEvent.selectOptions(selectElement, otherOption);
          waitFor(() => {
            expect(selectElement.value).not.toBe(cheeseDefaultValues[index]);
            expect(selectElement.value).toBe(otherOption);
          });
        });
        meatSelectElements.forEach((selectElement, index) => {
          const otherOption = randomElementArray(meatVariants.filter((val) => val !== meatDefaultValues[index]));
          userEvent.selectOptions(selectElement, otherOption);
          waitFor(() => {
            expect(selectElement.value).not.toBe(meatDefaultValues[index]);
            expect(selectElement.value).toBe(otherOption);
          });
        });
        eggSelectElements.forEach((selectElement, index) => {
          const otherOption = randomElementArray(eggVariants.filter((val) => val !== eggDefaultValues[index]));
          userEvent.selectOptions(selectElement, otherOption);
          waitFor(() => {
            expect(selectElement.value).not.toBe(eggDefaultValues[index]);
            expect(selectElement.value).toBe(otherOption);
          });
        });
      });
    });

    describe(`Text section test (${PaniniNames.sandwichName} field)`, () => {
      let inputElement: HTMLInputElement;
      let defaultVal: string;

      beforeEach(() => {
        inputElement = screen.getByTestId(`${PaniniNames.sandwichName}-textInputElement`);
        defaultVal = formDefaultValues[PaniniNames.sandwichName];
      });

      test(`value of ${PaniniNames.sandwichName} is indeed default on start`, () => {
        expect(inputElement.value).toBe(defaultVal);
      });

      test(`value of ${PaniniNames.sandwichName} is changed after user interaction`, () => {
        userEvent.type(inputElement, "Not default name");
        waitFor(() => {
          expect(inputElement.value).not.toBe(defaultVal);
          expect(inputElement.value).toBe("Not default name");
        });
      });
    });
  });
});
