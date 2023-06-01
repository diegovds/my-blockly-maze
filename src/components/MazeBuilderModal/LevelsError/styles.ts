import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    min-width: 8rem;
  }
`;

export const H3 = styled.h3`
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const Ul = styled.ul`
  display: flex;

  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Li = styled.li`
  list-style-position: inside;
  color: #f00;
  font-weight: bold;
`;
