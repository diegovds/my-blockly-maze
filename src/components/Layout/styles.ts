import styled from "styled-components";

type Props = {
  loading: string;
};

type PropsContainer = Props & {
  hiddenContainer: boolean;
};

export const Container = styled.div<PropsContainer>`
  visibility: ${(props) => props.loading};
  opacity: ${(props) => (props.loading === "hidden" ? 0 : 1)};
  transition: all 0.3s ease;
  width: ${({ hiddenContainer }) => (hiddenContainer ? "100%" : undefined)};
  position: ${({ hiddenContainer }) => (hiddenContainer ? "fixed" : undefined)};
`;

export const Main = styled.main<Props>`
  visibility: ${(props) => props.loading};
  opacity: ${(props) => (props.loading === "hidden" ? 0 : 1)};
  transition: all 0.3s ease;
  min-height: calc(100vh - 70.94px); /*  70.94px é a altura da navbar */
`;
