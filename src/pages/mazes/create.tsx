import MazeBuilder from "@/components/MazeBuilder";
import Seo from "@/components/Seo";
import { ToastOptions } from "@/components/ToastOptions";
import * as C from "@/styles/Create.styles";
import { ActionsNotification } from "@/types/ActionsNotification";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Balance from "react-wrap-balancer";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  token: string;
};

const Create = ({ token }: Props) => {
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1115px)");

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  /*const redirect = (mazeId?: string) => {
    router.push(`/mazes/${mazeId}`);
  };*/

  const insertMaze = async (
    gameName: string,
    imageFile: File,
    thumbnailFile: File,
    levels: any[]
  ) => {
    setSaving(true);
    setError(false);
    const data = new FormData();

    data.append("name", gameName);
    data.append("image", imageFile);
    data.append("image", thumbnailFile);
    data.append("levels", JSON.stringify(levels));

    await toast
      .promise(
        axios.post("/api/mazes", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: "Salvando jogo",
          success: "Jogo salvo com sucesso 👌",
          error: "Ocorreu um erro ao salvar o jogo 🤯",
        }
      )
      .then((response) => {
        let mazeData = response.data.data;

        const delay = setTimeout(async () => {
          router.push(`/mazes/${mazeData.id}`);
        }, 2000); // aguarda 2 segundos

        return () => {
          clearTimeout(delay);
        };
      })
      .catch(() => {
        setSaving(false);
        setError(true);
      });
  };

  const actionNotification = (type: ActionsNotification) => {
    if (type === "firstLevel") {
      toast.error("Não é possível excluir o primeiro nível");
    }

    if (type === "maxLevel") {
      toast.error("Não é possível criar mais níveis");
    }

    if (type === "imageManipulation") {
      toast.error("Erro de conversão do aquivo de imagem");
    }
  };

  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Criação"
        description={`Página de criação dos jogos de labirinto da plataforma My BLOCKLY Maze.`}
        path="/mazes/create"
      />
      <>
        {/**
            <Iframe
            link={`https://maze-game-builder-v2.vercel.app/index.html?token=${token}`}
            redirect={redirect}
          />
        */}
        {!mobile ? (
          <MazeBuilder
            insertMaze={insertMaze}
            actionNotification={actionNotification}
            saving={saving}
            error={error}
          />
        ) : (
          <C.Container>
            <Balance>
              <C.H3>
                Ops, a criação de novo jogo não está disponível para essa
                largura de tela
              </C.H3>
            </Balance>
            <Link href="/" className="btn">
              Voltar para a página inicial
            </Link>
          </C.Container>
        )}
        <Toaster toastOptions={ToastOptions} />
      </>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const sessionToken = await getToken({ req: ctx.req, secret, raw: true });

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
