import * as C from "@/components/Form";

import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import Seo from "@/components/Seo";

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

  const [hasError, setHasError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;
    let errorMessage: string | undefined = undefined;

    setHasError(undefined);
    setLoading(true);

    const request = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (request && request?.error) {
      if (request.error.includes("No User found")) {
        errorMessage = "Usuário não encontrado.";
      }

      if (request.error.includes("CredentialsSignin")) {
        errorMessage = "Senha incorreta.";
      }

      if (request.error && !errorMessage) {
        errorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setHasError(errorMessage);
    }

    request && request.ok ? router.push("/dashboard") : setLoading(false);
  };

  return (
    <C.Container>
      <Seo
        title="My BLOCKLY Maze | Login"
        description={`Página de login na plataforma My BLOCKLY Maze.`}
        path="/login"
      />
      <C.Register>
        <h2>Entrar</h2>
        <p>Insira suas credenciais</p>

        <C.Form
          onSubmit={handleSubmit(submit)}
          onChange={() => setHasError(undefined)}
        >
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
          {!loading && <button className="btn">Entrar</button>}
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {hasError && <p className="error">{hasError}</p>}
        </C.Form>
      </C.Register>
    </C.Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session) {
    return {
      redirect: { destination: "/dashboard", permanent: true },
    };
  }

  return {
    props: {},
  };
};

export default Register;
