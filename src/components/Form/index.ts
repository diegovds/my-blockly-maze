import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100vh - 60px); /*  60px é a altura da navbar */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Register = styled.div`
  width: 410px;
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
  }

  button {
    margin-top: 0.8em;
    width: 100%;
    height: 56px;
    font-size: 1em;
  }

  p {
    width: 100%;
    margin: 0;
    margin-bottom: 15px;
  }

  .inputError {
    text-align: left;
    font-size: smaller;
    color: #f00;
  }
`;
