import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fredoka', sans-serif;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  a {
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }

  input:focus,
  textarea:focus {
    outline: none;
  }

  input,
  textarea {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: .8em 0;
    background-color: transparent;
  }
`;
