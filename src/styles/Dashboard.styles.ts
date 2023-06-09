import styled from "styled-components";

export const NoMazes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(50vh - 70.94px); /*  70.94px é a altura da navbar */

  p {
    color: #aaa;
  }

  @media (max-width: 800px) {
    p {
      font-size: 0.8rem;
    }
  }
`;
