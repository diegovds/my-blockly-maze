import styled from "styled-components";

type Props = {
  load: boolean;
};

type PropsContainer = Props & {
  positionContainer: boolean;
  timeElapsed: boolean;
};

export const Container = styled.div<PropsContainer>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  opacity: ${({ load }) => (load ? 0 : 1)};
  transition: all 0.3s ease;
  width: ${({ positionContainer, timeElapsed }) =>
    positionContainer || timeElapsed ? "100%" : undefined};
  position: ${({ positionContainer, timeElapsed }) =>
    positionContainer || timeElapsed ? "fixed" : undefined};
`;

export const Main = styled.main<Props>`
  display: flex;
  flex-direction: column;
  flex: 1;
  opacity: ${({ load }) => (load ? 0 : 1)};
  transition: all 0.3s ease;
`;
