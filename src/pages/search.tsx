import Seo from "@/components/Seo";
import * as C from "@/styles/Search.style";
import { mazeApi } from "@/libs/mazeApi";
import { Maze } from "@/types/Maze";
import { GetServerSideProps } from "next";
import MazeDetail from "@/components/MazeDetail";
import { MazesContainer } from "@/components/MazesContainer";

type Props = {
  q: string;
  mazes: Maze[];
};

const SearchPage = ({ q, mazes }: Props) => {
  return (
    <>
      <C.Container>
        <Seo
          title={`My BLOCKLY Maze | Busca por "${q}"`}
          description={`Página de busca na plataforma My BLOCKLY Maze.`}
          image=""
        />
        <h2>Pesquisa por &quot;{q}&quot;</h2>
        <p>
          Quantidade de jogos encontrados: <strong>{mazes.length}</strong>
        </p>
        {mazes && mazes.length === 0 && (
          <p className="p_a">
            Não foram encontrados jogos a partir da sua pesquisa...
          </p>
        )}
      </C.Container>
      {mazes && mazes.length > 0 && (
        <>
          <MazesContainer>
            {mazes.map((maze) => (
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

  let filteredMazes: Maze[] = [];

  const { getAllMazes } = mazeApi();
  const mazes: Maze[] = await getAllMazes();

  mazes.forEach((item) => {
    if (item.name.toLowerCase().includes((q as string).toLowerCase())) {
      filteredMazes.push(item);
    }
    if (
      item.code.toLowerCase().includes((q as string).toLowerCase()) &&
      filteredMazes.find((filtered) => filtered.id === item.id) === undefined
    ) {
      filteredMazes.push(item);
    }
  });

  return {
    props: {
      q,
      mazes: filteredMazes,
    },
  };
};

export default SearchPage;
