import * as C from "./styles";

type Props = {
  openModal: boolean;
};

const DashBoardModal = ({ openModal }: Props) => {
  return (
    <C.Overlay display={openModal ? "flex" : "none"}>
      <C.Content>
        <h3>Deseja excluir o jogo name (Cód. code)?</h3>
        <p>Essa ação não pode ser desfeita!</p>
        <div className="div_btn">
          <button onClick={() => {}} className="btn btn-danger">
            Excluir
          </button>
          <button onClick={() => {}} className="btn">
            Cancelar
          </button>
        </div>
      </C.Content>
    </C.Overlay>
  );
};

export default DashBoardModal;
