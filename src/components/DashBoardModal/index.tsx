import { useRef } from "react";
import * as C from "./styles";

import { Maze } from "@/types/Maze";
import Balance from "react-wrap-balancer";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  toDelete: (toDelete: boolean) => void;
  maze: Maze;
};

const DashBoardModal = ({ toDelete, maze }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    toDelete(false);
  };

  useOnClickOutside(contentRef, handleClickOutside);

  return (
    <C.Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <C.Content ref={contentRef}>
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
