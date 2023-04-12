import { ReactElement } from "react";
import styles from "./Layout.module.css";

import Navbar from "../Navbar";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
