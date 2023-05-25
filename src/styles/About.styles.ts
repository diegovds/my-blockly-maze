import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  max-width: 97%;
  margin: 0 auto;

  h2 {
    padding: 1rem 0rem;
    text-align: center;
    border-bottom: 2px solid #ccc;
    width: 97%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }

  @media (max-width: 800px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`;

export const SectionContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 2rem 7rem;
  margin: 2rem 0;
`;

export const Section = styled(motion.section)`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);

  p {
    margin-top: 0.8rem;
    line-height: 160%; /** para títulos o recomendado é 120%
    letter-spacing: -0.75px; */
    text-align: justify;
  }

  @media (max-width: 600px) {
    width: 95%;
  }

  @media (max-width: 950px) and (min-width: 600px) {
    width: 80%;
  }

  @media (max-width: 800px) {
    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;
