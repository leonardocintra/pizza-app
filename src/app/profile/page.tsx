"use client";

import { useSession } from "next-auth/react";
import PageTitle from "../components/layout/PageTitle";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  console.log(session);

  const { status } = session;
  const [userName, setUserName] = useState<string>("")

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user?.name || "")
    }
  }, [session, status])

  async function handleProfileSubmit(ev: any) {
    ev.preventDefault();

    const response = await fetch("/api/profile", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName
      }),
    })
  }

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

      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className=" p-2 rounded-lg relative">

              <Image className="rounded-lg w-full h-full mb-1" src={userImage || ""} alt="User image" width={250} height={250} />

              <button type="button">Alterar</button>
            </div>
          </div>
          <form onSubmit={handleProfileSubmit} className="grow">
            <input type="text" name="name" id="name" placeholder="Nome completo" value={userName} onChange={(ev) => setUserName(ev.target.value)} />

            <input type="email" name="email" id="email" placeholder="Email" disabled={true} defaultValue={user?.email || ""} />

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>

      <p>
        Parei em https://youtu.be/nGoSP3MBV2E?t=12489
      </p>


    </section>

  )
}