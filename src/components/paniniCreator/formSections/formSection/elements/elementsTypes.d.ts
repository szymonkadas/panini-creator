type SelectElementProps = {
  name: string;
  options: readonly string[];
  formElementsValues: string[];
  setFormElementsValues: React.Dispatch<React.SetStateAction<string[]>>;
  orderVal: number;
  defaultVal?: string;
};

interface SwipeElementProps extends Omit<SelectElementProps, "formElementsValues"> {
  children?: React.ReactNode;
}
