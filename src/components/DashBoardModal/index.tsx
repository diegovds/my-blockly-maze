import { useRef } from "react";
import * as C from "./styles";

import { useClickAnyWhere } from "usehooks-ts";
import { Maze } from "@/types/Maze";

type Props = {
  openModal: boolean;
  toDelete: (toDelete: boolean) => void;
  maze: Maze;
};

const DashBoardModal = ({ openModal, toDelete, maze }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useClickAnyWhere((e) => {
    if (e.target === overlayRef.current && e.target !== contentRef.current) {
      toDelete(false);
    }
  });

  return (
    <C.Overlay ref={overlayRef} display={openModal ? "flex" : "none"}>
      <C.Content ref={contentRef}>
        <h3>
          Deseja excluir o jogo {maze.name} (Cód. {maze.code})?
        </h3>
        <p>Essa ação não pode ser desfeita!</p>
        <div className="div_btn">
          <button
            onClick={() => {
              toDelete(true);
            }}
            className="btn btn-danger"
          >
            Excluir
          </button>
          <button
            onClick={() => {
              toDelete(false);
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
