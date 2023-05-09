import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

type Props = {
  height: number;
};

export const FlipCard = styled.div<Props>`
  width: 9.5rem;
  height: ${({ height }) => height + "px"};
  background-color: transparent;
  perspective: 1000px;
`;

export const FlipCardInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 1s;
  transform-style: preserve-3d;
`;

export const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
`;

const flipInY = keyframes`
  0% {
    transform: perspective(1000px) rotate3d(0, 1, 0, 90deg);
    animation-timing-function: ease-in;
    //opacity: 0;
  }

  40% {
    transform: perspective(1000px) rotate3d(0, 1, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(1000px) rotate3d(0, 1, 0, 10deg);
    //opacity: 1;
  }

  80% {
    transform: perspective(1000px) rotate3d(0, 1, 0, -5deg);
  }

  100% {
    transform: perspective(1000px);
  }
`;

type FlipCardBackProps = {
  inView: boolean;
};

export const FlipCardBack = styled.div<FlipCardBackProps>`
  /*
  position: absolute;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  */
  width: 9.5rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
  word-wrap: break-word; /* com isso o conteúdo não vai vazar da div */
  box-sizing: border-box;
  /*
  transform: rotateY(180deg);
  */
  visibility: ${({ inView }) => (inView ? "visible" : "hidden")};
  animation: ${({ inView }) => (inView ? flipInY : undefined)} 1s;
  animation-delay: 0.3s;
  animation-fill-mode: both;

  img {
    width: 90%;
    height: auto;
    aspect-ratio: 7/6;
    margin-bottom: 0.4em;
  }

  span {
    width: 90%;
    aspect-ratio: 7/6;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 0.4em;
  }

  h3 {
    margin-bottom: 0.4em;
  }

  p {
    font-style: italic;
    font-size: small;
    margin-bottom: 1.5em;
  }

  a,
  button {
    width: 90%;
    font-size: 0.9em;
  }

  button {
    margin-top: 0.5em;
  }

  @media (max-width: 800px) {
    a,
    p,
    button {
      font-size: 0.8rem;
    }

    h3 {
      font-size: 1rem;
    }
  }
`;
