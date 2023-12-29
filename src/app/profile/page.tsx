"use client";

import { useSession } from "next-auth/react";
import PageTitle from "../components/layout/PageTitle";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {

  const session = useSession();
  const { status } = session;

  if (status === "loading") {
    return "Carregendo seus dados ...";
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const user = session.data?.user;
  const userImage = user?.image;

  return (
    <section className="mt-8">
      <PageTitle title="Minha conta" />

      <form className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className=" p-2 rounded-lg relative">



              <Image className="rounded-lg w-full h-full mb-1" src={userImage} alt="User image" width={250} height={250} />

              <button type="button">Alterar</button>
            </div>
          </div>
          <div className="grow">
            <input type="text" name="name" id="name" placeholder="Nome completo" value={user?.name as string} />
            <input type="email" name="email" id="email" placeholder="Email" disabled={true} value={user?.email as string} />
            <button type="submit">Salvar</button>
          </div>
        </div>
      </form>

      <p>
        Parei em https://youtu.be/nGoSP3MBV2E?t=11238
      </p>


    </section>

  )
}