import * as C from "@/styles/Maze.styles";

import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { toast } from "react-hot-toast";

import Iframe from "@/components/Iframe";
import MazePage from "@/components/MazePage";
import Seo from "@/components/Seo";
import { mazeApi } from "@/libs/mazeApi";
import { FullMaze } from "@/types/FullMaze";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  maze: FullMaze;
  myblocklymazeAdmin: string;
};

const Maze = ({ maze, myblocklymazeAdmin }: Props) => {
  const {
    id,
    name,
    urlImage,
    urlThumbnail,
    username,
    createdAt,
    executions,
    levels,
  } = maze;
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

      //setLoading(true);
      setRunGame(true);

      await axios
        .patch(`/api/mazes/${id}`, dataMaze, {
          headers: { "myblocklymaze-admin": myblocklymazeAdmin },
        })
        .then(() => {
          maze.executions += 1;
          //setRunGame(true);
        })
        .catch(() => {
          //notify("erro", "Ocorreu um erro ao tentar executar o jogo.");
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

  const notify = (status: string, message?: string) => {
    status === "copy"
      ? toast.success("Link copiado com sucesso!")
      : toast.error(message!);
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
        image={urlThumbnail}
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
  const myblocklymazeAdmin = process.env.MYBLOCKLYMAZE!;
  const { id } = query;
  const { getMaze } = mazeApi();

  try {
    const res = await getMaze(id as string);

    if (res) {
      const maze = res;

      return {
        props: {
          maze,
          myblocklymazeAdmin,
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
