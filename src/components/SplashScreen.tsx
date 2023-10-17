import Circle from "./splashScreen/Circle";
import "./splashScreen/style/SplashScreen.css";
import TitleBadge from "./splashScreen/TitleBadge";
type SplashScreenProps = {
  order: boolean;
};
export default function SplashScreen(props: SplashScreenProps) {
  return (
    <div className="splash-screen">
      <div className="circle-row">
        <Circle columnLayout={false}></Circle>
        <Circle columnLayout={false}></Circle>
        <Circle columnLayout={false}>
          <TitleBadge order={props.order}></TitleBadge>
        </Circle>
        <Circle columnLayout={false}></Circle>
        <Circle columnLayout={false}></Circle>
      </div>
      <div className="circle-column">
        <Circle columnLayout={true}></Circle>
        <Circle columnLayout={true}></Circle>
      </div>
    </div>
  );
}
