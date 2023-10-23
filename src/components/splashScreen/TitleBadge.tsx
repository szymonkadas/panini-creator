import { useNavigate, useOutletContext } from "react-router-dom";
import { LayoutContext } from "../../pages/Layout";
import styles from "./TitleBadge.module.css";

type TitleBadgeProps = {
  shouldTransition: boolean;
};

export default function TitleBadge(props: TitleBadgeProps) {
  const { isPaniniOrdered } = useOutletContext() as LayoutContext;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${isPaniniOrdered ? "/" : "/panini_creator"}`);
  };

  return (
    <div className={`${styles.titleBadge} ${props.shouldTransition && styles.titleBadgeEscape}`}>
      <h1 className={styles.textContent}>Panini {isPaniniOrdered ? "ordered" : "Creator"}</h1>
      <button className={styles.button} disabled={props.shouldTransition} onClick={handleClick}>
        {isPaniniOrdered ? "start again" : "begin"}
      </button>
    </div>
  );
}
