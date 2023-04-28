import styled from "styled-components";

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
`;

export const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 2rem 7rem;
  margin: 2rem 0;
`;

export const Section = styled.section`
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1.5rem;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);

  p {
    margin-top: 0.8rem;
    line-height: 1.5rem;
    color: #444;
    text-align: justify;
  }

  @media (max-width: 600px) {
    width: 95%;
  }

  @media (max-width: 800px) and (min-width: 600px) {
    width: 80%;
  }
`;
