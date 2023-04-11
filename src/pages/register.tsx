import * as C from "@/components/Form";

import { Button } from "@/components/Button";

import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

type FormValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const watchPassword = watch("password");

  const submit: SubmitHandler<FormValues> = (data) => {
    const { name, email, password } = data;

    console.log(name, email, password);
  };

  return (
    <C.Container>
      <C.Register>
        <h2>Cadastrar</h2>
        <p>Insira seus dados</p>
        <C.Form onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            placeholder="Nome"
            autoFocus
            {...register("name", { required: true })}
          />
          {errors?.name?.type === "required" && (
            <p className="inputError">O nome precisa ser informado.</p>
          )}
          <input
            type="text"
            placeholder="E-mail"
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
          <input
            type="password"
            placeholder="Confirme a senha"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watchPassword,
            })}
          />
          {errors?.passwordConfirmation?.type === "validate" && (
            <p className="inputError">As senhas precisam ser iguais!</p>
          )}
          {errors?.passwordConfirmation?.type === "required" && (
            <p className="inputError">
              A confirmação da senha precisa ser informada.
            </p>
          )}
          <Button>Cadastrar</Button>
        </C.Form>
      </C.Register>
    </C.Container>
  );
};

export default Register;
