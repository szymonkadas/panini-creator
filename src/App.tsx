import { useState } from "react";
import "./App.css";
import SplashScreen from "./components/SplashScreen";

function App() {
  // wyraźniejszy kształt w późniejszych wersjach. Możliwa przebudowa
  const [orderData, setOrderData] = useState({});
  return (
    <div>
      <SplashScreen isPaniniOrdered={Object.keys(orderData).length > 0 ? true : false}></SplashScreen>
    </div>
  );
}

export default App;
