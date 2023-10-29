import { useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import PaniniCreator from "./pages/PaniniCreator";
import SplashScreenLayout from "./pages/SplashScreenLayout";

export type SetOrderData = (val: object) => void;

function App() {
  const [orderData, setOrderData] = useState<object>({});
  const handleSetOrderData: SetOrderData = (val: object) => {
    setOrderData(val);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout setOrderData={handleSetOrderData} />}>
        <Route
          index
          element={
            <SplashScreenLayout
              shouldTransition={false}
              defaultPos={true}
              navTo="/panini_creator"
              title="Panini Creator"
              actionDesc="begin"
            />
          }
        />
        <Route path="/panini_creator" element={<PaniniCreator navTo="/success" />}></Route>
        <Route
          path="/success"
          element={
            <SplashScreenLayout
              shouldTransition={true}
              defaultPos={false}
              navTo="/panini_creator"
              title="Panini ordered"
              actionDesc="start again"
            ></SplashScreenLayout>
          }
        ></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
