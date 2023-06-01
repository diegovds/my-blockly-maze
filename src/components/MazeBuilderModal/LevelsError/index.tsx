import * as C from "./styles";

import { CloseModalFunction } from "@/types/CloseModalFunction";
import Balance from "react-wrap-balancer";

type Props = {
  closeModal: CloseModalFunction;
  levelsError: number[];
};

const LevelsError = ({ closeModal, levelsError }: Props) => {
  let levels = levelsError.length === 1 ? "o nível" : "os níveis";
  let have = levelsError.length === 1 ? "possui" : "possuem";

  return (
    <C.Container>
      <C.H3>
        <Balance>
          {`Confira se ${levels} abaixo ${have} um ponto de partida, um ponto de
          chegada e algum caminho!`}
        </Balance>
      </C.H3>
      <C.Ul>
        {levelsError.map((levelError, index) => (
          <C.Li key={index}>{levelError}</C.Li>
        ))}
      </C.Ul>
      <button className="btn" onClick={() => closeModal(false)}>
        Fechar
      </button>
    </C.Container>
  );
};

export default LevelsError;
