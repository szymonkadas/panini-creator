type BaseSpecialOptionsProps = {
  options: readonly string[];
};

type CheckboxButtonProps = BaseSpecialOptionsProps & {
  type: "checkboxButton";
  name: string;
};

type CheckboxProps = BaseSpecialOptionsProps & {
  type: "checkbox";
  name: string;
};

type SelectProps = BaseSpecialOptionsProps & {
  type: "select";
};

type RadioProps = BaseSpecialOptionsProps & {
  type: "radio";
  name: string;
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
