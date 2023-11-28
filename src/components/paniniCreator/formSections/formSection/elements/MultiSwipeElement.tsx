import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { handleOptionDecrease, handleOptionIncrease } from "../../../../../utils/form-helpers";
import SwipeElement from "./SwipeElement";

export default function MultiSwipe(props: MultiSwipeElementProps) {
  const { getValues } = useFormContext();
  const currVal = getValues(props.name)[props.index];

  const [currentOption, setCurrentOption] = useState(props.options.findIndex((val) => val === currVal));
  useEffect(() => {
    setCurrentOption(props.options.findIndex((val) => val === currVal));
  }, [currVal]);

  const handleDecrease = () => {
    handleOptionDecrease(currentOption, props.options.length, setCurrentOption, (newOptionIndex: number) => {
      props.onUpdate(props.index, props.options[newOptionIndex]);
    });
  };

  const handleIncrease = () => {
    handleOptionIncrease(currentOption, props.options.length, setCurrentOption, (newOptionIndex: number) =>
      props.onUpdate(props.index, props.options[newOptionIndex])
    );
  };

  return (
    <SwipeElement
      name={props.name}
      value={currVal}
      index={props.index}
      handleOptionDecrease={handleDecrease}
      handleOptionIncrease={handleIncrease}
    >
      {props.optionsIcons && props.optionsIcons.length > currentOption && props.optionsIcons[currentOption]}
    </SwipeElement>
  );
}
