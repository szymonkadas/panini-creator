import { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";

export function isActiveToggle(
  fields: Record<"id", string>[],
  append: UseFieldArrayAppend<FieldValues, string>,
  appendWhat: string,
  remove: UseFieldArrayRemove
) {
  fields.length > 0 ? remove() : append(appendWhat);
}
