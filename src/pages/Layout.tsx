import { Outlet } from "react-router-dom";
import { SetOrderData } from "../App";
import styles from "./Layout.module.css";

export type LayoutContext = {
  setOrderData: SetOrderData;
};

export default function Layout(props: LayoutContext) {
  return (
    <div className={styles.siteWrapper}>
      <Outlet context={{ ...props }}></Outlet>
    </div>
  );
}
