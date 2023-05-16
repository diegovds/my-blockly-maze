import * as C from "./styles";

import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  children: React.ReactNode;
};

const MazesContainer = ({ children }: Props) => {
  const [animationParent] = useAutoAnimate();

  return <C.Container ref={animationParent}>{children}</C.Container>;
};

export default MazesContainer;
