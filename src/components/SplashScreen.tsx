import styles from "./SplashScreen.module.css";
import Circle from "./splashScreen/Circle";
import TitleBadge from "./splashScreen/TitleBadge";

type SplashScreenProps = {
  isPaniniOrdered: boolean;
};

export default function SplashScreen(props: SplashScreenProps) {
  return (
    <div className={styles.splashScreen}>
      <div className="circlesRow">
        <Circle columnLayout={false}></Circle>
        <Circle columnLayout={false}></Circle>
        <Circle columnLayout={false}>
          <TitleBadge isPaniniOrdered={props.isPaniniOrdered}></TitleBadge>
        </Circle>
        <Circle columnLayout={false}></Circle>
        <Circle columnLayout={false}></Circle>
      </div>
      <div className="circlesColumn">
        <Circle columnLayout={true}></Circle>
        <Circle columnLayout={true}></Circle>
      </div>
    </div>
  );
}
