import { ReactElement } from "react";
import styles from "./Layout.module.css";

import Navbar from "../Navbar";
import { useSession } from "next-auth/react";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  const { status: sessionStatus } = useSession();

  return (
    <div>
      {sessionStatus !== "loading" && (
        <>
          <header>
            <Navbar />
          </header>
          <main className={styles.main}>{children}</main>
        </>
      )}
    </div>
  );
};

export default Layout;
