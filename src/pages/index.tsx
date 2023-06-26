import * as C from "@/styles/Home.styles";

import MazeDetail from "@/components/MazeDetail";
import MazesContainer from "@/components/MazesContainer";
import Seo from "@/components/Seo";
import { mazeApi } from "@/libs/mazeApi";
import { Maze } from "@/types/Maze";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

type Props = {
  mazes: Maze[];
};

const Home = ({ mazes }: Props) => {
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [mazesList, setMazesList] = useState(mazes);

  const handleLoadMore = async () => {
    if (!loading) {
      setLoading(true);

      await axios
        .get(`/api/mazes?page=${pageCount + 1}`)
        .then((response) => {
          if (response.data.data.length > 0) {
            setMazesList([...mazesList, ...response.data.data]);
          } else {
            setShowMore(false);
          }
        })
        .catch(() => {});

      setLoading(false);
      setPageCount(pageCount + 1);
    }
  };

  return (
    <C.Container
      visible={mazesList && mazesList.length > 0 ? "visible" : undefined}
    >
      <Seo
        title="My BLOCKLY Maze | Home"
        description={`My Blockly Maze é uma plataforma de criação e compartilhamento de jogos de labirinto, nela os usuários também podem jogar suas criações e as da comunidade. Os jogos utilizam programação baseada em blocos para concluir os desafios.`}
        path="/"
      />
      {mazesList && mazesList.length > 0 && (
        <>
          <C.H2>Jogos criados recentemente:</C.H2>
          <MazesContainer
            btnText={
              showMore && !loading
                ? "Carregar mais jogos"
                : loading
                ? "Carregando..."
                : "Todos os jogos foram carregados"
            }
            handleLoadMore={mazesList.length % 18 ? undefined : handleLoadMore}
            disabled={!showMore || loading}
          >
            {mazesList.map((maze) => (
              <MazeDetail key={maze.id} maze={maze} />
            ))}
          </MazesContainer>
        </>
      )}
      {mazesList && mazesList.length === 0 && (
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

  const mazes: Maze[] = await getAllMazes(1);

  return {
    props: {
      mazes,
    },
  };
};

export default Home;
