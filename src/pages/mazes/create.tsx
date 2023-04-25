import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { User } from "@/types/User";
import { useRouter } from "next/router";
import Iframe from "@/components/Iframe";
import Seo from "@/components/Seo";
import { useIsFirstRender, useMediaQuery } from "usehooks-ts";
import * as C from "@/styles/Create.styles";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, ToastOptions, toast } from "react-toastify";

type Props = {
  user: User;
};

const Create = ({ user: { id } }: Props) => {
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1115px)");
  const isFirst = useIsFirstRender();

  useEffect(() => {
    const toastConfig: ToastOptions<{}> = {
      position: "top-left",
      closeButton: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
    };

    const notify = (message: string) => {
      toast.error(message, {
        autoClose: 3000,
        ...toastConfig,
      });
    };

    if (isMobile && !isFirst) {
      notify(
        "A execução do jogo não está disponível para essa largura de tela."
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
            link={`https://maze-game-builder-v2.vercel.app/index.html?userId=${id}`}
            redirect={redirect}
          />
        </C.Container>
        <ToastContainer />
      </>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: { destination: "/login", permanent: true },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default Create;
