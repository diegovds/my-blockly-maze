import styled from "styled-components";

export const Container = styled.div`
  width: fit-content;
  margin: 2rem auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
`;

export const Toolbar = styled.div`
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
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    min-width: 100px;
  }
`;

export const Editor = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

type CanvasWrapperProps = {
  $pointer: boolean;
};

export const CanvasWrapper = styled.div<CanvasWrapperProps>`
  width: 700px;
  min-height: 600px;
  position: relative;
  cursor: ${({ $pointer }) => ($pointer ? "pointer" : "auto")};
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

  label {
    width: fit-content;
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
