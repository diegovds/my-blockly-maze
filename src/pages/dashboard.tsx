import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { userApi } from "@/libs/userApi";
import { MazesUser } from "@/types/MazesUser";

type Props = {
  userData: MazesUser;
};

const Dashboard = ({ userData }: Props) => {
  return <h2>Dashboard de {userData.username}</h2>;
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
