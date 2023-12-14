"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Registrar</h1>
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="block max-w-sm mx-auto mb-8"
      >
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
        <div className="my-4 text-gray-600 text-center">
          Ou fazer login com Google
        </div>
        <button
          type="submit"
          className="flex gap-4 justify-center items-center"
        >
          <Image src={"/google.png"} alt="Google" width={32} height={32} />
          Login com Google
        </button>
      </form>
    </section>
  );
}
