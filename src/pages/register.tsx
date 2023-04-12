import styles from "@/styles/Register.module.css";

import { useForm, SubmitHandler } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import axios from "axios";

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

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submit: SubmitHandler<FormValues> = async (data) => {
    const { name, email, password } = data;

    setHasError(false);
    setLoading(true);

    const user = await axios.post("/api/users", {
      name,
      email,
      password,
    });

    if (user && user.data.status === true) {
      const request = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      request && request.ok ? router.push("/") : setHasError(true);
    } else {
      setLoading(false);
      setHasError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h2>Cadastrar</h2>
        <p>Insira seus dados</p>

        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <input
            type="text"
            placeholder="Nome"
            autoFocus
            {...register("name", { required: true })}
          />
          {errors?.name?.type === "required" && (
            <p className={styles.inputError}>O nome precisa ser informado.</p>
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
          <input
            type="password"
            placeholder="Confirme a senha"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watchPassword,
            })}
          />
          {errors?.passwordConfirmation?.type === "validate" && (
            <p className={styles.inputError}>As senhas precisam ser iguais!</p>
          )}
          {errors?.passwordConfirmation?.type === "required" && (
            <p className={styles.inputError}>
              A confirmação da senha precisa ser informada.
            </p>
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
