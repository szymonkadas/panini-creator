import styles from "./TitleBadge.module.css";

type TitleBadgeProps = {
  isPaniniOrdered: boolean;
};

export default function TitleBadge(props: TitleBadgeProps) {
  return (
    <div className={styles.titleBadge}>
      <h1 className={styles.textContent}>Panini {props.isPaniniOrdered ? "ordered" : "Creator"}</h1>
      <button className={styles.button}>{props.isPaniniOrdered ? "start again" : "begin"}</button>
    </div>
  );
}
