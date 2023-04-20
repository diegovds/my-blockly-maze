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

type Props = {
  userData: MazesUser;
};

const deleteMazeGame = (maze: Maze) => {
  console.table(maze);
};

const Dashboard = ({ userData }: Props) => {
  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Dashboard"
        description={`Página dashboard da plataforma My BLOCKLY Maze.`}
        path="/dashboard"
      />
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
