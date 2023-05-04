import { Fredoka } from "next/font/google";
import { ReactElement, useEffect, useState } from "react";
import * as C from "./styles";

import Navbar from "../Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useInterval } from "usehooks-ts";
import Loading from "../Loading";

type Props = {
  children: ReactElement;
};

const fredoka = Fredoka({ weight: "400", subsets: ["latin"], display: "swap" });

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { status: sessionStatus } = useSession();
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useInterval(
    () => {
      // Your custom logic here
      setTimeElapsed(timeElapsed + 1);
    },
    // Delay in milliseconds or null to stop it
    loading ? 1000 : null
  );

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
      setTimeElapsed(0);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
      setTimeElapsed(0);
    });
    router.events.on("routeChangeError", () => {
      setLoading(false);
      setTimeElapsed(0);
    });
    return () => {
      router.events.off("routeChangeStart", () => {
        setLoading(true);
        setTimeElapsed(0);
      });
      router.events.off("routeChangeComplete", () => {
        setLoading(false);
        setTimeElapsed(0);
      });
      router.events.off("routeChangeError", () => {
        setLoading(false);
        setTimeElapsed(0);
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
      timeElapsed={timeElapsed}
    >
      <style jsx global>{`
        * {
          font-family: ${fredoka.style.fontFamily};
        }
      `}</style>
      <header>
        <Navbar openMenu={openMenu} />
      </header>
      <C.Main load={loading ? true : false}>{children}</C.Main>
      {timeElapsed > 3 && <Loading />}
    </C.Container>
  );
};

export default Layout;
