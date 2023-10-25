import { useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import FormTransition from "./pages/FormTransition";
import Layout from "./pages/Layout";
import PaniniCreator from "./pages/PaniniCreator";

// 0 = start, restarted state, panini, restart
export type UserStep = 0 | 1 | 2 | 3;
export type SetOrderData = (val: object) => void;
export type UpdateUserStep = () => void;

function App() {
  const [orderData, setOrderData] = useState<object>({});
  const [userStep, setUserStep] = useState<UserStep>(0);
  console.log(userStep);
  const handleUserStepUpdate: UpdateUserStep = () => {
    setUserStep((prev) => {
      if (prev === 0) {
        return 2;
      } else if (prev < 3) {
        return Math.round(prev + 1) as UserStep;
      } else {
        return 1;
      }
    });
  };
  const handleSetOrderData: SetOrderData = (val: object) => {
    setOrderData(val);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Layout userStep={userStep} updateUserStep={handleUserStepUpdate} setOrderData={handleSetOrderData} />}
      >
        <Route index element={<SplashScreen shouldTransition={false} />} />
        <Route path="/form_transition/:action" element={<FormTransition></FormTransition>}></Route>
        <Route path="/panini_creator" element={<PaniniCreator />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
