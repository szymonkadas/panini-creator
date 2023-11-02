export type FormSectionProps =
  | {
      removable: true;
      maxElements: number;
      title: string;
      name: string;
      options: string[];
    }
  | {
      removable: false;
      title: string;
      name: string;
      options: string[];
    };
