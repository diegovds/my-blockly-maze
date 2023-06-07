import styled from "styled-components";

export const Container = styled.div`
  width: 70%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
  border-radius: 15px;
  padding: 20px;

  @media (max-width: 800px) {
    width: 97%;

    a {
      font-size: 0.8rem;
    }
  }
`;

export const H3 = styled.h3`
  margin-bottom: 30px;

  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;
