import { ReactElement } from "react";
import * as C from "./styles";

import Navbar from "../Navbar";
import { useSession } from "next-auth/react";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  const { status: sessionStatus } = useSession();

  if (sessionStatus === "loading") {
    return (
      <C.LoadingContainer>
        <h1>Carregando!!!</h1>
      </C.LoadingContainer>
    );
  }

  return (
    <C.Container>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </C.Container>
  );
};

export default Layout;
