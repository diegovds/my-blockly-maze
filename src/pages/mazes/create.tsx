import MazeBuilder from "@/components/MazeBuilder";
import Seo from "@/components/Seo";
import * as C from "@/styles/Create.styles";
import { ActionsNotification } from "@/types/ActionsNotification";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Balance from "react-wrap-balancer";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  token: string;
};

type ImageProps = {
  image: string;
  urlImage: string;
};

const Create = ({ token }: Props) => {
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1115px)");

  let image: ImageProps = { image: "", urlImage: "" };
  let thumbnail: ImageProps = { image: "", urlImage: "" };

  useEffect(() => {
    setMobile(isMobile);
  }, [isMobile]);

  const uploadImage = async (image: File) => {
    const data = new FormData();
    data.append("image", image);

    return axios
      .post<ImageProps>("/api/upload", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch(() => {});
  };

  const insertMaze = async (
    gameName: string,
    imageFile: File,
    thumbnailFile: File,
    levels: any[]
  ) => {
    setSaving(true);
    setError(false);

    const toastLoading = toast.loading("Salvando jogo");

    await Promise.allSettled([
      uploadImage(imageFile),
      uploadImage(thumbnailFile),
    ])
      .then((res) => {
        if (res[0].status === "fulfilled" && res[0].value) {
          image = res[0].value;
        }

        if (res[1].status === "fulfilled" && res[1].value) {
          thumbnail = res[1].value;
        }
      })
      .catch(() => {});

    const data = new FormData();

    data.append("name", gameName);
    data.append("image", image.image);
    data.append("urlImage", image.urlImage);
    data.append("thumbnail", thumbnail.image);
    data.append("urlThumbnail", thumbnail.urlImage);
    data.append("levels", JSON.stringify(levels));

    await axios
      .post("/api/mazes", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let mazeData = response.data.data;

        toast.dismiss(toastLoading);
        toast.success("Jogo salvo com sucesso 👌");

        router.push(`/mazes/${mazeData.id}`);
      })
      .catch(() => {
        toast.dismiss(toastLoading);
        toast.error("Ocorreu um erro ao salvar o jogo 🤯");
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
