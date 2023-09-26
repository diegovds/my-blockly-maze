import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #ccc;
  color: #444;
  font-size: 0.75rem;

  @media (min-width: 640px) {
    font-size: 0.875rem;
  }
`;

export const Span = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.05em;
`;

export const Strong = styled.strong`
  font-weight: 600;
`;
