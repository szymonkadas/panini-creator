import { FieldValues, UseFormGetValues } from "react-hook-form";

export function getInitialFormValues(
  getValues: UseFormGetValues<FieldValues>,
  formElementName: string,
  backupOption: string
) {
  return Array.isArray(getValues(formElementName))
    ? [...getValues(formElementName)]
    : [getValues(formElementName)] || [backupOption];
}

export function updateValueAtIndex(prevVals: string[], indexToChange: number, val: string): string[] {
  return prevVals.map((item, index) => (index === indexToChange ? val : item));
}
