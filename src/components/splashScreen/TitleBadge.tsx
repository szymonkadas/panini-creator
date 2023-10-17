import { useState } from "react";
import "./style/TitleBadge.css";

type TitleBadgeProps = {
  order: boolean;
  handleTransition: () => void;
};

export default function TitleBadge(props: TitleBadgeProps) {
  const [isButtonAvailable, setIsButtonAvailable] = useState(true);
  const handleClick = () => {
    setIsButtonAvailable(false);
    setTimeout(() => {
      setIsButtonAvailable(true);
    }, 4000);
  };
  const buttonStyle = {
    cursor: "initial",
  };
  return (
    <div className={`title-badge ${!isButtonAvailable && "title-badge--escape"}`}>
      <h1>Panini {props.order ? "ordered" : "Creator"}</h1>
      <button
        onClick={() => {
          props.handleTransition();
          handleClick();
        }}
        disabled={isButtonAvailable ? false : true}
        style={isButtonAvailable ? {} : buttonStyle}
      >
        {props.order ? "start again" : "begin"}
      </button>
    </div>
  );
}
