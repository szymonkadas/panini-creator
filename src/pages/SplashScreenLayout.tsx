import SplashScreen from "../components/SplashScreen";
import PaniniCreator from "./PaniniCreator";

type SplashScreenLayoutProps = {
  shouldTransition: boolean;
  defaultPos: boolean;
  title?: string;
  actionDesc?: string;
};

export default function SplashScreenLayout(props: SplashScreenLayoutProps) {
  return (
    <>
      <SplashScreen {...props}></SplashScreen>
      <PaniniCreator></PaniniCreator>
    </>
  );
}
