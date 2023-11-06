import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { updateValueAtIndex } from "../../../../../utils/form-helpers";
import SpecialOptions from "../SpecialOptions";
import styles from "./SelectElement.module.css";

export default function SelectElement(props: SelectElementProps) {
  const { control } = useFormContext();
  const [isSelectActive, setIsSelectActive] = useState(false);

  const { field } = useController({
    name: props.name,
    control: control,
  });

  const handleSelectClick = () => {
    setIsSelectActive((prev) => !prev);
  };

  const handleBlur = () => {
    field.onBlur();
    setIsSelectActive(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setFormElementsValues((prev) => updateValueAtIndex(prev, props.orderVal, event.target.value));
  };

  return (
    <label className={styles.selectLabel}>
      Select an option:
      <select
        className={styles.selectOptions}
        {...field}
        onBlur={handleBlur}
        onClick={handleSelectClick}
        onChange={handleChange}
        value={props.formElementsValues[props.orderVal]}
      >
        <SpecialOptions type="select" options={props.options} />
      </select>
      <img
        className={`${styles.selectArrow} ${isSelectActive && styles.selectArrowActive}`}
        src="/src/images/downArrow.svg"
        alt="select arrow"
      ></img>
    </label>
  );
}
