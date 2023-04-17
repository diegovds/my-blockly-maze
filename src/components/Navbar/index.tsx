import * as C from "./styles";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaPuzzlePiece } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";

const Navbar = () => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const [query, setQuery] = useState("");

  const verifyActiveLink = (loopPath: string) => {
    if (loopPath === "/" && router.pathname !== "/") {
      return null;
    }

    if (router.pathname.indexOf(loopPath) === 0) {
      return true;
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    if (!query) {
      return;
    }

    router.push(`/search?q=${query}`);
    target.reset();
    setQuery("");
  };

  return (
    <C.Nav>
      <Link href="/" className="brand">
        <FaPuzzlePiece />
        <div id="labelBrand">My <span>Blockly</span> Maze</div>
      </Link>
      <C.Form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Nome ou código do jogo..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>
          <HiSearch />
        </button>
      </C.Form>
      <C.Ul>
        <C.Li>
          <Link href={"/"} className={verifyActiveLink("/") ? "active" : ""}>
            Home
          </Link>
        </C.Li>
        {sessionStatus !== "authenticated" && (
          <C.Li>
            <Link
              href={"/login"}
              className={verifyActiveLink("/login") ? "active" : ""}
            >
              Entrar
            </Link>
          </C.Li>
        )}
        {sessionStatus !== "authenticated" && (
          <C.Li>
            <Link
              href={"/register"}
              className={verifyActiveLink("/register") ? "active" : ""}
            >
              Cadastrar
            </Link>
          </C.Li>
        )}
        {sessionStatus === "authenticated" && (
          <C.Li>
            <Link
              href={"/mazes/create"}
              className={verifyActiveLink("/mazes/create") ? "active" : ""}
            >
              Criar novo jogo
            </Link>
          </C.Li>
        )}
        {sessionStatus === "authenticated" && (
          <C.Li>
            <Link
              href={"/dashboard"}
              className={verifyActiveLink("/dashboard") ? "active" : ""}
            >
              Dashboard
            </Link>
          </C.Li>
        )}
        <C.Li>
          <Link
            href={"/about"}
            className={verifyActiveLink("/about") ? "active" : ""}
          >
            Sobre
          </Link>
        </C.Li>
        {sessionStatus === "authenticated" && (
          <C.Li>
            <button onClick={() => signOut()}>Sair</button>
          </C.Li>
        )}
      </C.Ul>
      <button id="toggleMenu"></button>
    </C.Nav>
  );
};

export default Navbar;
