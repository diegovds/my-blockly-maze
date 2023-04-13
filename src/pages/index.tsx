import * as C from "@/styles/Home.styles";

import Seo from "@/components/Seo";
import { Maze } from "@/types/Maze";
import axios from "axios";
import MazeDetail from "@/components/MazeDetail";
import { MazesContainer } from "@/components/MazesContainer";

type Props = {
  mazes: Maze[];
};

const Home = ({ mazes }: Props) => {
  return (
    <C.Container>
      <Seo
        title="My BLOCKLY Maze | Home"
        description={`Página inicial da plataforma My BLOCKLY Maze.`}
        image=""
      />
      <C.H2>Jogos criados recentemente:</C.H2>
      <MazesContainer>
        {mazes && mazes.map((maze) => <MazeDetail key={maze.id} maze={maze} />)}
      </MazesContainer>
    </C.Container>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(
    "https://new-api-blockly-next-prisma-postgresql.vercel.app/api/mazes"
  );

  const mazes: Maze[] = res.data.data;

  return {
    props: {
      mazes,
    },
  };
};

export default Home;
