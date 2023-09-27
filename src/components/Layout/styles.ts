import styled from "styled-components";

type Props = {
  load: boolean;
};

type PropsContainer = Props & {
  positionContainer: boolean;
  timeElapsed: boolean;
};

export const Container = styled.div<PropsContainer>`
  opacity: ${({ load }) => (load ? 0 : 1)};
  transition: all 0.3s ease;
  width: ${({ positionContainer, timeElapsed }) =>
    positionContainer || timeElapsed ? "100%" : undefined};
  position: ${({ positionContainer, timeElapsed }) =>
    positionContainer || timeElapsed ? "fixed" : undefined};
`;

export const Main = styled.main<Props>`
  opacity: ${({ load }) => (load ? 0 : 1)};
  transition: all 0.3s ease;
  min-height: calc(100vh - 70.94px); /*  70.94px é a altura da navbar */
`;
