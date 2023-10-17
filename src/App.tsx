import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import "./style/App.css";

function App() {
  const [order, setOrder] = useState({});
  return (
    <div>
      <SplashScreen order={Object.keys(order).length > 0 ? true : false}></SplashScreen>
    </div>
  );
}

export default App;
