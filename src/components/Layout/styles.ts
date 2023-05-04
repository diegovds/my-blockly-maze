import styled from "styled-components";

type Props = {
  loading: boolean;
};

type PropsContainer = Props & {
  positionContainer: boolean;
  timeElapsed: number;
};

export const Container = styled.div<PropsContainer>`
  display: ${({ loading }) => (loading ? "none" : "block")};
  width: ${({ positionContainer, timeElapsed }) =>
    positionContainer || timeElapsed > 3 ? "100%" : undefined};
  position: ${({ positionContainer, timeElapsed }) =>
    positionContainer || timeElapsed > 3 ? "fixed" : undefined};
`;

export const Main = styled.main<Props>`
  opacity: ${({ loading }) => (loading ? 0 : 1)};
  transition: all 0.3s ease;
  min-height: calc(100vh - 70.94px); /*  70.94px é a altura da navbar */
`;
