import { useEffect, useState } from "react";
import styles from "./SplashScreen.module.css";
import Circle from "./splashScreen/Circle";
import TitleBadge from "./splashScreen/TitleBadge";

type SplashScreenProps = {
  shouldTransition: boolean;
  defaultPos: boolean;
};

export default function SplashScreen(props: SplashScreenProps) {
  // delay and this state are neccessary for transition applied on route transition, so the animation still happens.
  const [isTransitionReady, setIsTransitionReady] = useState(false);
  useEffect(() => {
    const handleTransition = (transition: boolean) => {
      transition && isTransitionReady !== transition && setIsTransitionReady(transition);
    };
    const transitionTimeoutId = setTimeout(() => handleTransition(props.shouldTransition), 1);
    return () => {
      clearTimeout(transitionTimeoutId);
    };
  }, [props.shouldTransition]);
  const defaultStyle = props.defaultPos ? styles.splashScreenDefault : styles.splashScreenTransformed;
  const transitionStyle = props.defaultPos ? styles.toTransformedTransition : styles.toDefaultTransition;
  return (
    <div className={`${defaultStyle} ${isTransitionReady ? transitionStyle : ""}`}>
      <div className={`circlesRow`}>
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={props.defaultPos} />
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={props.defaultPos} />
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={props.defaultPos}>
          <TitleBadge shouldTransition={isTransitionReady}></TitleBadge>
        </Circle>
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={props.defaultPos} />
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={props.defaultPos} />
      </div>
      <div className="circlesColumn">
        <Circle columnLayout={true} shouldTransition={isTransitionReady} defaultPos={props.defaultPos} />
        <Circle columnLayout={true} shouldTransition={isTransitionReady} defaultPos={props.defaultPos} />
      </div>
    </div>
  );
}
