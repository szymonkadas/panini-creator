type SelectElementProps = {
  name: string;
  options: readonly string[];
  val: Record<"id", string>;
} & (
  | {
      index: number;
      update: UseFieldArrayUpdate<FieldValues, string>;
    }
  | { index?: never; update?: never }
);
type SwipeElementProps = {
  name: string;
  options: readonly string[];
  children?: React.ReactNode;
} & (
  | {
      index: number;
      update: UseFieldArrayUpdate<FieldValues, string>;
    }
  | {
      index?: never;
      update?: never;
    }
);
