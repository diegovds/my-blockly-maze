import { ReactElement } from "react";
import * as C from "./styles";

import Navbar from "../Navbar";
import { useSession } from "next-auth/react";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  const { status: sessionStatus } = useSession();

  return (
    <C.Container>
      {sessionStatus !== "loading" && (
        <>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </>
      )}
    </C.Container>
  );
};

export default Layout;
