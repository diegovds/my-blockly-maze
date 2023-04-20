import * as C from "../styles/Dashboard.styles";

import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { userApi } from "@/libs/userApi";
import { MazesUser } from "@/types/MazesUser";
import DashboardHeader from "@/components/DashboardHeader";
import { MazesContainer } from "@/components/MazesContainer";
import MazeDetail from "@/components/MazeDetail";
import { Maze } from "@/types/Maze";
import Seo from "@/components/Seo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DashBoardModal from "@/components/DashBoardModal";

type Props = {
  userData: MazesUser;
};

const Dashboard = ({ userData }: Props) => {
  const deleteMazeGame = async (maze: Maze) => {
    /*await toast.promise(
      axios.delete(`api/mazes/${maze.id}`),
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
    );*/
  };

  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Dashboard"
        description={`Página dashboard da plataforma My BLOCKLY Maze.`}
        path="/dashboard"
      />
      <DashBoardModal openModal={false}/>
      <DashboardHeader
        username={userData.username}
        amount={userData.mazes.length}
      />
      {userData && userData.mazes.length > 0 && (
        <MazesContainer>
          {userData.mazes.map((maze) => (
            <MazeDetail
              key={maze.id}
              maze={maze}
              dashboard={true}
              deleteMazeGame={deleteMazeGame}
            />
          ))}
        </MazesContainer>
      )}
      {userData && userData.mazes.length === 0 && (
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
