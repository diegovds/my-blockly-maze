import * as C from "./styles";

type Props = {
  closeModal: (status: boolean) => void;
};

const Instructions = ({ closeModal }: Props) => {
  return (
    <>
      <C.H3>Instruções para criar um jogo:</C.H3>
      <C.Ol>
        <C.Li>Inicialmente adicione uma imagem de fundo.</C.Li>
        <C.Li>
          A imagem adicionada fica posicionada no lado esquerdo da página e para
          elaborar os caminhos dos níveis do jogo é utilizada a seguinte lógica
          com o botão esquerdo do mouse:
        </C.Li>
        <C.Ul>
          <C.Li>Um clique - Área com caminho</C.Li>
          <C.Li>Dois cliques - Ponto de partida</C.Li>
          <C.Li>Três cliques - Ponto de chegada</C.Li>
        </C.Ul>
        <p>
          É possível adicionar e remover níveis clicando nos botões
          &quot;+&quot; e &quot;-&quot; no lado superior esquerdo.
        </p>
        <C.Li>Digite um nome para o seu jogo.</C.Li>
        <C.Li>
          Por fim, o jogo pode ser salvo ao clicar no botão &quot;Salvar&quot;.
        </C.Li>
      </C.Ol>
      <C.DivBtn>
        <button className="btn" onClick={() => closeModal(false)}>
          Fechar
        </button>
      </C.DivBtn>
    </>
  );
};

export default Instructions;
