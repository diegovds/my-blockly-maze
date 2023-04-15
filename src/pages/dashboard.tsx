import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

import { User } from "@/types/User";

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  return <h2>Dashboard de {user.name}</h2>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: { destination: "/login", permanent: true },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default Dashboard;
