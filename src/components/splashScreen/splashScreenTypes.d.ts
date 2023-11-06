type TitleBadgeProps = {
  shouldTransition: boolean;
  handleClick: () => void;
  title?: string;
  actionDesc?: string;
};

type CircleProps = {
  columnLayout: boolean;
  shouldTransition: boolean;
  defaultPos: boolean;
  children?: React.ReactNode;
};
