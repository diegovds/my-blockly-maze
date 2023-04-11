import { Button } from "@/components/Button";
import * as C from "@/components/Form";

const Login = () => {
  const handleForm = () => {};

  return (
    <C.Container>
      <C.Register>
        <h2>Entrar</h2>
        <p>Insira suas credenciais</p>
        <C.Form onSubmit={handleForm}>
          <input type="text" placeholder="E-mail" autoFocus />

          <input type="password" placeholder="Senha" />

          <Button>Entrar</Button>
        </C.Form>
      </C.Register>
    </C.Container>
  );
};

export default Login;
