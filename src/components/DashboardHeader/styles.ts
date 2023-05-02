import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h2 {
    padding: 1rem 0rem;
  }

  p {
    padding-bottom: 1rem;
    color: #aaa;
    border-bottom: 2px solid #ccc;
    width: 97%;
    word-wrap: break-word; /* com isso o conteúdo não vai vazar */
    margin-bottom: 2rem;
  }

  @media (max-width: 800px) {
    h2 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.8rem;
    }
  }
`;

export const WelcomeBanner = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 97%;
  min-height: 5rem;
  background-color: #add8e6;
  margin-bottom: 2rem;
  border-radius: 15px;
  word-wrap: break-word; /* com isso o conteúdo não vai vazar da div */
  padding: 0.8rem;

  & p:nth-child(1),
  & p:nth-child(2) {
    padding-bottom: 0.8rem;
  }

  p {
    max-width: 100%;
    color: #000;
  }

  a:hover {
    color: #000;
    opacity: 0.7;
    text-decoration: underline;
  }

  @media (max-width: 800px) {
    p {
      font-size: 0.8rem;
    }
  }
`;
