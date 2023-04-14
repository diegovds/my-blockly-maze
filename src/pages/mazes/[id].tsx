import * as C from "@/styles/Maze.styles";

import axios from "axios";
import { GetServerSideProps } from "next";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";

import { FullMaze } from "@/types/FullMaze";
import Seo from "@/components/Seo";
import MazePage from "@/components/MazePage";
import Iframe from "@/components/Iframe";

type Props = {
  maze: FullMaze;
};

const Maze = ({
  maze,
  maze: { id, name, url_image, username, created_at, executions, levels },
}: Props) => {
  const router = useRouter();
  const [runGame, setRunGame] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadGame = async () => {
    const dataMaze = new FormData();
    const execs = (executions + 1).toString();

    dataMaze.append("executions", execs);

    setLoading(true);

    await axios
      .put(
        `https://new-api-blockly-next-prisma-postgresql.vercel.app/api/mazes/${id}`,
        dataMaze
      )
      .then(() => {
        executions += 1;
        setRunGame(true);
      })
      .catch(() => {
        notify("erro", "Ocorreu um erro ao tentar executar o jogo.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const endGame = () => {
    window.scrollTo(0, 0);
    setRunGame(false);
    router.push(`/mazes/${id}`);
  };

  const toastConfig: ToastOptions<{}> = {
    position: "top-left",
    closeButton: false,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
  };

  const notify = (status: string, message?: string) => {
    status === "copy"
      ? toast.success("Link copiado com sucesso!", {
          autoClose: 2000,
          ...toastConfig,
        })
      : toast.error(message, {
          autoClose: 3000,
          ...toastConfig,
        });
  };

  return (
    <C.Container>
      <Seo
        title={`My BLOCKLY Maze | Página do jogo ${name}`}
        description={`Página do jogo ${name}, criado em ${created_at} por ${username}. Total de execuções ${executions}`}
        image={url_image}
      />
      {!runGame && (
        <>
          <MazePage
            maze={maze}
            notify={notify}
            loadGame={loadGame}
            loading={loading}
          />
          <ToastContainer />
        </>
      )}
      {runGame && (
        <Iframe
          link={`https://myblocklymaze-game.vercel.app/maze.html?levels=${levels}&url_image=${url_image}&reset=1`}
          redirect={endGame}
        />
      )}
    </C.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  try {
    const res = await axios.get(
      `https://new-api-blockly-next-prisma-postgresql.vercel.app/api/mazes/${id}`
    );

    const maze: FullMaze = res.data.data;

    return {
      props: {
        maze,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Maze;