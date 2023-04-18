import styled, { css } from "styled-components";

export const Hamburger = styled.div`
  display: block;
  height: 19px;
  width: 26px;
  z-index: 4;
`;

type LabelProps = {
  toggleHamburger: boolean;
};

export const Label = styled.label<LabelProps>`
  cursor: pointer;
  position: relative;
  display: block;
  height: 100%;
  width: 100%;

  span:nth-child(1) {
    top: 0;
  }

  span:nth-child(2) {
    top: 8px;
  }

  span:nth-child(3) {
    top: 16px;
  }

  ${({ toggleHamburger }) =>
    toggleHamburger &&
    css`
      span:nth-child(1) {
        transform: rotate(-45deg);
        /*transform: rotate(-405deg);
        transform: rotate(-135deg);*/
        top: 8px;
      }

      span:nth-child(2) {
        transform: scaleX(0);
      }

      span:nth-child(3) {
        transform: rotate(45deg);
        /*transform: rotate(405deg);
        transform: rotate(135deg);*/
        top: 8px;
      }
    `}
`;

export const Span = styled.span`
  background-color: ${({ color }) => color};
  position: absolute;
  display: block;
  height: 3px;
  width: 100%;
  border-radius: 30px;
  transition: 0.4s ease-in-out;
  /*transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transition: all 0.2s;*/
`;
