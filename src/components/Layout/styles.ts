import styled from "styled-components";

type ContainerProps = {
  loading: string;
};

export const Container = styled.div<ContainerProps>`
  visibility: ${(props) => props.loading};
`;

export const Main = styled.main`
  min-height: calc(100vh - 70.94px); /*  70.94px é a altura da navbar */
`;
