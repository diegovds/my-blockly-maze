import { ReactElement, useEffect, useState } from "react";
import * as C from "./styles";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "../Footer";
import Loading from "../Loading";
import Navbar from "../Navbar";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
    router.events.on("routeChangeError", () => {
      setLoading(false);
    });
    return () => {
      router.events.off("routeChangeStart", () => {
        setLoading(true);
      });
      router.events.off("routeChangeComplete", () => {
        setLoading(false);
      });
      router.events.off("routeChangeError", () => {
        setLoading(false);
      });
    };
  }, [router.events]);

  const openMenu = (showMenu: boolean) => {
    setHidden(showMenu);
  };

  return (
    <C.Container
      positionContainer={hidden}
      load={sessionStatus === "loading" ? true : false}
      timeElapsed={loading ? true : false}
    >
      <header>
        <Navbar openMenu={openMenu} />
      </header>
      <C.Main load={loading && router.pathname !== "/search" ? true : false}>
        {children}
      </C.Main>
      <Footer />
      {loading && <Loading />}
    </C.Container>
  );
};

export default Layout;
