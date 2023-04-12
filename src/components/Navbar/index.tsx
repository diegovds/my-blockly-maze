import Link from "next/link";
import styles from "./Navbar.module.css";

import { signOut, useSession } from "next-auth/react";
import Button from "../Button";

const Navbar = () => {
  const { data: session } = useSession();

  const onClick = () => {
    signOut();
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.li}>
          <Link href="/login">Entrar</Link>
        </li>
        <li className={styles.li}>
          <Link href="/register">Cadastrar</Link>
        </li>
      </ul>
      {session && <Button onClick={onClick} title="Sair" />}
      {session && <p>Olá {session.user.name}</p>}
    </nav>
  );
};

export default Navbar;
