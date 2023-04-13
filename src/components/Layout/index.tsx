import { ReactElement } from "react";
import * as C from "./styles";

import Navbar from "../Navbar";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <C.Main>{children}</C.Main>
    </>
  );
};

export default Layout;
