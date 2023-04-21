import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 600px) {
    min-height: inherit;
  }
`;

export const Register = styled.div`
  width: 90%;
  text-align: center;
  border: 1px solid #fff;
  padding: 2rem 0.3rem;
  margin: 2rem 0rem;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px hsl(0deg 0% 24% / 0.375);

  p {
    color: rgba(0, 0, 0, 0.38);
    margin: 1.5rem 0rem;
  }

  @media screen and (min-width: 600px) {
    width: 400px;
  }
`;

export const Form = styled.form`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0rem 1rem;

  input {
    width: 100%;
    font-size: 1rem;
    margin-bottom: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 0.8em 0;
    background-color: transparent;
  }

  input:focus {
    outline: none;
  }

  button {
    margin-top: 0.8em;
    width: 100%;
    height: 56px;
  }

  p {
    width: 100%;
    margin: 0;
  }

  .inputError {
    text-align: left;
    font-size: smaller;
    color: #f00;
  }

  .error {
    margin-top: 0.8em;
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 5px;
    border-radius: 5px;
  }
`;
