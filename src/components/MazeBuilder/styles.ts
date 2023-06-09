import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  width: fit-content;
  margin: 2rem auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
  overflow: hidden;
`;

export const Toolbar = styled(motion.div)`
  padding: 1rem;
  background-color: #add8e6;

  display: flex;
  justify-content: space-between;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

type LevelsProps = {
  $visibility: boolean;
};

export const Levels = styled.div<LevelsProps>`
  display: flex;
  gap: 0.5rem;

  visibility: ${({ $visibility }) => ($visibility ? "visible" : "hidden")};

  label {
    font-size: 1.17rem;
    align-self: center;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 2.25rem;
  }

  svg {
    font-size: 1rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    min-width: 100px;
  }
`;

export const Editor = styled(motion.div)`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

type CanvasWrapperProps = {
  $pointer: boolean;
  $saving: boolean;
};

export const CanvasWrapper = styled.div<CanvasWrapperProps>`
  width: 700px;
  min-height: 600px;
  position: relative;
  cursor: ${({ $pointer }) => ($pointer ? "pointer" : "auto")};
  pointer-events: ${({ $saving }) => ($saving ? "none" : "auto")};
`;

type BgCanvasProps = {
  $bgImage: boolean;
};

export const BgCanvas = styled.canvas<BgCanvasProps>`
  position: absolute;
  border-radius: 20px;
  border: ${({ $bgImage }) => ($bgImage ? "1px solid #f00" : "none")};
`;

export const MainCanvas = styled.canvas`
  position: absolute;
`;

export const Toolbox = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;

  background-color: #fff;
`;

export const InputData = styled.div`
  margin-bottom: 2rem;
  align-self: center;

  & div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & div:nth-child(2) {
    margin: 0.5rem 0;
  }

  button,
  label {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    /**
     As propriedades abaixo corrigem
     o bug de movimentação do texto
     do botão durante a animação
    */
    backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-font-smoothing: subpixel-antialiased;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  input[type="text"] {
    padding: 0.2em 0.3em;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 1rem;

    background-color: transparent;
    border-radius: 0%;
  }

  input[type="text"]:focus {
    outline: none;
  }

  input[type="file"] {
    visibility: hidden;
    width: 0;
    height: 0;
  }

  .inputError {
    text-align: center;
    font-size: smaller;
    color: #f00;
    font-weight: bold;
  }
`;
