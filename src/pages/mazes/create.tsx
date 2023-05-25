import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Iframe from "@/components/Iframe";
import Seo from "@/components/Seo";
import { useIsFirstRender, useMediaQuery } from "usehooks-ts";
import * as C from "@/styles/Create.styles";
import { useState, useEffect } from "react";
import { ToastOptions } from "@/components/ToastOptions";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  token: string;
};

const Create = ({ token }: Props) => {
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1115px)");
  const isFirst = useIsFirstRender();

  useEffect(() => {
    const notify = (message: string) => {
      toast.error(message);
    };

    if (isMobile && !isFirst) {
      notify(
        "A criação de novo jogo não está disponível para essa largura de tela."
      );
    }

    setMobile(isMobile);
  }, [isMobile, isFirst]);

  const redirect = (mazeId?: string) => {
    router.push(`/mazes/${mazeId}`);
  };

  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Criação"
        description={`Página de criação dos jogos de labirinto da plataforma My BLOCKLY Maze.`}
        path="/mazes/create"
      />
      <>
        <C.Container hidden={mobile}>
          <Iframe
            link={`https://maze-game-builder-v2.vercel.app/index.html?token=${token}`}
            redirect={redirect}
          />
        </C.Container>
        <Toaster toastOptions={ToastOptions} />
      </>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sessionToken = ctx.req.cookies["next-auth.session-token"];

  if (!sessionToken) {
    return {
      redirect: { destination: "/login", permanent: true },
    };
  }

  return {
    props: {
      token: sessionToken,
    },
  };
};

export default Create;
