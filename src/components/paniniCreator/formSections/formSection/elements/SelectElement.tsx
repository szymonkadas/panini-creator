import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import SpecialOptions from "../SpecialOptions";
import styles from "./SelectElement.module.css";

type SelectElementProps = {
  name: string;
  options: string[];
  setFormElementsValues: React.Dispatch<React.SetStateAction<string[]>>;
  orderVal: number;
  defaultVal?: string;
};

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
    field.onChange(event);
    props.setFormElementsValues((prev) =>
      prev
        .slice(0, props.orderVal)
        .concat(event.target.value)
        .concat(prev.slice(props.orderVal + 1))
    );
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
      >
        <SpecialOptions name={props.name} type="select" options={props.options} />
      </select>
      <img
        className={`${styles.selectArrow} ${isSelectActive && styles.selectArrowActive}`}
        src="/src/images/downArrow.svg"
        alt="select arrow"
      ></img>
    </label>
  );
}
