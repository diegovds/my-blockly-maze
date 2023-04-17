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

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30px;

  input {
    width: 18rem;
    background-color: #fff;
    margin-right: 1rem;
    border-radius: 5px;
    padding: 0.54em 0.6em;
    border-bottom: none;
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
    background-color: #1a8918;
  }
`;

export const Ul = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 1em;
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
