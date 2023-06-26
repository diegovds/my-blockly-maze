import styled, { keyframes } from "styled-components";

const skeletonLoading = keyframes`
	0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
`;

type SkeletonCardProps = {
  width: string;
};

export const SkeletonCard = styled.div<SkeletonCardProps>`
  width: ${({ width }) => width};
  aspect-ratio: 7/6;
  border-radius: 10px;

  animation: ${skeletonLoading} 1s linear infinite alternate;
`;
