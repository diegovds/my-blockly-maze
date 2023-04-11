import { ReactElement } from "react";
import * as C from "./styles";

import Navbar from "../Navbar";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
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
