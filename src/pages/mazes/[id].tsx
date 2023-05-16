import * as C from "@/styles/Maze.styles";

import axios from "axios";
import { GetServerSideProps } from "next";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useState } from "react";

import { FullMaze } from "@/types/FullMaze";
import Seo from "@/components/Seo";
import MazePage from "@/components/MazePage";
import Iframe from "@/components/Iframe";
import { mazeApi } from "@/libs/mazeApi";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  maze: FullMaze;
};

const Maze = ({ maze }: Props) => {
  const { id, name, urlImage, username, createdAt, executions, levels } = maze;
  const [runGame, setRunGame] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1115px)");

  const loadGame = async () => {
    if (isMobile) {
      notify(
        "erro",
        "A execução do jogo não está disponível para essa largura de tela."
      );
    } else {
      const dataMaze = new FormData();
      const execs = (executions + 1).toString();

      dataMaze.append("executions", execs);

      setLoading(true);

      await axios
        .put(`/api/mazes/${id}`, dataMaze)
        .then(() => {
          maze.executions += 1;
          setRunGame(true);
        })
        .catch(() => {
          notify("erro", "Ocorreu um erro ao tentar executar o jogo.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const endGame = () => {
    window.scrollTo(0, 0);
    setRunGame(false);
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
        description={`O jogo ${name} foi criado por ${username} em ${createdAt}, possui ${
          JSON.parse(levels).length
        } ${
          JSON.parse(levels).length > 1 ? "níveis" : "nível"
        } e foi executado ${executions} ${
          executions > 1 || executions === 0 ? "vezes" : "vez"
        }.`}
        image={urlImage}
        path={`/mazes/${id}`}
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
          link={`https://myblocklymaze-game.vercel.app/maze.html?levels=${levels}&url_image=${urlImage}&reset=1`}
          redirect={endGame}
        />
      )}
    </C.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const { getMaze } = mazeApi();

  try {
    const res = await getMaze(id as string);

    if (res) {
      const maze = res;

      return {
        props: {
          maze,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Maze;
