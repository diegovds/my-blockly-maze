import { ReactElement, useEffect, useState } from "react";
import * as C from "./styles";

import Navbar from "../Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  children: ReactElement;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
      router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [router.events]);

  return (
    <C.Container loading={sessionStatus === "loading" ? "hidden" : "visible"}>
      <header>
        <Navbar />
      </header>
      <C.Main loading={loading ? "hidden" : "visible"}>{children}</C.Main>
    </C.Container>
  );
};

export default Layout;
