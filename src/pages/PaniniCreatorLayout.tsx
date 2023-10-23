import PaniniCreator from "../components/PaniniCreator";
import SplashScreen from "../components/SplashScreen";

type PaniniCreatorLayoutProps = {
  shouldTransition: boolean;
};

export default function PaniniCreatorLayout(props: PaniniCreatorLayoutProps) {
  return (
    <>
      {/* prolly it'll change due to parameters later on passed to the url so the form changes accordingly but for now it is what it is. Don't want to overplan */}
      <SplashScreen shouldTransition={props.shouldTransition}></SplashScreen>
      <PaniniCreator></PaniniCreator>
    </>
  );
}
