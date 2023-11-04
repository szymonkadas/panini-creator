type FormSectionProps =
  | {
      removable: true;
      maxElements: number;
      title: string;
      name: string;
      options: readonly string[];
    }
  | {
      removable: false;
      title: string;
      name: string;
      options: readonly string[];
    };

type FormSectionTemplateProps = {
  title: string;
  children: ReactNode;
};

type TextSectionProps = Omit<FormSectionProps, "options" | "removable">;

type SwipeSectionProps = Omit<FormSectionProps, "removable"> & {
  children?: ReactNode;
};

type MultiSwipeSectionProps = SwipeSectionProps & {
  maxElements: number;
};

type CheckboxSectionProps = Omit<FormSectionProps, "removable"> & {
  isValBoolean: boolean;
};

type SelectSectionProps = Omit<FormSectionProps, "removable"> & {
  maxElements: number;
};
