import CheckboxButtonOption from "./options/CheckboxButtonOption";
import SelectOption from "./options/SelectOption";

type SpecialOptionsProps = {
  type: "checkboxButton" | "select";
  options: string[];
};

export default function SpecialOptions(props: SpecialOptionsProps) {
  const options = props.options.map((option, index) => {
    switch (props.type) {
      case "checkboxButton":
        return <CheckboxButtonOption {...{ option, index }} />;
        break;
      case "select":
        return <SelectOption {...{ option, index }} />;
        break;
    }
  });
  return <>{...options}</>;
}
