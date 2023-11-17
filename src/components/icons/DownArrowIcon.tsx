import styles from "./icons.module.css";
export default function DownArrowIcon(props: { active: boolean }) {
  return (
    <div className={`${styles.selectArrow} ${props.active ? styles.selectArrowActive : ""}`}>
      <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.426453 1L7.31983 8L14.2132 1" stroke="black" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
