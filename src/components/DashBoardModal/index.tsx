import { Dispatch, SetStateAction, useRef } from "react";
import * as C from "./styles";

import { useClickAnyWhere } from "usehooks-ts";

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const DashBoardModal = ({ openModal, setOpenModal }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickAnyWhere((e) => {
    if (e.target === overlayRef.current && e.target !== contentRef.current) {
      setOpenModal(false);
    }
  });

  return (
    <C.Overlay ref={overlayRef} display={openModal ? "flex" : "none"}>
      <C.Content ref={contentRef}>
        <h3>Deseja excluir o jogo name (Cód. code)?</h3>
        <p>Essa ação não pode ser desfeita!</p>
        <div className="div_btn">
          <button onClick={() => {}} className="btn btn-danger">
            Excluir
          </button>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="btn"
          >
            Cancelar
          </button>
        </div>
      </C.Content>
    </C.Overlay>
  );
};

export default DashBoardModal;
