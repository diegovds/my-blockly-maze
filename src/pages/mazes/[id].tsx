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

type Props = {
  maze: FullMaze;
};

const Maze = ({
  maze,
  maze: { name, url_image, username, created_at, executions },
}: Props) => {
  const [runGame, setRunGame] = useState(false);

  const loadGame = () => {
    /** fazer a requisição para contar a nova execução */

    maze.executions += 1;
    setRunGame(true);
  };

  const endGame = () => {
    window.scrollTo(0, 0);
    setRunGame(false);
    //navigate(`/mazes/${id}`);
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

  const notify = (status: string) => {
    status === "copy"
      ? toast.success("Link copiado com sucesso!", {
          autoClose: 2000,
          ...toastConfig,
        })
      : toast.error(
          "A execução do jogo não está disponível para essa largura de tela.",
          {
            autoClose: 3000,
            ...toastConfig,
          }
        );
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
          <MazePage maze={maze} notify={notify} loadGame={loadGame} />
          <ToastContainer />
        </>
      )}
      {runGame && (
        <Iframe
          link={`https://myblocklymaze-game.vercel.app/maze.html?levels=${maze.levels}&url_image=${maze.url_image}&reset=1`}
          redirect={endGame}
        />
      )}
    </C.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const res = await axios.get(
    `https://new-api-blockly-next-prisma-postgresql.vercel.app/api/mazes/${id}`
  );

  const maze: FullMaze = res.data.data;

  return {
    props: {
      maze,
    },
  };
};

export default Maze;
