import "./style/Circle.css";

type CircleProps = {
  columnLayout: boolean;
  children?: React.ReactNode;
};

export default function Circle(props: CircleProps) {
  return <div className={`circle-${props.columnLayout ? "column" : "row"}__circle`}>{props.children}</div>;
}
