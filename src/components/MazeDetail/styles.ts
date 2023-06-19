import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

type Props = {
  height?: number;
};

export const FlipCard = styled.div<Props>`
  /*
  width: 9.5rem;
  height: ${({ height }) => height + "px"};
  */
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
    transform: rotateY(90deg);
    animation-timing-function: ease-in;
    //opacity: 0;
  }

  40% {
    transform: rotateY(-20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: rotateY(10deg);
    //opacity: 1;
  }

  80% {
    transform: rotateY(-5deg);
  }

  100% { }
`;

type FlipCardBackProps = {
  $inView: boolean;
};

export const FlipCardBack = styled.div<FlipCardBackProps>`
  /*
  position: absolute;
  width: 100%;
  */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  width: 9.5rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.7rem 0.3rem;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
  word-wrap: break-word; /* com isso o conteúdo não vai vazar da div */
  box-sizing: border-box;
  /*
  transform: rotateY(180deg);
  */
  visibility: ${({ $inView }) => ($inView ? "visible" : "hidden")};
  animation: ${({ $inView }) => ($inView ? flipInY : undefined)} 1s;
  animation-delay: 0.3s;
  animation-fill-mode: both;

  img {
    width: 90%;
    height: auto;
    aspect-ratio: 7/6;
    margin-bottom: 0.4em;
  }

  h3 {
    max-width: 86%;
    margin-bottom: 0.4em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  time {
    font-style: italic;
    font-size: small;
    margin-bottom: 1.5em;

    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  svg {
    font-size: 1.25rem;
    color: #000;
  }

  a,
  #actions {
    width: 90%;
    font-size: 0.9em;
  }

  #actions {
    display: flex;
    gap: 0.5rem;
  }

  #actions button {
    flex: 1;
    margin-top: 0.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #actions button svg {
    width: 0.9em;
    height: 0.9em;
    color: #fff;
  }

  @media (max-width: 800px) {
    a,
    time,
    #actions {
      font-size: 0.8rem;
    }

    h3 {
      font-size: 1rem;
    }

    svg {
      font-size: 1rem;
    }

    #actions button svg {
      width: inherit;
      height: inherit;
    }
  }
`;
