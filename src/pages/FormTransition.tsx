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
  useEffect(() => {
    // console.log(userStep);
    setTimeout(() => {
      let destination = "/";
      switch (action) {
        case "without_order":
          destination = "/panini_creator";
          break;
        case "with_order":
          destination = "/";
          break;
        case "reset":
          destination = "/panini_creator";
          setOrderData({});
          break;
        default:
          setOrderData({});
          destination = "/";
          break;
      }
      updateUserStep();
      //   console.log(userStep);
      navigate(destination);
    }, 4000);
  }, []);
  return (
    <>
      <SplashScreen shouldTransition={true}></SplashScreen>
      <PaniniCreator></PaniniCreator>
    </>
  );
}
