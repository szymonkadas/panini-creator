type SelectElementProps = {
  name: string;
  options: readonly string[];
  val: Record<"id", string>;
  index: number;
  onUpdate: (index: number, value: string) => void;
};

type SingleSwipeElementProps = {
  name: string;
  options: readonly string[];
  optionsIcons?: JSX.Element[];
};
interface MultiSwipeElementProps extends SingleSwipeElementProps {
  index: number;
  onUpdate: (index: number, value: string) => void;
}

interface SwipeElementProps {
  name: string;

  handleOptionDecrease: () => void;
  handleOptionIncrease: () => void;
  value?: string;
  index?: number;
  children?: React.ReactNode;
}

interface SelectDropdownProps {
  active: boolean;
  options: readonly string[];
  handleOptionChange: (option: string) => void;
}
