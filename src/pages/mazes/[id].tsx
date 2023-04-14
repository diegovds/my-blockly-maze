import axios from "axios";
import { GetServerSideProps } from "next";

import { FullMaze } from "@/types/FullMaze";
import Seo from "@/components/Seo";

type Props = {
  maze: FullMaze;
};

const MazePage = ({
  maze: { name, levels, url_image, username, created_at, executions },
}: Props) => {
  return (
    <div>
      <Seo
        title={`My BLOCKLY Maze | Página do jogo ${name}`}
        description={`Página do jogo ${name}, criado em ${created_at} por ${username}. Total de execuções ${executions}`}
        image={url_image}
      />
      <h2>Página do jogo {name}</h2>
      <p>Quantidade de níveis: {JSON.parse(levels).length}</p>
    </div>
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

export default MazePage;
