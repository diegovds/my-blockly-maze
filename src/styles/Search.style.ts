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
    border-bottom: 2px solid #ccc;
    width: 97%;
    word-wrap: break-word; /* com isso o conteúdo não vai vazar */
    margin-bottom: 2rem;
  }

  .p_a {
    margin-top: 7rem;
    color: #999;
    width: auto;
    border-bottom: none;
  }

  @media (max-width: 800px) {
    p,
    .p_a {
      font-size: 0.8rem;
    }

    h2 {
      font-size: 1.2rem;
    }
  }
`;
