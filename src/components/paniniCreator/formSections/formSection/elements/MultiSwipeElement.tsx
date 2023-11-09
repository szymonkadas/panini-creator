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
    handleOptionDecrease(currentOption, setCurrentOption, () =>
      props.onUpdate(props.index, props.options[currentOption - 1])
    );
  };

  const handleIncrease = () => {
    handleOptionIncrease(currentOption, props.options.length, setCurrentOption, () =>
      props.onUpdate(props.index, props.options[currentOption + 1])
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
      {props.children}
    </SwipeElement>
  );
}
