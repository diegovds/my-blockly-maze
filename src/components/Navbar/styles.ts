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

  .brand span {
    font-weight: 900;
    text-transform: uppercase;
  }
`;

export const Ul = styled.ul`
  display: flex;
  list-style: none;
`;

export const Li = styled.li`
  margin-right: 1em;

  a {
    padding: 0.4em 0.6em;
    border-radius: 10px;
  }

  .active {
    background-color: #000;
    color: #fff;
  }
`;
