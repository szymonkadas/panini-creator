type OptionProps = {
  option: readonly string;
  index: number;
};

interface NamedOptionProps extends OptionProps {
  name: string;
}

interface SelectOptionProps extends OptionProps {
  onInteract: (option: string) => void;
}
