type BaseSpecialOptionsProps = {
  options: readonly string[];
  name: string;
};

type CheckboxButtonProps = BaseSpecialOptionsProps & {
  type: "checkboxButton";
};

type CheckboxProps = BaseSpecialOptionsProps & {
  type: "checkbox";
};

type SelectProps = BaseSpecialOptionsProps & {
  type: "select";
  onInteract: (option: string) => void;
  parentIndex: number;
};

type RadioProps = BaseSpecialOptionsProps & {
  type: "radio";
};

type SpecialOptionsProps = CheckboxButtonProps | CheckboxProps | SelectProps | RadioProps;

type RemovalsProps = {
  isActive: boolean;
  maxElements: number;
  defaultVal: string;
  fieldsCurrentLength: number;
  onAppend: (value: string) => void;
  onRemove: (index: number) => void;
  toggleActive: () => void;
};
