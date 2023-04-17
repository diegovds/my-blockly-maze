import styled from "styled-components";

export const Coontainer = styled.div`
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Maze = styled.div`
  margin: 2.5rem 0rem 2.5rem 0rem;
  width: 90%;
  min-height: fit-content;
  display: flex;
  flex-direction: row;

  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
`;

export const Img = styled.div`
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
`;

export const Informations = styled.div`
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
`;
