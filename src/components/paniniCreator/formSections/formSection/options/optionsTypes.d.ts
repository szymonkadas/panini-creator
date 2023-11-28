type OptionProps = {
  option: readonly string;
  index: number;
};

interface NamedOptionProps extends OptionProps {
  name: string;
}

interface SelectOptionProps extends NamedOptionProps {
  onInteract: (option: string) => void;
  parentIndex: number;
}
