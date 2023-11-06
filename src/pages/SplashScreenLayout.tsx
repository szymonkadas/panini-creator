import SplashScreen from "../components/SplashScreen";
import PaniniCreator from "./PaniniCreator";

export default function SplashScreenLayout(props: SplashScreenLayoutProps) {
  return (
    <>
      <SplashScreen {...props}></SplashScreen>
      <PaniniCreator navTo={props.navTo}></PaniniCreator>
    </>
  );
}
