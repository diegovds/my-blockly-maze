import Seo from "@/components/Seo";
import * as C from "@/styles/About.styles";

const About = () => {
  return (
    <>
      <Seo
        title="My BLOCKLY Maze | Sobre"
        description={`My Blockly Maze é uma plataforma de criação e compartilhamento de jogos de labirinto, nela os usuários também podem jogar suas criações e as da comunidade. Os jogos utilizam programação baseada em blocos para concluir os desafios.`}
        path="/about"
      />
      <C.Container>
        <h2>Sobre:</h2>
        <C.SectionContainer>
          <C.Section>
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

          <C.Section>
            <h3>Maze Builder</h3>
            <p>
              É a ferramenta de criação dos jogos, nela é possível elaborar um
              jogo de labirinto com imagem de fundo e níveis de desafio
              personalizados.
            </p>
          </C.Section>

          <C.Section>
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
