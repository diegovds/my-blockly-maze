import Seo from "@/components/Seo";
import * as C from "@/styles/About.styles";
import { useSession } from "next-auth/react";

const About = () => {
  const { status: sessionStatus } = useSession();

  const SectionContainerAnimate = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const ItemSide = {
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const ItemCenter = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Sobre"
        description={`My Blockly Maze é uma plataforma de criação e compartilhamento de jogos de labirinto, nela os usuários também podem jogar suas criações e as da comunidade. Os jogos utilizam programação baseada em blocos para concluir os desafios.`}
        path="/about"
      />
      <C.Container>
        <h2>Sobre:</h2>
        <C.SectionContainer
          variants={SectionContainerAnimate}
          initial="hidden"
          animate={sessionStatus === "loading" ? undefined : "visible"}
        >
          <C.Section
            variants={{
              hidden: { x: -20, opacity: 0 },
              ...ItemSide,
            }}
          >
            <h3>My Blockly Maze</h3>
            <p>
              É uma plataforma de criação e compartilhamento de jogos de
              labirinto, nela os usuários também podem jogar suas criações e as
              da comunidade.
              <br />
              Os jogos utilizam programação baseada em blocos para concluir os
              desafios.
            </p>
          </C.Section>

          <C.Section variants={ItemCenter}>
            <h3>Maze Builder</h3>
            <p>
              É a ferramenta de criação dos jogos, nela é possível elaborar um
              jogo de labirinto com imagem de fundo e níveis de desafio
              personalizados.
            </p>
          </C.Section>

          <C.Section
            variants={{
              hidden: { x: 20, opacity: 0 },
              ...ItemSide,
            }}
          >
            <h3>Maze Game</h3>
            <p>
              Uma versão modificada do Maze Blockly Games desenvolvido pelo
              Google. Tem como função executar os jogos personalizados.
            </p>
          </C.Section>
        </C.SectionContainer>
      </C.Container>
    </>
  );
};

export default About;
