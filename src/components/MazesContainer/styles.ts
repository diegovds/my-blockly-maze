import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    9.5rem
  ); /* o auto-fit ajusta a quantidade de itens de acordo a largura do container */
  max-width: 97%;
  margin: 0 auto;
  justify-content: space-evenly;
  gap: 3rem 3.47rem;
  margin-bottom: 3rem;
`;
