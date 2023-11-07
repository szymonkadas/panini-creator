import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";
import PaniniCreator from "./PaniniCreator";

export default function SplashScreenLayout(props: SplashScreenLayoutProps) {
  // download file on success section
  const location = useLocation();
  const imageUrl = location?.state?.imageUrl;
  const fileName = location?.state?.fileName;

  const download = (url: string, filename: string) => {
    if (url && filename) {
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${filename}.png`);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    download(imageUrl, fileName);
  }, [imageUrl, fileName]);
  // end of download section
  return (
    <>
      <SplashScreen {...props}></SplashScreen>
      <PaniniCreator navTo={props.navTo}></PaniniCreator>
    </>
  );
}
