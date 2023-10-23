import CheckboxButtonOption from "./options/CheckboxButtonOption";
import CheckboxOption from "./options/CheckboxOption";
import RadioOption from "./options/RadioOption";
import SelectOption from "./options/SelectOption";

type SpecialOptionsProps =
  | {
      type: "checkboxButton" | "checkbox" | "select";
      options: string[];
    }
  | {
      type: "radio";
      options: string[];
      checkedRadioIndex: number;
      setCheckedRadioIndex: (radioIndex: number) => void;
      name: string;
    };

export default function SpecialOptions(props: SpecialOptionsProps) {
  const options = props.options.map((option, index) => {
    switch (props.type) {
      case "checkboxButton":
        return <CheckboxButtonOption {...{ option, index }} />;
        break;
      case "checkbox":
        return <CheckboxOption {...{ option, index }} />;
        break;
      case "radio":
        return (
          <RadioOption
            option={option}
            index={index}
            checkedIndex={props.checkedRadioIndex}
            setCheckedRadioIndex={props.setCheckedRadioIndex}
            name={props.name}
          />
        );
        break;
      case "select":
        return <SelectOption {...{ option, index }} />;
        break;
    }
  });
  return <>{...options}</>;
}
