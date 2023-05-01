import styled from "styled-components";
import { motion } from "framer-motion";

export const Coontainer = styled.div`
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) and (orientation: portrait) {
    min-height: auto;
  }
`;
export const Maze = styled(motion.div)`
  margin: 2.5rem 0rem 2.5rem 0rem;
  width: 90%;
  min-height: fit-content;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);

  @media (max-width: 800px) and (orientation: portrait) {
    flex-direction: column;
  }
`;

export const Img = styled(motion.div)`
  flex: 1;
  padding: 2.5rem 0rem 2.5rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 87%;
    height: auto;
    aspect-ratio: 7/6;
  }

  span {
    width: 87%;
    aspect-ratio: 7/6;
    border-radius: 10px;
    overflow: hidden;
  }

  @media (max-width: 800px) and (orientation: portrait) {
    width: 100%;
    min-height: fit-content;

    padding: 0;
    padding-top: 1.7rem;
  }
`;

export const Informations = styled(motion.div)`
  flex: 1;
  padding: 2.5rem 0rem 2.5rem 0rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-wrap: break-word; /* com isso o conteúdo não vai vazar da div */

  button {
    margin-top: 1rem;
    min-width: 10.774rem;
  }

  h2,
  p {
    max-width: 80%;
    text-align: center;
  }

  h2 {
    margin-bottom: 2rem;
  }

  .p_data {
    margin: 0.5rem 0rem;
  }

  .p_a {
    color: #aaa;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 0.96rem;
  }

  #copy {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #copy svg {
    width: 1em;
    height: 1em;
    margin-left: 0.5rem;
  }

  @media (max-width: 800px) and ((orientation: portrait) or (orientation: landscape)) {
    width: 100%;
    min-height: fit-content;

    padding: 0;
    padding: 0.75rem 0rem 1.7rem 0rem;

    h2 {
      font-size: 1.2rem;
      margin: 0;
      margin-bottom: 0.5rem;
    }

    .p_a,
    .p_data {
      font-size: 0.8rem;
      margin: 0;
      margin-bottom: 0.5rem;
    }

    .p_a {
      margin: 0.25rem 0 0.75rem 0;
    }

    button {
      margin: 0;
      font-size: 0.8rem;
    }

    #copy {
      margin: 0;
      margin-top: 0.5rem;
    }
  }
`;
