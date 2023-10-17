import { useState } from "react";
import styles from "./TitleBadge.module.css";

type TitleBadgeProps = {
  isPaniniOrdered: boolean;
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
    <div className={`${styles.titleBadge} ${!isButtonAvailable && styles.titleBadgeEscape}`}>
      <h1 className={styles.textContent}>Panini {props.isPaniniOrdered ? "ordered" : "Creator"}</h1>
      <button
        className={styles.button}
        onClick={() => {
          props.handleTransition();
          handleClick();
        }}
        disabled={isButtonAvailable ? false : true}
        style={isButtonAvailable ? {} : buttonStyle}
      >
        {props.isPaniniOrdered ? "start again" : "begin"}
      </button>
    </div>
  );
}
