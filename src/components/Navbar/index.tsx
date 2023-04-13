import Link from "next/link";
import * as C from "./styles";

import { signOut, useSession } from "next-auth/react";
import { Btn } from "../Button";

const Navbar = () => {
  const { data: session } = useSession();

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
      {session && <Btn onClick={() => signOut()}>Sair</Btn>}
      {session && <p>Olá {session.user.name}</p>}
    </C.Nav>
  );
};

export default Navbar;
