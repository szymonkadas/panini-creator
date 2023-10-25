import { useEffect, useState } from "react";
import styles from "./SplashScreen.module.css";
import Circle from "./splashScreen/Circle";
import TitleBadge from "./splashScreen/TitleBadge";

type SplashScreenProps = {
  shouldTransition: boolean;
};

export default function SplashScreen(props: SplashScreenProps) {
  // delay and this state are neccessary for transition applied on route transition, so the animation still happens.
  const [isTransitionReady, setIsTransitionReady] = useState(false);
  useEffect(() => {
    const handleTransition = (transition: boolean) => {
      transition && isTransitionReady !== transition && setIsTransitionReady(transition);
    };
    const transitionTimeoutId = setTimeout(() => handleTransition(props.shouldTransition), 0);
    return () => {
      clearTimeout(transitionTimeoutId);
    };
  }, [props.shouldTransition]);
  return (
    <div className={`${styles.splashScreen} ${isTransitionReady && styles.splashScreenEscape}`}>
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
