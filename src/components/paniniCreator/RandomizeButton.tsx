import styles from "./RandomizeButton.module.css";
export default function RandomizeButton(props: { action: () => void }) {
  return (
    <button type="button" className={styles.button} onClick={props.action}>
      <div className={styles.dicesContainer}>
        {/* <img className={styles.diceIcon} src="/dice1.svg" alt="dice 1 icon"></img>
                  <img className={styles.diceIcon} src="/dice2.svg" alt="dice 2 icon"></img> */}
        <div className={styles.diceIcon}>
          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="0.306186"
              y="3.00881"
              width="6.69963"
              height="6.69963"
              transform="rotate(-15 0.306186 3.00881)"
              fill="white"
              stroke="black"
              stroke-width="0.5"
            />
            <circle cx="4.5" cy="5.5" r="0.5" fill="black" />
          </svg>
        </div>
        <div className={styles.diceIcon}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="5.03905"
              y="0.34829"
              width="6.69963"
              height="6.69963"
              transform="rotate(35.1014 5.03905 0.34829)"
              fill="white"
              stroke="black"
              stroke-width="0.5"
            />
            <circle cx="7.5" cy="4.5" r="0.5" fill="black" />
            <circle cx="4.5" cy="5.5" r="0.5" fill="black" />
          </svg>
        </div>
      </div>
      Randomize Panini
    </button>
  );
}
