import { Outlet } from "react-router-dom";
import { SetOrderData, UpdateUserStep, UserStep } from "../App";
import styles from "./Layout.module.css";

export type LayoutContext = {
  userStep: UserStep;
  setOrderData: SetOrderData;
  updateUserStep: UpdateUserStep;
};

export default function Layout(props: LayoutContext) {
  return (
    <div className={styles.siteWrapper}>
      <Outlet context={{ ...props }}></Outlet>
    </div>
  );
}
