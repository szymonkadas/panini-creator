import { useState } from "react";
import styles from "./SplashScreen.module.css";
import Circle from "./splashScreen/Circle";
import TitleBadge from "./splashScreen/TitleBadge";

type SplashScreenProps = {
  isPaniniOrdered: boolean;
};

export default function SplashScreen(props: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [transition, setTransition] = useState(false);
  // w przyszłości można to przerobić tak by tranzycja odpalała się na starcie tak jak prawdopodobnie wygladałaby odwrócona animacja po złożeniu zamówienia. możnaby wtedy zrobić logikę na zasadzie przełącznika.
  const handleTransition = () => {
    // start transition
    setTransition(true);
    // mogą być potrzebne refy do tego timeoutu.
    setTimeout(() => {
      setIsVisible(false);
      setTransition(false);
    }, 4000);
    // for test purposes
    setTimeout(() => {
      setIsVisible(true);
    }, 6000);
  };
  return (
    <>
      {isVisible && (
        <div className={`${styles.splashScreen} ${transition && styles.splashScreenEscape}`}>
          <div className={`circlesRow`}>
            <Circle columnLayout={false} transition={transition}></Circle>
            <Circle columnLayout={false} transition={transition}></Circle>
            <Circle columnLayout={false} transition={transition}>
              <TitleBadge isPaniniOrdered={props.isPaniniOrdered} handleTransition={handleTransition}></TitleBadge>
            </Circle>
            <Circle columnLayout={false} transition={transition}></Circle>
            <Circle columnLayout={false} transition={transition}></Circle>
          </div>
          <div className="circlesColumn">
            <Circle columnLayout={true} transition={transition}></Circle>
            <Circle columnLayout={true} transition={transition}></Circle>
          </div>
        </div>
      )}
    </>
  );
}
