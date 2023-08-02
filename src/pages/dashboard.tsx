import * as C from "../styles/Dashboard.styles";

import { GetServerSideProps } from "next";

import DashboardHeader from "@/components/DashboardHeader";
import DashBoardModal from "@/components/DashBoardModal";
import MazeDetail from "@/components/MazeDetail";
import MazesContainer from "@/components/MazesContainer";
import Seo from "@/components/Seo";
import { userApi } from "@/libs/userApi";
import { Maze } from "@/types/Maze";
import { MazesUser } from "@/types/MazesUser";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { getToken } from "next-auth/jwt";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  userData: MazesUser;
  sessionToken: string;
};

const Dashboard = ({ userData, sessionToken }: Props) => {
  const [mazeDelete, setMazeDelete] = useState<Maze | undefined>(undefined);
  const [mazeGames, setMazeGames] = useState<Maze[]>(userData.mazes);
  const [openModal, setOpenModal] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const handleLoadMore = async () => {
    if (!loading) {
      setLoading(true);

      await axios
        .get(`/api/users/${userData.id}?page=${pageCount + 1}`, {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        })
        .then((response) => {
          if (response.data.mazes.length > 0) {
            setMazeGames([...mazeGames, ...response.data.mazes]);
          } else {
            setShowMore(false);
          }
        })
        .catch(() => {});

      setLoading(false);
      setPageCount(pageCount + 1);
    }
  };

  const toDelete = async (toDelete: boolean) => {
    if (toDelete && mazeDelete) {
      setOpenModal(false);

      await toast
        .promise(
          axios.delete(`api/mazes/${mazeDelete.id}`, {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }),
          {
            loading: "Processando solicitação",
            success: "Jogo excluído com sucesso 👌",
            error: "Ocorreu um erro ao tentar excluir o jogo 🤯",
          }
        )
        .then(() => {
          const delay = setTimeout(async () => {
            let index = mazeGames.map((maze) => maze.id).indexOf(mazeDelete.id);

            mazeGames.splice(index, 1);

            setMazeDelete(undefined);
            setMazeGames([...mazeGames]);
          }, 2000); // aguarda 2 segundos

          return () => {
            clearTimeout(delay);
          };
        })
        .catch(() => {
          setMazeDelete(undefined);
        });
    } else {
      setMazeDelete(undefined);
      setOpenModal(false);
    }
  };

  const deleteMazeGame = async (maze: Maze) => {
    setMazeDelete(maze);
    setOpenModal(true);
  };

  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Dashboard"
        description={`Página dashboard da plataforma My BLOCKLY Maze.`}
        path="/dashboard"
      />
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {mazeDelete && openModal && (
          <DashBoardModal toDelete={toDelete} maze={mazeDelete} />
        )}
      </AnimatePresence>
      <DashboardHeader username={userData.username} amount={mazeGames.length} />
      {userData && mazeGames.length > 0 && (
        <MazesContainer
          btnText={
            showMore && !loading
              ? "Carregar mais jogos"
              : loading
              ? "Carregando..."
              : "Todos os jogos foram carregados"
          }
          handleLoadMore={mazeGames.length % 18 ? undefined : handleLoadMore}
          disabled={!showMore || loading}
        >
          {mazeGames.map((maze) =>
            maze.id !== mazeDelete?.id ? (
              <MazeDetail
                key={maze.id}
                maze={maze}
                deleteMazeGame={deleteMazeGame}
                dashboard={true}
                disabled={mazeDelete !== undefined ? true : false}
              />
            ) : (
              <MazeDetail
                key={maze.id}
                maze={maze}
                deleteMazeGame={deleteMazeGame}
                dashboard={true}
                loading={true}
              />
            )
          )}
        </MazesContainer>
      )}
      {userData && mazeGames.length === 0 && (
        <C.NoMazes>
          <p>Não foram encontrados jogos criados por você 😢</p>
        </C.NoMazes>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const secret = process.env.NEXTAUTH_SECRET;
  const session = await getToken({ req: ctx.req, secret });
  const sessionToken = await getToken({ req: ctx.req, secret, raw: true });

  if (!session?.sub) {
    return {
      redirect: { destination: "/login", permanent: true },
    };
  }

  const { getUser } = userApi();
  try {
    const userData: MazesUser = await getUser(session.sub, 1);

    return {
      props: {
        userData,
        sessionToken,
      },
    };
  } catch (error) {
    return {
      redirect: { destination: "/logout", permanent: true },
    };
  }
};

export default Dashboard;
