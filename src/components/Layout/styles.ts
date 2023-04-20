import styled from "styled-components";

type Props = {
  visibility: string;
};

type PropsContainer = Props & {
  positionContainer: boolean;
};

export const Container = styled.div<PropsContainer>`
  opacity: ${({ visibility }) => (visibility === "hidden" ? 0 : 1)};
  transition: all 0.3s ease;
  width: ${({ positionContainer }) => (positionContainer ? "100%" : undefined)};
  position: ${({ positionContainer }) =>
    positionContainer ? "fixed" : undefined};
`;

export const Main = styled.main<Props>`
  opacity: ${({ visibility }) => (visibility === "hidden" ? 0 : 1)};
  transition: all 0.3s ease;
  min-height: calc(100vh - 70.94px); /*  70.94px é a altura da navbar */
`;
