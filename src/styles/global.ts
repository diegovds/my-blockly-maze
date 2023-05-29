import { Rubik } from "next/font/google";
import { createGlobalStyle } from "styled-components";

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${rubik.style.fontFamily};
  }

  body {
    background-color: #eceeed;
    margin: 0 auto;
    max-width: 1440px;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  html {
    /* chrome://flags/#smooth-scrolling */
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
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
    color: #666;
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

  .btn-danger {
    background-color: #FF0000;
}

  .btn-danger:hover {
    background-color: rgb(225,0,0);
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

  .img_loading {
    display: none;
  }

  .img_loaded {
    display: inline-block;
    border: none;
    box-shadow: 0 0 2px #3d3d3d;
  }
`;
