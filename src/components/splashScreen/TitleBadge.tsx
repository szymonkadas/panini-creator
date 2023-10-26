import styles from "./TitleBadge.module.css";

type TitleBadgeProps = {
  shouldTransition: boolean;
  handleClick: () => void;
  title?: string;
  actionDesc?: string;
};

export default function TitleBadge(props: TitleBadgeProps) {
  return (
    <div className={`${styles.titleBadge} ${props.shouldTransition && styles.titleBadgeEscape}`}>
      <h1 className={styles.textContent}>{props.title}</h1>
      <button className={styles.button} disabled={props.shouldTransition} onClick={props.handleClick}>
        {props.actionDesc}
      </button>
    </div>
  );
}
