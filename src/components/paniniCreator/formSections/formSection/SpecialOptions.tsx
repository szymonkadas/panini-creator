import CheckboxButtonOption from "./options/CheckboxButtonOption";
import CheckboxOption from "./options/CheckboxOption";
import RadioOption from "./options/RadioOption";
import SelectOption from "./options/SelectOption";

type SpecialOptionsProps =
  | {
      type: "checkboxButton";
      options: string[];
      name: string;
    }
  | {
      type: "checkbox";
      options: string[];
      name: string;
      isBoolean: boolean;
    }
  | {
      type: "select";
      options: string[];
    }
  | {
      type: "radio";
      options: string[];
      name: string;
    };

export default function SpecialOptions(props: SpecialOptionsProps) {
  const options = props.options.map((option, index) => {
    switch (props.type) {
      case "checkboxButton":
        return <CheckboxButtonOption {...{ option: option, index: index, name: props.name }} />;
        break;
      case "checkbox":
        return <CheckboxOption {...{ option: option, index: index, name: props.name, isBoolean: props.isBoolean }} />;
        break;
      case "radio":
        return <RadioOption option={option} index={index} name={props.name} />;
        break;
      case "select":
        return <SelectOption {...{ option, index }} />;
        break;
    }
  });
  return <>{...options}</>;
}
