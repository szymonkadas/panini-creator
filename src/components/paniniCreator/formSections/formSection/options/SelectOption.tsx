export default function SelectOption(props: OptionProps) {
  return (
    <option
      key={`optionSelect${props.option}${props.index}`}
      className={"optionSelect"}
      value={props.option}
      label={props.option}
    ></option>
  );
}
