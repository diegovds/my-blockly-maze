import styled from "styled-components";

export const Container = styled.div`
  margin: 2rem;
`;

export const Toolbar = styled.div`
  background-color: #add8e6;
`;

export const Editor = styled.div`
  display: flex;
  min-height: 600px;
`;

export const CanvasWrapper = styled.div`
  flex: 2;
  position: relative;
`;

export const BgCanvas = styled.canvas`
  position: absolute;
`;

export const MainCanvas = styled.canvas`
  position: absolute;
`;

export const Toolbox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  background-color: #add8e6;

  label {
    width: fit-content;
  }

  input[type="file"] {
    visibility: hidden;
    width: 0;
    height: 0;
  }
`;
