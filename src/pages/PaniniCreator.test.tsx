import { fireEvent, render, screen } from "@testing-library/react";
import { get as lodashGet } from "lodash";
import { describe } from "vitest";
// import App from "../App";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { breadVariants } from "../data/bread";
import { randomElementArray } from "../utils/panini-randomization-helpers";
import Layout from "./Layout";
import PaniniCreator, { SandwichDefaultVals } from "./PaniniCreator";
import { PaniniNames } from "./PaniniCreatorEnums";
import SplashScreenLayout from "./SplashScreenLayout";
describe("Test form submitting", () => {
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
  render(<RouterProvider router={router} />);

  describe("Being able to change default values of every element before clicking 'Place order' button", () => {
    const defaultValues = SandwichDefaultVals;
    describe(`${PaniniNames.bread} test`, () => {
      const inputElement = screen.getByTestId(`${PaniniNames.bread}-swipeInput`) as HTMLInputElement;
      const defaultVal = lodashGet(defaultValues, PaniniNames.bread);
      test.concurrent(`value of ${PaniniNames.bread} is indeed default on start`, async () => {
        expect(inputElement.value).toBe(defaultVal);
      });
      test.concurrent(`value of ${PaniniNames.bread} is changed after user interaction`, () => {
        // get other value from possible options
        const otherOption = randomElementArray(breadVariants.filter((val) => val !== defaultVal));
        fireEvent.change(inputElement, { target: { value: otherOption } });
        expect(inputElement.value).not.toBe(defaultVal);
        expect(inputElement.value).toBe(otherOption);
      });
    });

    describe(`${PaniniNames.sandwichName} test`, () => {
      const inputElement = screen.getByTestId(`${PaniniNames.sandwichName}-textInput`) as HTMLInputElement;
      const defaultVal = lodashGet(defaultValues, PaniniNames.sandwichName);
      test.concurrent(`value of ${PaniniNames.sandwichName} is indeed default on start`, async () => {
        expect(inputElement.value).toBe(defaultVal);
      });
      test.concurrent(`value of ${PaniniNames.sandwichName} is changed after user interaction`, () => {
        fireEvent.change(inputElement, { target: { value: "Not default name" } });
        expect(inputElement.value).not.toBe(defaultVal);
        expect(inputElement.value).toBe("Not default name");
      });
    });
  });
  // Add more test cases as needed
});
