import MazeDetail from "@/components/MazeDetail";
import MazesContainer from "@/components/MazesContainer";
import Seo from "@/components/Seo";
import { mazeApi } from "@/libs/mazeApi";
import * as C from "@/styles/Search.style";
import { Maze } from "@/types/Maze";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

type Props = {
  q: string;
  mazes: Maze[];
};

const SearchPage = ({ q, mazes }: Props) => {
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [mazesList, setMazesList] = useState(mazes);

  useEffect(() => {
    setShowMore(true);
    setLoading(false);
    setPageCount(1);
    setMazesList(mazes);
  }, [mazes]);

  const handleLoadMore = async () => {
    if (!loading) {
      setLoading(true);

      await axios
        .get(`/api/mazes/search?q=${q}&page=${pageCount + 1}`)
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
    <>
      <C.Container>
        <Seo
          title={`My BLOCKLY Maze | Busca por "${q}"`}
          description={`Página de busca na plataforma My BLOCKLY Maze.`}
          path={`/search?q=${q}`}
        />
        <h2>Pesquisa por &quot;{q}&quot;</h2>
        <p>
          Quantidade de jogos encontrados: <strong>{mazesList.length}</strong>
        </p>
        {mazesList && mazesList.length === 0 && (
          <p className="p_a">
            Não foram encontrados jogos a partir da sua pesquisa...
          </p>
        )}
      </C.Container>
      {mazesList && mazesList.length > 0 && (
        <>
          <MazesContainer
            btnText={
              showMore && !loading
                ? `Pesquisar mais jogos com "${q}"`
                : loading
                ? "Carregando..."
                : "Pesquisa concluída"
            }
            handleLoadMore={handleLoadMore}
            disabled={!showMore || loading}
          >
            {mazesList.map((maze) => (
              <MazeDetail key={maze.id} maze={maze} />
            ))}
          </MazesContainer>
        </>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query;

  if (!q) {
    return {
      notFound: true,
    };
  }

  const { getSearchMazes } = mazeApi();
  const mazes: Maze[] = await getSearchMazes(q as string, 1);

  return {
    props: {
      q,
      mazes,
    },
  };
};

export default SearchPage;
