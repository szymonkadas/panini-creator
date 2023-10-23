import { useEffect, useState } from "react";
import styles from "./SplashScreen.module.css";
import Circle from "./splashScreen/Circle";
import TitleBadge from "./splashScreen/TitleBadge";

type SplashScreenProps = {
  shouldTransition: boolean;
};

const splashScreenDisplayOffStyle = {
  display: "none",
};

export default function SplashScreen(props: SplashScreenProps) {
  const [shouldDisplay, setShouldDisplay] = useState(true);
  // delay and this state are neccessary for transition applied on route transition, so the animation still happens.
  const [isTransitionReady, setIsTransitionReady] = useState(false);
  useEffect(() => {
    const handleTransition = (transition: boolean) => {
      transition && isTransitionReady !== transition && setIsTransitionReady(transition);
    };
    const toggleDisplay = () => {
      setShouldDisplay((prevVal) => !prevVal);
    };
    const transitionTimeoutId = setTimeout(() => handleTransition(props.shouldTransition), 1);
    const displayTimeoutId = setTimeout(() => toggleDisplay(), 4000);
    return () => {
      clearTimeout(transitionTimeoutId);
      clearTimeout(displayTimeoutId);
    };
  }, [props.shouldTransition]);
  return (
    <div
      className={`${styles.splashScreen} ${isTransitionReady && styles.splashScreenEscape}`}
      style={shouldDisplay ? {} : splashScreenDisplayOffStyle}
    >
      <div className={`circlesRow`}>
        <Circle columnLayout={false} shouldTransition={isTransitionReady}></Circle>
        <Circle columnLayout={false} shouldTransition={isTransitionReady}></Circle>
        <Circle columnLayout={false} shouldTransition={isTransitionReady}>
          <TitleBadge shouldTransition={isTransitionReady}></TitleBadge>
        </Circle>
        <Circle columnLayout={false} shouldTransition={isTransitionReady}></Circle>
        <Circle columnLayout={false} shouldTransition={isTransitionReady}></Circle>
      </div>
      <div className="circlesColumn">
        <Circle columnLayout={true} shouldTransition={isTransitionReady}></Circle>
        <Circle columnLayout={true} shouldTransition={isTransitionReady}></Circle>
      </div>
    </div>
  );
}
