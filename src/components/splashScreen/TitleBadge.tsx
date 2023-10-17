import "./style/TitleBadge.css";

type TitleBadgeProps = {
  order: boolean;
};

export default function TitleBadge(props: TitleBadgeProps) {
  return (
    <div className="title-badge">
      <h1>Panini {props.order ? "ordered" : "Creator"}</h1>
      <button>{props.order ? "start again" : "begin"}</button>
    </div>
  );
}
