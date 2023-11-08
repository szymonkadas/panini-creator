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
  setCurrentOption: React.Dispatch<React.SetStateAction<number>>,
  action: () => void
) {
  if (currentOptionIndex > 0) {
    action();
    setCurrentOption((prev) => prev - 1);
  }
}

export function handleOptionIncrease(
  currentOptionIndex: number,
  optionsLength: number,
  setCurrentOption: React.Dispatch<React.SetStateAction<number>>,
  action: () => void
) {
  if (currentOptionIndex < optionsLength - 1) {
    action();
    setCurrentOption((prev) => prev + 1);
  }
}
