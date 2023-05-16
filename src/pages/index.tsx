import * as C from "@/styles/Home.styles";

import Seo from "@/components/Seo";
import { Maze } from "@/types/Maze";
import { mazeApi } from "@/libs/mazeApi";
import MazeDetail from "@/components/MazeDetail";
import MazesContainer from "@/components/MazesContainer";

import Link from "next/link";

type Props = {
  mazes: Maze[];
};

const Home = ({ mazes }: Props) => {
  return (
    <C.Container visible={mazes && mazes.length > 0 ? "visible" : undefined}>
      <Seo
        title="My BLOCKLY Maze | Home"
        description={`My Blockly Maze é uma plataforma de criação e compartilhamento de jogos de labirinto, nela os usuários também podem jogar suas criações e as da comunidade. Os jogos utilizam programação baseada em blocos para concluir os desafios.`}
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
