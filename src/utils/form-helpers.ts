import { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";

export function isActiveToggle(
  fields: Record<"id", string>[],
  append: UseFieldArrayAppend<FieldValues, string>,
  appendWhat: string,
  remove: UseFieldArrayRemove
) {
  fields.length > 0 ? remove() : append(appendWhat);
}

export function handleOptionDecrease(
  currentOptionIndex: number,
  optionsLength: number,
  setCurrentOption: React.Dispatch<React.SetStateAction<number>>,
  action: (newOptionIndex: number) => void
) {
  const newOptionIndex = currentOptionIndex > 0 ? currentOptionIndex - 1 : optionsLength - 1;
  action(newOptionIndex);
  setCurrentOption(newOptionIndex);
}

export function handleOptionIncrease(
  currentOptionIndex: number,
  optionsLength: number,
  setCurrentOption: React.Dispatch<React.SetStateAction<number>>,
  action: (newOptionIndex: number) => void
) {
  const newOptionIndex = currentOptionIndex < optionsLength - 1 ? currentOptionIndex + 1 : 0;
  action(newOptionIndex);
  setCurrentOption(newOptionIndex);
}
