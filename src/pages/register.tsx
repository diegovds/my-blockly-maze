import { Button } from "@/components/Button";
import * as C from "@/components/Form";

const Register = () => {
  const handleForm = () => {};

  return (
    <C.Container>
      <C.Register>
        <h2>Cadastrar</h2>
        <p>Insira seus dados</p>
        <C.Form onSubmit={handleForm}>
          <input type="text" placeholder="Nome" autoFocus />

          <input type="text" placeholder="E-mail" />

          <input type="password" placeholder="Senha" />

          <input type="password" placeholder="Confirme a senha" />

          <Button>Cadastrar</Button>
        </C.Form>
      </C.Register>
    </C.Container>
  );
};

export default Register;
