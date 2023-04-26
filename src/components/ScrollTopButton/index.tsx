import * as C from "./styles";

import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position

    scrollPosition > 100 ? setShowButton(true) : setShowButton(false);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <C.TopButton onClick={scrollToTop} showButton={showButton}>
      <AiOutlineArrowUp />
    </C.TopButton>
  );
};

export default ScrollTopButton;
