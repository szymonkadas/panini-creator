type SelectElementProps = {
  name: string;
  options: string[];
  formElementsValues: string[];
  setFormElementsValues: React.Dispatch<React.SetStateAction<string[]>>;
  orderVal: number;
  defaultVal?: string;
};

interface SwipeElementProps extends SelectElementProps {
  children?: ReactNode;
}
