import styled from "styled-components";

export const Container = styled.div`
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);
  border-radius: 15px;
  padding: 20px;

  & p:nth-child(3) {
    margin-bottom: 30px;
  }
`;

export const H2 = styled.h2`
  font-size: 70px;
`;

export const P = styled.p`
  color: #aaa;
  margin-bottom: 5px;
`;
