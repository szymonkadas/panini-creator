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
  children: ReactNode;
};

interface FormSectionTitleTemplateProps extends FormSectionTemplateProps {
  classes?: string;
}
interface FormSectionRecordTemplateProps extends FormSectionTitleTemplateProps {
  title?: string;
}

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
