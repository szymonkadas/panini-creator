import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SplashScreen.module.css";
import Circle from "./splashScreen/Circle";
import TitleBadge from "./splashScreen/TitleBadge";

type SplashScreenProps = {
  shouldTransition: boolean;
  defaultPos: boolean;
  title?: string;
  actionDesc?: string;
};

export default function SplashScreen(props: SplashScreenProps) {
  // delay and this state are neccessary for transition applied on route transition, so the animation still happens.
  const [isDefaultPositionOn, setIsDefaultPositionOn] = useState(props.defaultPos);
  const [isTransitionReady, setIsTransitionReady] = useState(false);
  const navigate = useNavigate();
  const handleButtonAction = () => {
    setIsTransitionReady(true);
  };

  // transition control useEffect.
  useEffect(() => {
    const handleTransition = (transition: boolean) => {
      transition && isTransitionReady !== transition && setIsTransitionReady(transition);
    };
    const transitionTimeoutId = setTimeout(() => handleTransition(props.shouldTransition), 1);
    return () => {
      clearTimeout(transitionTimeoutId);
    };
  }, [props.shouldTransition]);

  // navigation and default position control useEffect.
  useEffect(() => {
    if (isTransitionReady) {
      if (isDefaultPositionOn) {
        const displayToggleTimeoutId = setTimeout(() => navigate("/panini_creator"), 4000);
        return () => {
          clearTimeout(displayToggleTimeoutId);
        };
      } else {
        setIsTransitionReady(false);
        setIsDefaultPositionOn(true);
      }
    }
  }, [isTransitionReady]);

  const defaultStyle = isDefaultPositionOn ? styles.splashScreenDefault : styles.splashScreenTransformed;
  const transitionStyle = isDefaultPositionOn ? styles.toTransformedTransition : styles.toDefaultTransition;
  return (
    <div className={`${defaultStyle} ${isTransitionReady ? transitionStyle : ""}`}>
      <div className={`circlesRow`}>
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={isDefaultPositionOn} />
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={isDefaultPositionOn} />
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={isDefaultPositionOn}>
          <TitleBadge
            shouldTransition={isTransitionReady}
            handleClick={handleButtonAction}
            title={props.title}
            actionDesc={props.actionDesc}
          ></TitleBadge>
        </Circle>
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={isDefaultPositionOn} />
        <Circle columnLayout={false} shouldTransition={isTransitionReady} defaultPos={isDefaultPositionOn} />
      </div>
      <div className="circlesColumn">
        <Circle columnLayout={true} shouldTransition={isTransitionReady} defaultPos={isDefaultPositionOn} />
        <Circle columnLayout={true} shouldTransition={isTransitionReady} defaultPos={isDefaultPositionOn} />
      </div>
    </div>
  );
}
