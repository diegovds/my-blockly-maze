import { useRef } from "react";
import * as C from "./styles";

import { useClickAnyWhere } from "usehooks-ts";
import Balance from "react-wrap-balancer";
import { Maze } from "@/types/Maze";

type Props = {
  openModal: boolean;
  toDelete: (toDelete: boolean) => void;
  maze: Maze;
};

const DashBoardModal = ({ openModal, toDelete, maze }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useClickAnyWhere((e) => {
    if (e.target === overlayRef.current) {
      toDelete(false);
    }
  });

  return (
    <C.Overlay
      ref={overlayRef}
      display={openModal ? "flex" : "none"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.2 } }}
    >
      <C.Content
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
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
