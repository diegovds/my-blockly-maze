import * as C from "./styles";

import { useState, useEffect } from "react";

type Props = {
  showMenu: (toggleHamburger: boolean) => void;
};

const HamburgerButton = ({ showMenu }: Props) => {
  const [toggleHamburger, setToggleHamburger] = useState(false);

  useEffect(() => {
    showMenu(toggleHamburger);
  }, [showMenu, toggleHamburger]);

  const onClickHamburger = () => {
    setToggleHamburger(!toggleHamburger);
  };

  return (
    <C.Hamburger onClick={onClickHamburger}>
      <C.Label toggleHamburger={toggleHamburger}>
        <C.Span color={"#000"}></C.Span>
        <C.Span color={"#000"}></C.Span>
        <C.Span color={"#000"}></C.Span>
      </C.Label>
    </C.Hamburger>
  );
};

export default HamburgerButton;
