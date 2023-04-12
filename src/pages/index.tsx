import Head from "next/head";

import * as C from "@/styles/Home.styles";
import Seo from "@/components/Seo";

export default function Home() {
  return (
    <>
      <Seo
        title="My Blockly Maze | Home"
        description="Página Home da plataforma My Blockly Maze"
        image=""
      />
      <C.Container>
        <p>My Blockly Maze</p>
      </C.Container>
    </>
  );
}
