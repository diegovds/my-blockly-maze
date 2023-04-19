import * as C from "@/styles/Home.styles";

import Seo from "@/components/Seo";
import { Maze } from "@/types/Maze";
import { mazeApi } from "@/libs/mazeApi";
import MazeDetail from "@/components/MazeDetail";
import { MazesContainer } from "@/components/MazesContainer";

import Link from "next/link";

type Props = {
  mazes: Maze[];
};

const Home = ({ mazes }: Props) => {
  return (
    <C.Container visible={mazes && mazes.length > 0 ? "visible" : undefined}>
      <Seo
        title="My BLOCKLY Maze | Home"
        description={`Página inicial da plataforma My BLOCKLY Maze.`}
        path="/"
      />
      {mazes && mazes.length > 0 && (
        <>
          <C.H2>Jogos criados recentemente:</C.H2>
          <MazesContainer>
            {mazes.map((maze) => (
              <MazeDetail key={maze.id} maze={maze} />
            ))}
          </MazesContainer>
        </>
      )}
      {mazes && mazes.length === 0 && (
        <C.NoMazes>
          <p>Não foram encontrados jogos</p>
          <Link href="/mazes/create" className="btn">
            Criar primeiro jogo
          </Link>
        </C.NoMazes>
      )}
    </C.Container>
  );
};

export const getServerSideProps = async () => {
  const { getAllMazes } = mazeApi();

  const mazes: Maze[] = await getAllMazes();

  return {
    props: {
      mazes,
    },
  };
};

export default Home;
