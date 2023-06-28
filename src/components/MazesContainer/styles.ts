import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    9.5rem
  ); /* o auto-fill ajusta a quantidade de itens de acordo a largura do container */
  max-width: 97%;
  margin: 0 auto;
  justify-content: space-evenly;
  gap: 3rem 3.47rem;
  margin-bottom: 3rem;

  @media (max-width: 425px) {
    grid-template-columns: repeat(auto-fill, 45%);
    justify-content: center;
    gap: 1.5rem;
  }

  @media (max-width: 768px) and (min-width: 426px) {
    grid-template-columns: repeat(auto-fill, 20%);
    justify-content: center;
    gap: 2rem;
  }
`;

export const BtnDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;

  button {
    min-width: 17rem;
  }

  @media (max-width: 800px) {
    button {
      font-size: 0.8rem;
    }
  }
`;
