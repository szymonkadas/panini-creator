import PaniniCreator from "../components/PaniniCreator";
import SplashScreen from "../components/SplashScreen";

export default function PaniniCreatorLayout() {
  return (
    <>
      {/* prolly it'll change due to parameters later on passed to the url so the form changes accordingly but for now it is what it is. Don't want to overplan */}
      <SplashScreen shouldTransition={true}></SplashScreen>
      <PaniniCreator></PaniniCreator>
    </>
  );
}
