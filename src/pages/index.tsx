import Head from "next/head";

import * as C from "@/styles/Home.styles";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Blockly Maze | Home</title>
        <meta
          name="description"
          content="Página Home da plataforma My Blockly Maze"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <C.Container>
        <p>My Blockly Maze</p>
      </C.Container>
    </>
  );
}
