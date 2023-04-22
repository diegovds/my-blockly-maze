import styled from "styled-components";

export const Nav = styled.nav`
  height: 70.94px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.6) 0px -2px 10px 0px;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 2em;
  background: #add8e6;

  .brand {
    font-size: 1.5em;
    /* centralizar icone com o texto */
    display: flex;
    align-items: center;
    /* fim */
    gap: 0.5rem;
  }

  .brand svg{
    font-size: 1.5em;
  }

  .brand span {
    font-weight: 900;
    text-transform: uppercase;
  }

  .menuMobile {
    display: none;
    height: 19px;
    width: 26px;
    z-index: 2;
  }

  #checkbox_menu {
    position: absolute;
    opacity: 0;
  }

  .menuMobile label {
    cursor: pointer;
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
  }

  .menuMobile label span {
    position: absolute;
    display: block;
    height: 3px;
    width: 100%;
    border-radius: 30px;
    transition: 0.4s ease-in-out;
    /*transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    transition: all 0.2s;*/
  }

  .menuMobile label span:nth-child(1) {
    top: 0;
  }

  .menuMobile label span:nth-child(2) {
    top: 8px;
  }

  .menuMobile label span:nth-child(3) {
    top: 16px;
  }

  #checkbox_menu:checked + label span:nth-child(1) {
    transform: rotate(-45deg);
    /*transform: rotate(-405deg);
    transform: rotate(-135deg);*/
    top: 8px;
  }

  #checkbox_menu:checked + label span:nth-child(2) {
    transform: scaleX(0);
  }

  #checkbox_menu:checked + label span:nth-child(3) {
    transform: rotate(45deg);
    /*transform: rotate(405deg);
    transform: rotate(135deg);*/
    top: 8px;
  }

  @media (max-width: 1115px) {
    padding: 0.5em 20px;

    #labelBrand {
      display: none;
    }

    svg {
      width: 30px;
      height: 30px;
    }

    .menuMobile {
      display: block;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30px;

  input {
    width: 18rem;
    background-color: #fff;
    margin-right: 0.4rem;
    border-radius: 5px;
    padding: 0.54em 0.6em;
    border-bottom: none;
    border: none;
  }

  input:focus {
    outline: none;
  }

  button {
    border-radius: 8px;
    padding: 0.4em 0.6em;
    background-color: #000;
    color: #fff;
    display: flex;
    align-items: center;
  }

  button svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  button:hover {
    color: #fff;
    background-color: #666;
  }

  @media (max-width: 1115px) {
    flex: 1;
    max-width: 250px;

    input {
      width: 100%;
    }
  }
`;

type UlProps = {
  showMenu: string;
  isMobileOnly?: string;
};

export const Ul = styled.ul<UlProps>`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1em;

  @media (max-width: 1115px) {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 60px;
    width: 100%;
    height: 100%;
    background: rgba(173, 216, 230, 0.8);
    backdrop-filter: blur(10px);
    visibility: ${(props) =>
      props.showMenu === "show" ? "visible" : "hidden"};
    margin-left: ${(props) => (props.showMenu === "show" ? 0 : "100%")};
    transition: 0.75s ease-in-out;
  }

  @media (max-width: 1115px) and (orientation: landscape) {
    gap: ${(props) => (props.isMobileOnly === "true" ? "20px" : "60px")};
  }
`;

export const Li = styled.li`
  a {
    padding: 0.4em 0.6em;
    border-radius: 10px;
  }

  button {
    padding: 0.4em 0.6em;
  }

  .active {
    background-color: #000;
    color: #fff;
  }
`;
