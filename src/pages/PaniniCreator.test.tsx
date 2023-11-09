import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { get as lodashGet } from "lodash";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { describe, test } from "vitest";
import { cheeseVariants } from "../data/cheese";
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

    describe(`${PaniniNames.bread} test`, () => {
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

    describe(`${PaniniNames.cheese} test`, () => {
      let selectElements: HTMLSelectElement[];
      let formFieldDefaultValues: string[];

      beforeEach(() => {
        selectElements = Array.from(lodashGet(formDefaultValues, PaniniNames.cheese), (val, index) => {
          return screen.getByTestId(`${PaniniNames.cheese}${index}-selectElement`);
        });
        formFieldDefaultValues = lodashGet(formDefaultValues, PaniniNames.cheese);
      });

      test(`value of ${PaniniNames.cheese} is indeed default on start`, () => {
        selectElements.forEach((selectElement, index) => {
          expect(selectElement.value).toBe(formFieldDefaultValues[index]);
        });
      });

      test(`value of ${PaniniNames.cheese} is changed after user interaction`, () => {
        selectElements.forEach((selectElement, index) => {
          const otherOption = randomElementArray(cheeseVariants.filter((val) => val !== formFieldDefaultValues[index]));
          userEvent.selectOptions(selectElement, otherOption);
          waitFor(() => {
            expect(selectElement.value).not.toBe(formFieldDefaultValues[index]);
            expect(selectElement.value).toBe(otherOption);
          });
        });
      });
    });

    describe(`${PaniniNames.sandwichName} test`, () => {
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
