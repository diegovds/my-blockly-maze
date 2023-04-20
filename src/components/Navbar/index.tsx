import * as C from "./styles";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { FaPuzzlePiece } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { isMobileOnly } from "react-device-detect";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  openMenu: (showMenu: boolean) => void;
};

const Navbar = ({ openMenu }: Props) => {
  const checkbox = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const [query, setQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1115px)");

  useEffect(() => {
    if (isMobile) {
      openMenu(showMenu);
    } else {
      openMenu(false);
    }
  }, [isMobile, openMenu, showMenu]);

  const verifyActiveLink = (loopPath: string) => {
    if (loopPath === "/" && router.pathname !== "/") {
      return null;
    }

    if (router.pathname.indexOf(loopPath) === 0) {
      return true;
    }

    return null;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setShowMenu(true) : setShowMenu(false);
  };

  const handleHamburger = () => {
    if (checkbox.current && isMobile) {
      checkbox.current.click();
    }
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
        <div id="labelBrand">
          My <span>Blockly</span> Maze
        </div>
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
      <C.Ul
        showMenu={showMenu ? "show" : "hidden"}
        isMobileOnly={isMobileOnly ? "true" : undefined}
      >
        <C.Li>
          <Link
            href={"/"}
            className={verifyActiveLink("/") ? "active" : ""}
            onClick={() => handleHamburger()}
          >
            Home
          </Link>
        </C.Li>
        {sessionStatus !== "authenticated" && (
          <C.Li>
            <Link
              href={"/login"}
              className={verifyActiveLink("/login") ? "active" : ""}
              onClick={() => handleHamburger()}
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
              onClick={() => handleHamburger()}
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
              onClick={() => handleHamburger()}
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
              onClick={() => handleHamburger()}
            >
              Dashboard
            </Link>
          </C.Li>
        )}
        <C.Li>
          <Link
            href={"/about"}
            className={verifyActiveLink("/about") ? "active" : ""}
            onClick={() => handleHamburger()}
          >
            Sobre
          </Link>
        </C.Li>
        {sessionStatus === "authenticated" && (
          <C.Li>
            <button
              onClick={() => {
                signOut();
                handleHamburger();
              }}
            >
              Sair
            </button>
          </C.Li>
        )}
      </C.Ul>
      <div className="menuMobile">
        <input
          type="checkbox"
          id="checkbox_menu"
          name="grid"
          onChange={handleChange}
          ref={checkbox}
        />
        <label htmlFor="checkbox_menu">
          <span style={{ backgroundColor: "#000" }}></span>
          <span style={{ backgroundColor: "#000" }}></span>
          <span style={{ backgroundColor: "#000" }}></span>
        </label>
      </div>
    </C.Nav>
  );
};

export default Navbar;
