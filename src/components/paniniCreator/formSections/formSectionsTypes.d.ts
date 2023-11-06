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

interface TextSectionProps extends Omit<FormSectionProps, "options" | "removable"> {
  removable?: never;
  options?: never;
}

type SwipeSectionProps = FormSectionProps & {
  children?: ReactNode;
};

type CheckboxSectionProps = Omit<FormSectionProps, "removable"> & {
  isValBoolean: boolean;
};
