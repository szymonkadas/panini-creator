import { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";
import { LayoutContext } from "./Layout";
import PaniniCreator from "./PaniniCreator";

export default function FormTransition() {
  const { action } = useParams();
  const { userStep, updateUserStep, setOrderData } = useOutletContext() as LayoutContext;
  // Because this page is used only for animation purposes, on each visit after transition is done, navigate user to proper page.
  const navigate = useNavigate();
  const defaultPos = action === "with_order" ? false : true;
  const destination = action === "with_order" ? "/" : "/panini_creator";
  console.log(action, defaultPos);
  useEffect(() => {
    // console.log(userStep);
    const timeoutId = setTimeout(() => {
      if (action === "reset") {
        setOrderData({});
      }
      updateUserStep();
      navigate(destination);
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return (
    <>
      <SplashScreen shouldTransition={true} defaultPos={defaultPos}></SplashScreen>
      <PaniniCreator></PaniniCreator>
    </>
  );
}
