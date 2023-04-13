import * as C from "@/styles/Home.styles";

import Seo from "@/components/Seo";
import { Maze } from "@/types/Maze";
import axios from "axios";
import { useSession } from "next-auth/react";

type Props = {
  mazes: Maze[];
};

const Home = ({ mazes }: Props) => {
  const { data: session } = useSession();

  return (
    <C.Container>
      <Seo
        title="My Blockly Maze | Home"
        description={`Constam ${mazes.length} jogos na página inicial`}
        image=""
      />
      <h2>Jogos criados recentemente</h2>
      {session && <h3>Olá {session?.user.name}</h3>}
      <ul>
        {mazes.map((maze) => (
          <li key={maze.id}>{maze.name}</li>
        ))}
      </ul>
    </C.Container>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(
    "https://new-api-blockly-next-prisma-postgresql.vercel.app/api/mazes"
  );

  const mazes: Maze[] = res.data.data;

  return {
    props: {
      mazes,
    },
  };
};

export default Home;
