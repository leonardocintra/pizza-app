"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import PageTitle from "../components/layout/PageTitle";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setCreatingUser(true);
    setUserCreated(false);
    setError(false);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status !== 201) {
        setError(true);
      } else {
        setUserCreated(true);
      }
      setCreatingUser(false);
    } catch (err) {
      setError(true);
    }
  }

  return (
    <section className="mt-8">
      <PageTitle title="Registrar" />

      {userCreated && (
        <div className="my-4 text-center">
          Usuario criado. <br /> Voce pode fazer login agora
          <Link href={"/login"} className="underline">
            {" "}
            Login &raquo;
          </Link>
        </div>
      )}

      {error && (
        <div className="my-4 text-center">
          Ocorreu um erro. Tente novamente mais tarde.
        </div>
      )}

      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="block max-w-sm mx-auto mb-8"
      >
        <input
          type="email"
          disabled={creatingUser}
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          disabled={creatingUser}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Registrar
        </button>
        <div className="my-4 text-gray-600 text-center">
          Ou fazer login com Google
        </div>
        <button
          onClick={() => signIn("google")}
          type="button"
          className="flex gap-4 justify-center items-center"
        >
          <Image src={"/google.png"} alt="Google" width={32} height={32} />
          Login com Google
        </button>
        <div className="text-center text-2xl my-4 text-gray-600 border-t pt-5">
          Ja possui uma conta ?{" "}
          <Link href={"/login"} className="underline">
            Fazer login &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
