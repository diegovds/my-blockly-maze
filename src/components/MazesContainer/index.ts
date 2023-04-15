import styled from "styled-components";

export const MazesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    9rem
  ); /* o auto-fit ajusta a quantidade de itens de acordo a largura do container */
  max-width: 97%;
  margin: 0 auto;
  justify-content: space-evenly;
  gap: 3rem 4.06rem;
  margin-bottom: 3rem;
`;
