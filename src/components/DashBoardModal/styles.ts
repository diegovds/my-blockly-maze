import styled from "styled-components";
import { motion } from "framer-motion";

type OverlayProps = {
  display: string;
};

export const Overlay = styled(motion.div)<OverlayProps>`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;

  display: ${({ display }) => display};
  align-items: center;
  justify-content: center;
`;

export const Content = styled(motion.div)`
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
  //box-shadow: rgba(204, 204, 204, 0.375) 0px 0px 20px;
  box-shadow: rgb(204, 204, 204) 0px 0px 4px;

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

  @media (max-width: 800px) {
    width: 97%;

    h3 {
      font-size: 1rem;
    }

    button,
    p {
      font-size: 0.8rem;
    }

    button {
      min-width: 5.625rem;
    }
  }
`;
