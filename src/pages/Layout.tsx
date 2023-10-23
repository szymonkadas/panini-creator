import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

type LayoutProps = {
  isPaniniOrdered: boolean;
};

export type LayoutContext = {
  isPaniniOrdered: boolean;
};

export default function Layout(props: LayoutProps) {
  return (
    <div className={styles.siteWrapper}>
      <Outlet context={{ isPaniniOrdered: props.isPaniniOrdered }}></Outlet>
    </div>
  );
}
