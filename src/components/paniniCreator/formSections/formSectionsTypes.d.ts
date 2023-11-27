type FormSectionProps =
  | {
      maxElements: number;
      title: string;
      name: string;
      options: readonly string[];
    }
  | {
      title: string;
      name: string;
      options: readonly string[];
    };

type FormSectionTemplateProps = {
  title: string;
  children: ReactNode;
};

type TextSectionProps = Omit<FormSectionProps, "options">;

type SwipeSectionProps = FormSectionProps & {
  optionsIcons?: JSX.Element[];
};

type MultiSwipeSectionProps = SwipeSectionProps & {
  maxElements: number;
};

type CheckboxSectionProps = Omit<FormSectionProps, "maxElements">;

type SelectSectionProps = FormSectionProps & {
  maxElements: number;
};
