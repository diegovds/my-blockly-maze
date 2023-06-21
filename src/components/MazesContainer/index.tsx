import * as C from "./styles";

import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {
  children: React.ReactNode;
  btnText?: string;
  disabled?: boolean;
  handleLoadMore?: () => void;
};

const MazesContainer = ({
  children,
  btnText,
  disabled,
  handleLoadMore,
}: Props) => {
  const [animationParent] = useAutoAnimate({ duration: 300 });

  return (
    <>
      <C.Container ref={animationParent}>{children}</C.Container>
      {handleLoadMore && btnText?.length !== 0 && disabled !== undefined && (
        <C.BtnDiv
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3 }}
          whileInView={{ opacity: 1 }}
        >
          <button
            className="btn"
            disabled={disabled}
            onClick={() => handleLoadMore()}
          >
            {btnText}
          </button>
        </C.BtnDiv>
      )}
    </>
  );
};

export default MazesContainer;
