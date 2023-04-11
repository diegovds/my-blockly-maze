import Link from "next/link";
import * as C from "./styles";

const Navbar = () => {
  return (
    <C.Nav>
      <C.Ul>
        <C.Li>
          <Link href="/">Home</Link>
        </C.Li>
        <C.Li>
          <Link href="/login">Entrar</Link>
        </C.Li>
        <C.Li>
          <Link href="/register">Cadastrar</Link>
        </C.Li>
      </C.Ul>
    </C.Nav>
  );
};

export default Navbar;
