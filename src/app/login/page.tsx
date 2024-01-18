"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import UserTabs from "../components/layout/UserTabs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <UserTabs />

      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          disabled={loginInProgress}
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          disabled={loginInProgress}
          placeholder="Senha ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Entrar
        </button>
        <div className="my-4 text-gray-600 text-center">
          Ou fazer login com Google / Apple
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center items-center"
        >
          <Image
            priority={false}
            src={"/google.png"}
            alt="Google"
            width={30}
            height={30}
          />
          Login com Google
        </button>
        <button
          type="button"
          onClick={() =>
            signIn("facebook", { callbackUrl: "/", redirect: true })
          }
          className="flex gap-4 justify-center items-center mt-3"
        >
          <Image
            priority={false}
            src={"/facebook.png"}
            alt="Facebook"
            width={32}
            height={32}
          />
          Login com Facebook
        </button>
      </form>
    </section>
  );
}
