import * as C from "@/components/Form";

import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Seo from "@/components/Seo";

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

  const [hasError, setHasError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submit: SubmitHandler<FormValues> = async (data) => {
    const { name, email, password } = data;

    const userData = new FormData();
    userData.append("name", name);
    userData.append("email", email);
    userData.append("password", password);

    setHasError(false);
    setLoading(true);

    const user = await axios.post("/api/users", userData).catch((e) => {
      if (e.response.data.error.target.includes("email")) {
        setHasError("E-mail já cadastrado.");
      } else {
        setHasError("Ocorreu um erro, por favor tente mais tarde.");
      }
    });

    if (user && user.data.status === true) {
      const request = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      request && request.ok
        ? router.push("/dashboard")
        : setHasError("Ocorreu um erro, por favor tente mais tarde.");
    } else {
      setLoading(false);
    }
  };

  return (
    <C.Container>
      <Seo
        title="My BLOCKLY Maze | Cadastro"
        description={`Página de cadastro na plataforma My BLOCKLY Maze.`}
        path="/register"
      />
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
          {!loading && <button className="btn">Cadastrar</button>}
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
