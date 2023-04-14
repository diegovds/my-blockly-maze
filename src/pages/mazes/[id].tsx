import * as C from "@/styles/Maze.styles";

import axios from "axios";
import { GetServerSideProps } from "next";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, ToastOptions, toast } from "react-toastify";

import { FullMaze } from "@/types/FullMaze";
import Seo from "@/components/Seo";
import MazePage from "@/components/MazePage";

type Props = {
  maze: FullMaze;
};

const Maze = ({
  maze,
  maze: { name, url_image, username, created_at, executions },
}: Props) => {
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
      <MazePage maze={maze} notify={notify} />
      <ToastContainer />
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
