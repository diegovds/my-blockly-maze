import * as C from "@/components/Form";

import { Button } from "@/components/Button";

import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

type FormValues = {
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submit: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;

    console.log(email, password);
  };

  return (
    <C.Container>
      <C.Register>
        <h2>Entrar</h2>
        <p>Insira suas credenciais</p>
        <C.Form onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            placeholder="E-mail"
            autoFocus
            {...register("email", {
              required: true,
              validate: (value) => isEmail(value),
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="inputError">O e-mail precisa ser informado.</p>
          )}
          {errors?.email?.type === "validate" && (
            <p className="inputError">O e-mail informado não é válido.</p>
          )}
          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors?.password?.type === "minLength" && (
            <p className="inputError">
              A senha precisa conter pelo menos 6 caracteres.
            </p>
          )}
          {errors?.password?.type === "required" && (
            <p className="inputError">A senha precisa ser informada.</p>
          )}
          <Button>Entrar</Button>
        </C.Form>
      </C.Register>
    </C.Container>
  );
};

export default Register;
