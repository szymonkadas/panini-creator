import { useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import Layout from "./pages/Layout";
import PaniniCreatorLayout from "./pages/PaniniCreatorLayout";
function App() {
  const [orderData, setOrderData] = useState({});
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout isPaniniOrdered={Object.keys(orderData).length > 0 ? true : false} />}>
        <Route index element={<SplashScreen />} />
        <Route path="/panini_creator" element={<PaniniCreatorLayout />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
