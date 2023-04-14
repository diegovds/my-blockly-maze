import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Fredoka", sans-serif;
  }

  body {
    background-color: #eceeed;
    margin: 0 auto;
    max-width: 1440px;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  input:focus,
  textarea:focus {
    outline: none;
  }

  input,
  textarea {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0.8em 0;
    background-color: transparent;
  }

  a,
  nav button {
    text-decoration: none;
    background-color: transparent;
    border: none;
    color: #000;
    transition: all 0.3s ease;
    font-size: 1em;
    cursor: pointer;
  }

  a:hover,
  nav button:hover {
    color: #bbb;
  }

  .btn {
    background-color: #1a8918;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
    border: none;
    padding: 0.4em 0.6em;
    font-size: 1em;
    transition: all 0.3s ease;
  }

  .btn:hover {
    background-color: #0f730c;
    color: #fff;
  }

  button[disabled] {
    background-color: #aaa;
    cursor: default;
  }

  button[disabled]:hover {
    background-color: #aaa;
  }

  img {
    border-radius: 10px;
  }
`;
