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
  children?: React.ReactNode;
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
  children?: React.ReactNode;
}
