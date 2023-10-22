import CheckboxButtonOption from "./options/CheckboxButtonOption";
import CheckboxOption from "./options/CheckboxOption";
import RadioOption from "./options/RadioOption";
import SelectOption from "./options/SelectOption";

type SpecialOptionsProps = {
  type: "checkboxButton" | "checkbox" | "radio" | "select";
  options: string[];
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
        return <RadioOption {...{ option, index }} />;
        break;
      case "select":
        return <SelectOption {...{ option, index }} />;
        break;
    }
  });
  return <>{...options}</>;
}
