import styled from "styled-components";

export const NoMazes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  p {
    color: #aaa;
  }

  @media (max-width: 800px) {
    p {
      font-size: 0.8rem;
    }
  }
`;
