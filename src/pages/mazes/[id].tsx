import * as C from '@/styles/Maze.styles'

import axios from "axios";
import { GetServerSideProps } from "next";

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
  return (
    <C.Container>
      <Seo
        title={`My BLOCKLY Maze | Página do jogo ${name}`}
        description={`Página do jogo ${name}, criado em ${created_at} por ${username}. Total de execuções ${executions}`}
        image={url_image}
      />
      <MazePage maze={maze} />
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
