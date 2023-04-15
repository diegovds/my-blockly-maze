import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { User } from "@/types/User";
import { useRouter } from "next/router";
import Iframe from "@/components/Iframe";

type Props = {
  user: User;
};

const Create = ({ user: { id } }: Props) => {
  const router = useRouter();

  const redirect = (mazeId?: string) => {
    router.push(`/mazes/${mazeId}`);
  };

  return (
    <Iframe
      link={`https://mazegamebuilder.vercel.app/index.html?userId=${id}`}
      redirect={redirect}
    />
  );
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

export default Create;
