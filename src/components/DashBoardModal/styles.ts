import styled from "styled-components";

type OverlayProps = {
  display: string;
};

export const Overlay = styled.div<OverlayProps>`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: ${({ display }) => display};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: #fff;
  padding: 1em 0em;
  border-radius: 20px;
  width: 40%;
  min-height: 12rem;
  word-wrap: break-word; /* com isso o conteúdo não vai vazar da div */

  button {
    min-width: 7.625rem;
  }

  h3 {
    max-width: 80%;
  }

  .div_btn {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
  }
`;
