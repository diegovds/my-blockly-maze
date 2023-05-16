import { useRef } from "react";
import * as C from "./styles";

import { useClickAnyWhere } from "usehooks-ts";
import Balance from "react-wrap-balancer";
import { Maze } from "@/types/Maze";

type Props = {
  toDelete: (toDelete: boolean) => void;
  maze: Maze;
};

const DashBoardModal = ({ toDelete, maze }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useClickAnyWhere((e) => {
    if (e.target === overlayRef.current) {
      toDelete(false);
    }
  });

  return (
    <C.Overlay
      ref={overlayRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <C.Content onClick={(e) => e.stopPropagation()}>
        <h3>
          <Balance>
            Deseja excluir o jogo {maze.name} (Cód. {maze.code})?
          </Balance>
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
