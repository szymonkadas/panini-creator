import { FieldValues, UseFormGetValues } from "react-hook-form";

export default function getInitialFormValues(
  getValues: UseFormGetValues<FieldValues>,
  formElementName: string,
  backupOption: string
) {
  return Array.isArray(getValues(formElementName))
    ? [...getValues(formElementName)]
    : [getValues(formElementName)] || [backupOption];
}
