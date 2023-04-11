import Head from "next/head";

import * as C from "@/styles/Home";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <C.Main>
        <C.Container>
          <p>My Blockly Maze</p>
        </C.Container>
      </C.Main>
    </>
  );
}
