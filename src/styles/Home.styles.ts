import styled from "styled-components";

type VisibleProps = {
  visible?: string;
};

export const Container = styled.div<VisibleProps>`
  flex: ${(props) => (props.visible !== "visible" ? 1 : undefined)};
  display: ${(props) => (props.visible !== "visible" ? "flex" : undefined)};
  justify-content: ${(props) =>
    props.visible !== "visible" ? "center" : undefined};
  align-items: ${(props) =>
    props.visible !== "visible" ? "center" : undefined};
`;

export const H2 = styled.h2`
  padding: 1rem 0rem;
  text-align: center;
  border-bottom: 2px solid #ccc;
  width: 97%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (max-width: 800px) {
    font-size: 1.2rem;
  }
`;

export const NoMazes = styled.div`
  text-align: center;

  p {
    margin-bottom: 1.5em;
  }

  a {
    padding: 10px 25px;
  }
`;
