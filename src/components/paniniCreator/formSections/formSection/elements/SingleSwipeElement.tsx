import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { handleOptionDecrease, handleOptionIncrease } from "../../../../../utils/form-helpers";
import SwipeElement from "./SwipeElement";

export default function SingleSwipe(props: SingleSwipeElementProps) {
  const { getValues, setValue } = useFormContext();
  const currVal = getValues(props.name);

  const [currentOption, setCurrentOption] = useState(props.options.findIndex((val) => val === currVal));
  useEffect(() => {
    setCurrentOption(props.options.findIndex((val) => val === currVal));
  }, [currVal]);

  const handleDecrease = () =>
    handleOptionDecrease(currentOption, setCurrentOption, () => setValue(props.name, props.options[currentOption - 1]));

  const handleIncrease = () =>
    handleOptionIncrease(currentOption, props.options.length, setCurrentOption, () =>
      setValue(props.name, props.options[currentOption + 1])
    );

  return (
    <SwipeElement name={props.name} handleOptionDecrease={handleDecrease} handleOptionIncrease={handleIncrease}>
      {props.children}
    </SwipeElement>
  );
}
