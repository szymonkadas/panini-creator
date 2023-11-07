type SelectElementProps = {
  name: string;
  options: readonly string[];
  val: Record<"id", string>;
  index: number;
  update: UseFieldArrayUpdate<FieldValues, string>;
};

type SingleSwipeElementProps = {
  name: string;
  options: readonly string[];
  children?: React.ReactNode;
};

interface MultiSwipeElementProps extends SingleSwipeElementProps {
  index: number;
  update: UseFieldArrayUpdate<FieldValues, string>;
}

interface SwipeElementProps {
  name: string;
  handleOptionDecrease: () => void;
  handleOptionIncrease: () => void;
  children?: React.ReactNode;
}
