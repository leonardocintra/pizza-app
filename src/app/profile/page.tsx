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
  const [saved, setSaved] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user?.name || "");
      setEmail(session.data.user?.email || "");
    }
  }, [session, status])

  async function handleProfileSubmit(ev: any) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);

    const response = await fetch("/api/profile", {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        email: email
      }),
    })

    setIsSaving(false);

    if (response.ok) {
      setSaved(true);
    }
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
        {saved && (
          <h2 className="text-center bg-green-200 p-4 rounded-lg border-4 border-green-400 text-green-800">Perfil salvo com sucesso!</h2>
        )}

        {isSaving && (
          <h2 className="text-center bg-blue-200 p-4 rounded-lg border-4 border-blue-400 text-blue-800">Salvando seus dados ...</h2>
        )}

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
        Parei em https://youtu.be/nGoSP3MBV2E?t=12817
      </p>


    </section>

  )
}