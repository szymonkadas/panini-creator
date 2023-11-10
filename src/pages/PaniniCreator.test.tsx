import { fireEvent, render, screen } from "@testing-library/react";
import { get as lodashGet } from "lodash";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { beforeEach, describe, test } from "vitest";
import { breadVariants } from "../data/bread";
import { cheeseVariants } from "../data/cheese";
import { dressingVariants } from "../data/dressing";
import { eggVariants } from "../data/egg";
import { meatVariants } from "../data/meat";
import { servingVariant } from "../data/serving";
import { spreadVariant } from "../data/spread";
import { toppingVariant } from "../data/topping";
import { vegetableVariant } from "../data/vegetable";
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
        const defaultValIndex = breadVariants.findIndex((val) => val === defaultVal);
        // swipe left and back or swipe right and back.
        if (defaultValIndex > 0) {
          fireEvent.click(leftSwipeButton);
          expect(inputElement.value).not.toBe(defaultVal);
          expect(inputElement.value).toBe(breadVariants[defaultValIndex - 1]);
          fireEvent.click(rightSwipeButton);
          expect(inputElement.value).toBe(defaultVal);
        } else if (defaultValIndex < breadVariants.length - 1) {
          fireEvent.click(leftSwipeButton);
          expect(inputElement.value).not.toBe(defaultVal);
          expect(inputElement.value).toBe(breadVariants[defaultValIndex + 1]);
          fireEvent.click(leftSwipeButton);
          expect(inputElement.value).toBe(defaultVal);
        }
      });
    });

    describe(`Multi swipe section test, ${PaniniNames.dressing}`, () => {
      // remove elements values so the form field value would be blank, then add every panini max element, change their values and compare them with their default values.
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
      test("swipe fields values are indeed default on start", () => {
        dressingSwipeElements.forEach((swipeElement, index) => {
          expect(swipeElement.value).toBe(formFieldDefaultValues[index]);
        });
      });
      test("swipe fields values are changed after user interaction", () => {
        dressingSwipeElements.forEach((inputElement, index) => {
          const defaultValIndex = dressingVariants.findIndex((val) => val === formFieldDefaultValues[index]);
          if (defaultValIndex > 0) {
            fireEvent.click(leftSwipeButtons[index]);
            expect(inputElement.value).not.toBe(formFieldDefaultValues[index]);
            expect(inputElement.value).toBe(dressingVariants[defaultValIndex - 1]);
            fireEvent.click(rightSwipeButtons[index]);
            expect(inputElement.value).toBe(formFieldDefaultValues[index]);
          } else if (defaultValIndex < dressingVariants.length - 1) {
            fireEvent.click(rightSwipeButtons[index]);
            expect(inputElement.value).not.toBe(formFieldDefaultValues[index]);
            expect(inputElement.value).toBe(dressingVariants[defaultValIndex + 1]);
            fireEvent.click(leftSwipeButtons[index]);
            expect(inputElement.value).toBe(formFieldDefaultValues[index]);
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
      test(`select fields values are changed after user interaction`, async () => {
        cheeseSelectElements.forEach((selectElement, index) => {
          const otherOption = randomElementArray(cheeseVariants.filter((val) => val !== cheeseDefaultValues[index]));
          fireEvent.change(selectElement, { target: { value: otherOption } });
          expect(selectElement.value).not.toBe(cheeseDefaultValues[index]);
          expect(selectElement.value).toBe(otherOption);
        });

        meatSelectElements.forEach((selectElement, index) => {
          const otherOption = randomElementArray(meatVariants.filter((val) => val !== meatDefaultValues[index]));
          fireEvent.change(selectElement, { target: { value: otherOption } });
          expect(selectElement.value).not.toBe(meatDefaultValues[index]);
          expect(selectElement.value).toBe(otherOption);
        });

        eggSelectElements.forEach((selectElement, index) => {
          const otherOption = randomElementArray(eggVariants.filter((val) => val !== eggDefaultValues[index]));
          fireEvent.change(selectElement, { target: { value: otherOption } });
          expect(selectElement.value).not.toBe(eggDefaultValues[index]);
          expect(selectElement.value).toBe(otherOption);
        });
      });
    });

    describe(`CheckboxButton section test, (${PaniniNames.vegetables})`, () => {
      let formFieldDefaultValues: string[];
      // 9 inputs pointing out to the same form field.
      let checkboxButtonInputElements: HTMLInputElement[];
      let checkboxButtons: HTMLButtonElement[];

      beforeEach(() => {
        const defaultValues = lodashGet(formDefaultValues, PaniniNames.vegetables);
        formFieldDefaultValues = defaultValues;
        checkboxButtonInputElements = screen.getAllByTestId(`${PaniniNames.vegetables}-checkboxButtonInputElement`);
        checkboxButtons = Array.from(vegetableVariant, (val, index) => {
          return screen.getByTestId(`${PaniniNames.vegetables}${index}-checkboxButtonInteractionButton`);
        });
      });

      test("checkbox button fields values are indeed default on start", () => {
        checkboxButtonInputElements.forEach((checkboxButtonInputElement) => {
          const inputFieldValues = checkboxButtonInputElement.value.split(",");
          formFieldDefaultValues.forEach((defaultVal, index) => {
            expect(defaultVal).toBe(inputFieldValues[index]);
          });
        });
      });

      test("checkbox button values are changed after user interaction", () => {
        // first click all selected checkboxes to unselect them
        const filteredDefaultValues = [...formFieldDefaultValues];
        formFieldDefaultValues.forEach((defaultVal, index) => {
          const indexOfButtonToBeClicked = checkboxButtons.findIndex((button) => {
            return button.value.toLowerCase() === defaultVal.toLowerCase();
          });
          filteredDefaultValues.filter((val) => val !== defaultVal);
          fireEvent.click(checkboxButtons[indexOfButtonToBeClicked]);
        });
        checkboxButtonInputElements.forEach((checkboxButtonInputElement) =>
          expect(checkboxButtonInputElement.value).toBe("")
        );

        // simulating many interactions
        let elementsCountToBeClicked = Math.floor(Math.random() * vegetableVariant.length * 2);
        let expectedValues: string[] = [];
        while (elementsCountToBeClicked > 0) {
          const otherOption = randomElementArray(vegetableVariant);
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
        checkboxButtonInputElements.forEach((checkboxButtonInputElement) => {
          expect(checkboxButtonInputElement.value).toBe(`${expectedValues}`);
        });
      });
    });

    describe(`Checkbox section test (${PaniniNames.spreads}, ${PaniniNames.topping}, ${PaniniNames.cutlery}, ${PaniniNames.napkins}`, () => {
      let napkinsDefaultValue: boolean;
      let cutleryDefaultValue: boolean;
      let toppingDefaultValue: null | string;
      let spreadsDefaultValues: string[];

      let napkinsCheckboxInputElement: HTMLInputElement;
      let cutleryCheckboxInputElement: HTMLInputElement;
      let toppingCheckboxInputElement: HTMLInputElement;
      let spreadsCheckboxInputElements: HTMLInputElement[];

      let napkinsCheckboxInteractionButton: HTMLButtonElement;
      let cutleryCheckboxInteractionButton: HTMLButtonElement;
      let toppingCheckboxInteractionButton: HTMLButtonElement;
      let spreadsCheckboxInteractionButtons: HTMLButtonElement[];

      beforeEach(() => {
        napkinsDefaultValue = lodashGet(formDefaultValues, PaniniNames.napkins);
        cutleryDefaultValue = lodashGet(formDefaultValues, PaniniNames.cutlery);
        toppingDefaultValue = lodashGet(formDefaultValues, PaniniNames.topping);
        spreadsDefaultValues = lodashGet(formDefaultValues, PaniniNames.spreads);
        napkinsCheckboxInputElement = screen.getByTestId(`${PaniniNames.napkins}0-checkboxInputElement`);
        cutleryCheckboxInputElement = screen.getByTestId(`${PaniniNames.cutlery}0-checkboxInputElement`);
        toppingCheckboxInputElement = screen.getByTestId(`${PaniniNames.topping}0-checkboxInputElement`);
        spreadsCheckboxInputElements = Array.from(spreadVariant, (val, index) =>
          screen.getByTestId(`${PaniniNames.spreads}${index}-checkboxInputElement`)
        );
        napkinsCheckboxInteractionButton = screen.getByTestId(`${PaniniNames.napkins}0-checkboxInteractionButton`);
        cutleryCheckboxInteractionButton = screen.getByTestId(`${PaniniNames.cutlery}0-checkboxInteractionButton`);
        toppingCheckboxInteractionButton = screen.getByTestId(`${PaniniNames.topping}0-checkboxInteractionButton`);
        spreadsCheckboxInteractionButtons = Array.from(spreadVariant, (val, index) =>
          screen.getByTestId(`${PaniniNames.spreads}${index}-checkboxInteractionButton`)
        );
      });

      test("checkbox values are indeed default on start", () => {
        // input.value returns string, hence i put the boolean into the string
        expect(napkinsCheckboxInputElement.value).toBe(`${napkinsDefaultValue}`);
        expect(cutleryCheckboxInputElement.value).toBe(`${cutleryDefaultValue}`);
        // inputs don't accept null as a value hence null is converted to "" which is falsy as null is.
        expect(!!toppingCheckboxInputElement.value).toBe(!!toppingDefaultValue);
        const defaultSpreadsInputElements = spreadsCheckboxInputElements.filter((inputElement) => {
          spreadsDefaultValues.includes(inputElement.getAttribute("data-testoption") || "");
        });
        defaultSpreadsInputElements.forEach((checkboxInputElement, index) => {
          expect(checkboxInputElement.value).toBe(spreadsDefaultValues[index]);
        });
      });

      test(`checkbox values are changed after user interaction`, () => {
        // these 3 have 2 options so it's enough to click once.
        fireEvent.click(napkinsCheckboxInteractionButton);
        fireEvent.click(cutleryCheckboxInteractionButton);
        fireEvent.click(toppingCheckboxInteractionButton);
        expect(napkinsCheckboxInputElement.value).toBe(`${!napkinsDefaultValue}`);
        expect(cutleryCheckboxInputElement.value).toBe(`${!cutleryDefaultValue}`);
        expect(toppingCheckboxInputElement.value).not.toBe(toppingDefaultValue);
        expect(toppingCheckboxInputElement.value).toBe(
          randomElementArray(toppingVariant.filter((val) => val !== toppingDefaultValue))
        );
        // clear all options
        spreadsDefaultValues.forEach((defaultVal, index) => {
          const indexOfButtonToBeClicked = spreadsCheckboxInputElements.findIndex(
            (checkboxInputElement) => checkboxInputElement.value === defaultVal
          );
          fireEvent.click(spreadsCheckboxInteractionButtons[indexOfButtonToBeClicked]);
        });
        spreadsCheckboxInputElements.forEach((checkboxInputElement, index) => {
          expect(checkboxInputElement.value).toBe("");
        });
        // simulating many interactions
        let elementsCountToBeClicked = Math.floor(Math.random() * vegetableVariant.length * 2);
        let expectedValues: string[] = [];
        while (elementsCountToBeClicked > 0) {
          const otherOption = randomElementArray(spreadVariant);
          const indexOfButtonToBeClicked = spreadsCheckboxInputElements.findIndex((element) => {
            return element.getAttribute("data-testoption")?.toLowerCase() === otherOption.toLowerCase();
          });
          fireEvent.click(spreadsCheckboxInteractionButtons[indexOfButtonToBeClicked]);
          if (expectedValues.includes(otherOption)) {
            expectedValues = expectedValues.filter((val) => val !== otherOption);
          } else {
            expectedValues.push(otherOption);
          }
          elementsCountToBeClicked--;
        }
        spreadsCheckboxInputElements.forEach((spreadsCheckboxInputElement) => {
          expect(`${expectedValues}`).toBe(spreadsCheckboxInputElement.value);
        });
      });
    });

    describe(`Radio section test (${PaniniNames.serving}) field`, () => {
      let radioInputElements: HTMLInputElement[];
      let defaultVal: string;

      beforeEach(() => {
        radioInputElements = Array.from(servingVariant, (val, index) =>
          screen.getByTestId(`${PaniniNames.serving}${index}-radioInputElement`)
        );
        defaultVal = lodashGet(formDefaultValues, PaniniNames.serving);
      });

      test("value of radio section form field is indeed default on start", () => {
        radioInputElements.forEach((inputElement, index) => {
          expect(inputElement.value).toBe(defaultVal);
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

      test(`value of text section form field is indeed default on start`, () => {
        expect(inputElement.value).toBe(defaultVal);
      });

      test(`value of text section form field is changed after user interaction`, () => {
        fireEvent.change(inputElement, { target: { value: "Not default name" } });
        expect(inputElement.value).not.toBe(defaultVal);
        expect(inputElement.value).toBe("Not default name");
      });
    });
  });
});
