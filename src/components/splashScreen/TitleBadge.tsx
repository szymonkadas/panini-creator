import { useNavigate, useOutletContext } from "react-router-dom";
import { LayoutContext } from "../../pages/Layout";
import styles from "./TitleBadge.module.css";

type TitleBadgeProps = {
  shouldTransition: boolean;
};

export default function TitleBadge(props: TitleBadgeProps) {
  const { userStep, setOrderData } = useOutletContext() as LayoutContext;
  const navigate = useNavigate();
  const handleClick = () => {
    let destination = "/";
    switch (userStep) {
      case 0:
        destination = "/form_transition/without_order";
        break;
      case 1:
        destination = "/form_transition/without_order";
        break;
      case 2:
        destination = "/form_transition/with_order";
      case 3:
        destination = "/form_transition/reset";
        break;
    }
    navigate(destination);
  };

  return (
    <div className={`${styles.titleBadge} ${props.shouldTransition && styles.titleBadgeEscape}`}>
      <h1 className={styles.textContent}>Panini {userStep < 2 ? "Creator" : "ordered"}</h1>
      <button className={styles.button} disabled={props.shouldTransition} onClick={handleClick}>
        {userStep === 0 ? "begin" : "start again"}
      </button>
    </div>
  );
}
