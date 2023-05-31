import { CloseModalFunction } from "@/types/CloseModalFunction";
import * as C from "./styles";

type Props = {
  closeModal: CloseModalFunction;
};

const RemoveLevel = ({ closeModal }: Props) => {
  return (
    <C.Container>
      <C.H3>Deseja excluir o último nível?</C.H3>
      <C.BtnContainer>
        <button
          className="btn btn-danger"
          onClick={() => closeModal(false, true)}
        >
          Excluir
        </button>
        <button className="btn" onClick={() => closeModal(false)}>
          Cancelar
        </button>
      </C.BtnContainer>
    </C.Container>
  );
};

export default RemoveLevel;
