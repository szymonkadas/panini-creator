import "./style/Circle.css";

type CircleProps = {
  columnLayout: boolean;
  transition: boolean;
  children?: React.ReactNode;
};

export default function Circle(props: CircleProps) {
  const layout = props.columnLayout ? "column" : "row";
  return (
    <div className={`circle-${layout}__circle ${props.transition && `circle-${layout}__circle--escape`}`}>
      {props.children}
    </div>
  );
}
