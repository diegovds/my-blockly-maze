import styled from "styled-components";

export const Container = styled.div`
  width: 1050px;
  margin: 2rem auto;
`;

export const Toolbar = styled.div`
  padding: 1rem;
  background-color: #add8e6;

  display: flex;
  justify-content: space-between;
`;

type LevelsProps = {
  visibility: boolean;
};

export const Levels = styled.div<LevelsProps>`
  display: flex;
  gap: 0.5rem;

  visibility: ${({ visibility }) => (visibility ? "visible" : "hidden")};
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
  min-height: 600px;
`;

export const CanvasWrapper = styled.div`
  width: 700px;
  position: relative;
`;

export const BgCanvas = styled.canvas`
  position: absolute;
`;

export const MainCanvas = styled.canvas`
  position: absolute;
`;

export const Toolbox = styled.div`
  width: 350px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;

  background-color: #fff;

  label {
    width: fit-content;
  }

  input {
    padding: 0.2em 0.3em;
    border: 2px solid #ccc;

    background-color: transparent;
    border-radius: 0%;
  }

  input:focus {
    outline: none;
  }

  input[type="file"] {
    visibility: hidden;
    width: 0;
    height: 0;
  }

  & div:nth-child(1) {
    margin: 2rem 0 1rem 0;
    align-self: center;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & div:nth-child(2) {
    margin: 1rem 0;
    align-self: center;
  }
`;
