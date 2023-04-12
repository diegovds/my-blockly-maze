import styles from "../styles/Login.module.css";

import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

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

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submit: SubmitHandler<FormValues> = async (data) => {
    const { email, password } = data;

    setHasError(false);
    setLoading(true);

    const request = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    request && request.ok ? router.push("/") : setHasError(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h2>Entrar</h2>
        <p>Insira suas credenciais</p>

        <form onSubmit={handleSubmit(submit)} className={styles.form}>
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
            <p className={styles.inputError}>O e-mail precisa ser informado.</p>
          )}
          {errors?.email?.type === "validate" && (
            <p className={styles.inputError}>
              O e-mail informado não é válido.
            </p>
          )}
          <input
            type="password"
            placeholder="Senha"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors?.password?.type === "minLength" && (
            <p className={styles.inputError}>
              A senha precisa conter pelo menos 6 caracteres.
            </p>
          )}
          {errors?.password?.type === "required" && (
            <p className={styles.inputError}>A senha precisa ser informada.</p>
          )}
          <button className="btn">Entrar</button>
          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {hasError && "Acesso negado!!!"}
        </form>
      </div>
    </div>
  );
};

export default Register;
