import * as C from "./styles";

import { useRef } from "react";

import { useOnClickOutside } from "usehooks-ts";

type Props = {
  children: React.ReactNode;
  closeModal: (status: boolean) => void;
};

const MazeBuilderModal = ({ children, closeModal }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    closeModal(false);
  };

  useOnClickOutside(contentRef, handleClickOutside);

  return (
    <C.Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <C.Content ref={contentRef}>{children}</C.Content>
    </C.Overlay>
  );
};

export default MazeBuilderModal;
