import styled, { keyframes } from "styled-components";

export const MazeDetailContainer = styled.div`
  background-color: transparent;
  perspective: 1000px;
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

type MazeDetailProps = {
  $inView: boolean;
};

export const MazeDetail = styled.div<MazeDetailProps>`
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  width: 100%;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.7rem;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
  word-wrap: break-word; /* com isso o conteúdo não vai vazar da div */
  box-sizing: border-box;
  visibility: ${({ $inView }) => ($inView ? "visible" : "hidden")};
  animation: ${({ $inView }) => ($inView ? flipInY : undefined)} 1s;
  animation-delay: 0.3s;
  animation-fill-mode: both;
`;

export const ImgDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  aspect-ratio: 7/6;
  margin-bottom: 0.4em;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const InfoDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

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
  button {
    width: 100%;
    font-size: 0.9em;
  }

  button {
    margin-top: 0.5em;
  }

  @media (max-width: 800px) {
    a,
    time,
    button {
      font-size: 0.8rem;
    }

    h3 {
      font-size: 1rem;
    }

    svg {
      font-size: 1rem;
    }
  }
`;
