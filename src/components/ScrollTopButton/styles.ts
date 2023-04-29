import styled from "styled-components";

type Props = {
  showButton: boolean;
};

export const TopButton = styled.div<Props>`
  background-color: #add8e6;
  box-sizing: border-box;
  position: fixed;
  right: 20px;
  bottom: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 25%;
  cursor: pointer;
  z-index: 1;
  transition: 0.4s ease-in-out;
  opacity: ${({ showButton }) => (showButton ? 1 : 0)};
  scale: ${({ showButton }) => (showButton ? 1 : 0)};
  visibility: ${({ showButton }) => (showButton ? "visible" : "hidden")};
  rotate: -180deg;
  transform: ${({ showButton }) => (showButton ? "rotate(540deg)" : undefined)};

  &:hover {
    background-color: #94cfe3;
  }

  svg {
    width: 50px;
    height: 50px;
    padding: 10px;
    color: #000;
  }
`;
