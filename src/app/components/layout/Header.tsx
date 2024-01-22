"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../AppContext";

export default function Header() {
  const session = useSession();

  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  const status = session.status;

  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  const { cartItems } = useContext(CartContext);

  return (
    <div>
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            Pizza na pedra
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>Sobre nós</Link>
          <Link href={"/#contato"}>Contato</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-600 font-semibold">
          {status === "authenticated" && (
            <>
              <Link href={"/profile"} className="whitespace-nowrap">
                Olá, {userName}
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Sair
              </button>
            </>
          )}

          {status === "unauthenticated" && (
            <>
              <Link href={"/login"}>Login</Link>
              <Link
                href={"/register"}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Cadastrar
              </Link>
            </>
          )}

          <Link
            href={"/cart"}
            className="bg-primary rounded-full text-white px-8 py-2 "
          >
            Car ({cartItems.length})
          </Link>
        </nav>
      </header>
    </div>
  );
}
