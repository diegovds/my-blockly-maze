import styles from "@/styles/Home.module.css";

import Seo from "@/components/Seo";
import { Maze } from "@/types/Maze";
import axios from "axios";

type Props = {
  mazes: Maze[];
};

const Home = ({ mazes }: Props) => {
  return (
    <div className={styles.container}>
      <Seo
        title="My Blockly Maze | Home"
        description={`Constam ${mazes.length} jogos na página inicial`}
        image=""
      />
      <h2>Jogos criados recentemente</h2>
      <ul>
        {mazes.map((maze) => (
          <li key={maze.id}>{maze.name}</li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
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
