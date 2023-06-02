import * as C from "./styles";

import { CloseModalFunction } from "@/types/CloseModalFunction";
import Balance from "react-wrap-balancer";

type Props = {
  closeModal: CloseModalFunction;
  levelsError: number[];
};

const LevelsError = ({ closeModal, levelsError }: Props) => {
  let moreErrors = levelsError.length === 1 ? false : true;
  let text = `Confira se ${moreErrors ? "os níveis" : "o nível"} abaixo ${
    moreErrors ? "possuem" : "possui"
  } um ponto de partida, um ponto de chegada e algum caminho. Você pode clicar no número do nível para ser direcionada a ele.`;

  return (
    <C.Container>
      <C.H3>
        <Balance>{text}</Balance>
      </C.H3>
      <C.Ul>
        <label>{!moreErrors ? "Nível" : "Níveis"}:</label>
        {levelsError.map((levelError, index) => (
          <C.Li key={index}>
            <button
              className="btn btn-danger"
              onClick={() => closeModal(false, undefined, levelError)}
            >
              {levelError}
            </button>
          </C.Li>
        ))}
      </C.Ul>
      <button className="btn" onClick={() => closeModal(false)}>
        Fechar
      </button>
    </C.Container>
  );
};

export default LevelsError;
