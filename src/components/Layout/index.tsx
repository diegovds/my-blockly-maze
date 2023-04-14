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
    <C.Container loading={sessionStatus === "loading" ? 'hidden' : 'visible'}>
      <header>
        <Navbar />
      </header>
      <C.Main>{children}</C.Main>
    </C.Container>
  );
};

export default Layout;
