import * as C from "../styles/Dashboard.styles";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { userApi } from "@/libs/userApi";
import { MazesUser } from "@/types/MazesUser";
import DashboardHeader from "@/components/DashboardHeader";
import MazesContainer from "@/components/MazesContainer";
import MazeDetail from "@/components/MazeDetail";
import { Maze } from "@/types/Maze";
import Seo from "@/components/Seo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import DashBoardModal from "@/components/DashBoardModal";
import { AnimatePresence } from "framer-motion";

type Props = {
  userData: MazesUser;
};

const Dashboard = ({ userData }: Props) => {
  const [mazeDelete, setMazeDelete] = useState<Maze | undefined>(undefined);
  const [mazeGames, setMazeGames] = useState<Maze[]>(userData.mazes);
  const [openModal, setOpenModal] = useState(false);

  const toDelete = async (toDelete: boolean) => {
    if (toDelete && mazeDelete) {
      setOpenModal(false);

      await toast
        .promise(
          axios.delete(`api/mazes/${mazeDelete.id}`),
          {
            pending: "Processando solicitação",
            success: "Jogo excluído com sucesso 👌",
            error: "Ocorreu um erro ao tentar excluir o jogo 🤯",
          },
          {
            position: "top-left",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
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
        <MazesContainer>
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
      <ToastContainer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: { destination: "/login", permanent: true },
    };
  }

  const { getUser } = userApi();
  const userData: MazesUser = await getUser(session.user.id);

  return {
    props: {
      userData,
    },
  };
};

export default Dashboard;
