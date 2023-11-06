type OptionProps = {
  option: readonly string;
  index: number;
};

interface NamedOptionProps extends OptionProps {
  name: string;
}

interface CheckboxOptionProps extends NamedOptionProps {
  isValBoolean: boolean;
}
