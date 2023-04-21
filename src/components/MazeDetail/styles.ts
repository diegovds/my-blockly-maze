import styled from "styled-components";

export const MazeDiv = styled.div`
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
`;
