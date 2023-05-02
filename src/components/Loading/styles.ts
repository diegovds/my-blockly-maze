import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eceeed;
`;

export const Loader = styled.div`
  width: 120px;
  height: 75px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Ball = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #000;
  animation: bounce 0.5s alternate infinite;

  &:nth-child(2) {
    animation-delay: 0.15s;
  }

  &:nth-child(3) {
    animation-delay: 0.31s;
  }

  @keyframes bounce {
    from {
      transform: scaleX(1.25);
    }
    to {
      transform: translateY(-50px) scaleX(1);
    }
  }
`;

export const Label = styled.span`
  font-size: 18px;
  text-transform: uppercase;
  color: #000;
`;
